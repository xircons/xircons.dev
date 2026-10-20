import { NextResponse, NextRequest } from "next/server";
import { Resend } from "resend";
import { buildContactEmail } from "@/lib/contact-email";
import { CONTACT_EMAIL } from "@/lib/site";

const TO_EMAIL = "xirconsss@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

const INMEMORY_LIMITER = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_LIMITER_SIZE = 10000; // Cap to prevent memory leaks

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 415 });
    }

    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 4096) {
      return NextResponse.json({ error: "Your message is too long. Please shorten it and try again." }, { status: 413 });
    }

    const ipList = req.headers.get("x-forwarded-for")?.split(",") || [];
    const fallbackIp = ipList.length > 0 ? ipList[ipList.length - 1] : req.headers.get("x-real-ip");
    const ip = (fallbackIp || "unknown").trim().toLowerCase();

    const now = Date.now();
    const windowStart = now - WINDOW_MS;

    // Evict oldest IP if Map is at capacity and this is a NEW IP
    if (!INMEMORY_LIMITER.has(ip) && INMEMORY_LIMITER.size >= MAX_LIMITER_SIZE) {
      const oldestKey = INMEMORY_LIMITER.keys().next().value;
      if (oldestKey) {
        INMEMORY_LIMITER.delete(oldestKey);
      }
    }

    const requestTimestamps = (INMEMORY_LIMITER.get(ip) || []).filter((ts) => ts > windowStart);

    if (requestTimestamps.length >= MAX_REQUESTS) {
      // Re-insert to maintain MRU position without growing the array
      INMEMORY_LIMITER.delete(ip);
      INMEMORY_LIMITER.set(ip, requestTimestamps);

      return NextResponse.json(
        { error: "Too many messages sent. Please try again in 10 minutes." },
        { status: 429, headers: { "Retry-After": "600" } }
      );
    }

    requestTimestamps.push(now);

    // Delete existing key before set to ensure it moves to the MRU position (end of Map)
    if (INMEMORY_LIMITER.has(ip)) {
      INMEMORY_LIMITER.delete(ip);
    }
    INMEMORY_LIMITER.set(ip, requestTimestamps);

    const origin = req.headers.get("origin") || req.headers.get("referer") || "";
    if (origin) {
      try {
        const parsedOrigin = new URL(origin).hostname;
        const isAllowedOrigin =
          parsedOrigin === "localhost" ||
          parsedOrigin === "127.0.0.1" ||
          parsedOrigin === "xircons.dev" ||
          parsedOrigin.endsWith(".xircons.dev") ||
          parsedOrigin.endsWith(".vercel.app");

        if (!isAllowedOrigin) {
          return NextResponse.json({ error: `This request was blocked. Please email ${CONTACT_EMAIL} instead.` }, { status: 403 });
        }
      } catch {
        return NextResponse.json({ error: `This request was blocked. Please email ${CONTACT_EMAIL} instead.` }, { status: 403 });
      }
    }

    const text = await req.text();
    if (text.length > 4096) {
      return NextResponse.json({ error: "Your message is too long. Please shorten it and try again." }, { status: 413 });
    }

    let body;
    try {
      body = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 400 });
    }

    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const { name, email, phone, company, message, acceptedTerms } = body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (typeof name !== "string" || name.trim().length < 1) {
      return NextResponse.json({ error: "Full name is required", field: "name" }, { status: 400 });
    }
    if (name.length > 120) {
      return NextResponse.json({ error: "Full name is too long (maximum 120 characters)", field: "name" }, { status: 400 });
    }

    if (typeof email !== "string" || email.trim().length < 1) {
      return NextResponse.json({ error: "Email is required", field: "email" }, { status: 400 });
    }
    if (email.length > 120 || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address", field: "email" }, { status: 400 });
    }

    if (phone !== undefined && phone !== "" && (typeof phone !== "string" || phone.length > 40)) {
      return NextResponse.json({ error: "Phone number is too long (maximum 40 characters)", field: "phone" }, { status: 400 });
    }

    if (company !== undefined && company !== "" && (typeof company !== "string" || company.length > 120)) {
      return NextResponse.json({ error: "Company name is too long (maximum 120 characters)", field: "company" }, { status: 400 });
    }

    if (typeof message !== "string" || message.trim().length < 1) {
      return NextResponse.json({ error: "Message is required", field: "message" }, { status: 400 });
    }
    if (message.length > 4000) {
      return NextResponse.json({ error: "Message is too long (maximum 4000 characters)", field: "message" }, { status: 400 });
    }

    if (acceptedTerms !== true) {
      return NextResponse.json({ error: "You must accept the terms and privacy policy", field: "terms" }, { status: 400 });
    }

    const { subject, html, text: plainText } = buildContactEmail({
      name,
      email,
      phone: typeof phone === "string" ? phone : undefined,
      company: typeof company === "string" ? company : undefined,
      message,
      acceptedTerms,
      receivedAt: new Date(),
    });

    const { data, error } = await resend.emails.send({
      from: `xircons.dev <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      subject,
      replyTo: email,
      html,
      text: plainText,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: `Your message could not be sent. Please email ${CONTACT_EMAIL} instead.` },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
