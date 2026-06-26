import { NextResponse, NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = "xirconsss@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

const INMEMORY_LIMITER = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_LIMITER_SIZE = 10000; // Cap to prevent memory leaks

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json({ error: "Unsupported Media Type" }, { status: 415 });
    }

    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 4096) {
      return NextResponse.json({ error: "Payload Too Large" }, { status: 413 });
    }

    // Resolve IP safely. If using a proxy chain without req.ip, the rightmost IP is the proxy's direct connection.
    const ipList = req.headers.get("x-forwarded-for")?.split(",") || [];
    const fallbackIp = ipList.length > 0 ? ipList[ipList.length - 1] : req.headers.get("x-real-ip");
    const ip = (req.ip || fallbackIp || "unknown").trim().toLowerCase();

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
        { error: "Too many requests" },
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
          parsedOrigin.endsWith(".xircons.dev");

        if (!isAllowedOrigin) {
          return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
      } catch {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    const text = await req.text();
    if (text.length > 4096) {
      return NextResponse.json({ error: "Payload Too Large" }, { status: 413 });
    }

    let body;
    try {
      body = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const { name, email, phone, company, message, acceptedTerms } = body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      typeof name !== "string" || name.trim().length < 1 || name.length > 120 ||
      typeof email !== "string" || email.length < 1 || email.length > 120 || !emailRegex.test(email) ||
      (phone !== undefined && phone !== "" && (typeof phone !== "string" || phone.length > 40)) ||
      (company !== undefined && company !== "" && (typeof company !== "string" || company.length > 120)) ||
      typeof message !== "string" || message.trim().length < 1 || message.length > 4000 ||
      acceptedTerms !== true
    ) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = escapeHtml(phone?.trim() || "N/A");
    const safeCompany = escapeHtml(company?.trim() || "N/A");
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br/>");

    const { data, error } = await resend.emails.send({
      from: `Xircons Contact Form <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      subject: `New Inquiry from ${safeName} ${company ? `(${safeCompany})` : ""}`,
      replyTo: email,
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Company:</strong> ${safeCompany}</p>
        <br/>
        <h3>Message:</h3>
        <p>${safeMessage}</p>
        <br/>
        <hr/>
        <p><small>Terms accepted: ${acceptedTerms ? "Yes" : "No"}</small></p>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
