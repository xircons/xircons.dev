"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CONTACT_EMAIL = "xirconsss@gmail.com";

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const saved = sessionStorage.getItem("contactFormState");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.step) setStep(data.step);
        if (data.name) setName(data.name);
        if (data.email) setEmail(data.email);
        if (data.phone) setPhone(data.phone);
        if (data.company) setCompany(data.company);
        if (data.website) setWebsite(data.website);
        if (data.message) setMessage(data.message);
        if (data.acceptedTerms !== undefined) setAcceptedTerms(data.acceptedTerms);
      } catch {
        // Ignore JSON parse errors
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      sessionStorage.setItem("contactFormState", JSON.stringify({
        step, name, email, phone, company, website, message, acceptedTerms
      }));
    }
  }, [isMounted, step, name, email, phone, company, website, message, acceptedTerms]);

  const onNext = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Full name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep(2);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!message.trim()) newErrors.message = "Message is required";
    if (!acceptedTerms) newErrors.terms = "You must accept the terms and privacy policy";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim(),
          website: website.trim(),
          message: message.trim(),
          acceptedTerms,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.field) {
          setErrors({ [data.field]: data.error || "Invalid value" });
          if (["name", "email", "phone", "company"].includes(data.field)) {
            setStep(1);
          }
          return;
        }
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      sessionStorage.removeItem("contactFormState");
      setIsSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return <div className="min-h-[500px]" aria-hidden="true" />;
  }

  if (isSuccess) {
    return (
      <div className="flex w-full max-w-2xl flex-col items-center justify-center py-20 text-center animate-in fade-in duration-700">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 text-accent">
          <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-fg">Thank you for reaching out!</h2>
        <p className="text-lg text-fg/70">
          We have received your message and will get back to you shortly.
        </p>
        <button
          onClick={() => {
            setStep(1);
            setName("");
            setEmail("");
            setPhone("");
            setCompany("");
            setWebsite("");
            setMessage("");
            setAcceptedTerms(false);
            setIsSuccess(false);
          }}
          className="mt-10 group flex h-12 items-center justify-center border border-border/80 px-8 text-sm font-bold text-fg transition-colors hover:border-accent"
        >
          Send another message
        </button>
      </div>
    );
  }

  const getRowClass = (hasError: boolean) =>
    `flex flex-col gap-2 border-b py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4 lg:py-5 transition-colors ${hasError ? "border-red-500" : "border-border/80 focus-within:border-accent"
    }`;

  const labelClass = "text-sm font-bold text-fg sm:w-1/3 sm:pt-1";
  const inputClass = "w-full bg-transparent text-sm outline-none sm:text-right";

  return (
    <div className="flex w-full flex-col">
      <div className="mb-12 flex items-baseline gap-3 font-mono text-base font-medium tracking-tight text-fg lg:mb-16">
        <span>0{step}</span>
        <span className="text-fg/40">/</span>
        <span className="text-fg/60">02</span>
      </div>

      {step === 1 ? (
        <form className="flex flex-col" noValidate>
          <input
            type="text"
            id="website"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="sr-only absolute -left-[9999px]"
          />
          <div className={getRowClass(!!errors.name)}>
            <label htmlFor="name" className={labelClass}>
              Full name <span className="text-red-500">*</span>
            </label>
            <div className="flex w-full flex-col sm:w-2/3 sm:items-end">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                placeholder="Full name"
                className={`${inputClass} ${errors.name ? "text-red-500 placeholder:text-red-500/50" : "text-fg placeholder:text-fg/40"}`}
              />
              {errors.name && <span className="mt-2 text-xs font-medium text-red-500">{errors.name}</span>}
            </div>
          </div>

          <div className={getRowClass(!!errors.email)}>
            <label htmlFor="email" className={labelClass}>
              Email <span className="text-red-500">*</span>
            </label>
            <div className="flex w-full flex-col sm:w-2/3 sm:items-end">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                placeholder="Your email"
                className={`${inputClass} ${errors.email ? "text-red-500 placeholder:text-red-500/50" : "text-fg placeholder:text-fg/40"}`}
              />
              {errors.email && <span className="mt-2 text-xs font-medium text-red-500">{errors.email}</span>}
            </div>
          </div>

          <div className={getRowClass(false)}>
            <label htmlFor="phone" className={labelClass}>
              Phone
            </label>
            <div className="flex w-full flex-col sm:w-2/3 sm:items-end">
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone"
                className={`${inputClass} text-fg placeholder:text-fg/40`}
              />
            </div>
          </div>

          <div className={getRowClass(false)}>
            <label htmlFor="company" className={labelClass}>
              Company / Organization
            </label>
            <div className="flex w-full flex-col sm:w-2/3 sm:items-end">
              <input
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Your company / organization"
                className={`${inputClass} text-fg placeholder:text-fg/40`}
              />
            </div>
          </div>

          <div className="mt-12 flex">
            <button
              type="button"
              onClick={onNext}
              className="group flex h-12 w-full cursor-pointer items-stretch border border-border/80 text-sm font-bold text-fg transition-colors duration-500 ease-out hover:border-accent"
            >
              <span className="flex flex-1 items-center px-4">Next</span>
              <span className="relative flex w-12 items-center justify-center overflow-hidden border-l border-border/80 transition-colors duration-500 ease-out group-hover:border-accent">
                <svg viewBox="0 0 24 24" className="absolute h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-[250%]" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg viewBox="0 0 24 24" className="absolute h-4 w-4 -translate-x-[250%] transition-transform duration-500 ease-out group-hover:translate-x-0" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col" noValidate>
          <div className="flex flex-col gap-6">
            <label htmlFor="message" className="text-[1.1rem] font-bold leading-snug text-fg">
              Tell us about the type of project, timeline, current phase and what you need (website, web app, mobile app, custom software, etc.) <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
              }}
              placeholder="Message"
              className={`w-full resize-none border-b py-4 text-sm outline-none transition-colors ${
                errors.message
                  ? "border-red-500 text-red-500 placeholder:text-red-500/50"
                  : "border-border/80 bg-transparent text-fg placeholder:text-fg/40 focus:border-accent"
              }`}
            />
            {errors.message && <span className="text-xs font-medium text-red-500">{errors.message}</span>}
          </div>

          <div className="mt-8 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => {
                  setAcceptedTerms(e.target.checked);
                  if (errors.terms) setErrors((prev) => ({ ...prev, terms: "" }));
                }}
                className={`h-4 w-4 shrink-0 rounded-sm outline-none transition-colors ${errors.terms ? "border-red-500" : "border-border/80 accent-fg"}`}
              />
              <label htmlFor="terms" className={`text-sm ${errors.terms ? "text-red-500" : "text-fg"}`}>
                I have read and accept the <Link href="/terms" className="underline underline-offset-2">terms and conditions</Link> and the <Link href="/privacy" className="underline underline-offset-2">privacy policy</Link>
              </label>
            </div>
            {errors.terms && <span className="text-xs font-medium text-red-500">{errors.terms}</span>}
          </div>

            {submitError && (
              <div className="mt-4 rounded bg-red-500/10 p-4 text-sm font-medium text-red-500">
                {submitError}
              </div>
            )}

            <div className="mt-12 flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={isSubmitting}
                aria-label="Back"
                className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center border border-border/80 text-fg transition-colors hover:border-accent disabled:opacity-50"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex h-12 flex-1 cursor-pointer items-stretch bg-fg text-sm font-bold text-bg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="flex flex-1 items-center px-4">
                  {isSubmitting ? "Sending..." : "Submit"}
                </span>
                {!isSubmitting && (
                  <span className="relative flex w-12 items-center justify-center overflow-hidden border-l border-bg/20 transition-colors duration-500 ease-out group-hover:border-bg/40">
                    <svg viewBox="0 0 24 24" className="absolute h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-[250%]" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="absolute h-4 w-4 -translate-x-[250%] transition-transform duration-500 ease-out group-hover:translate-x-0" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </button>
            </div>

          <div className="mt-12 border-t border-border/80 pt-6">
            <h4 className="mb-2 text-xs font-bold text-fg">Basic information on data protection</h4>
            <p className="text-[10px] leading-relaxed text-fg/60">
              Controller: XIRCONS. Purpose: To process and manage the provided data, which will be used exclusively for internal purposes and will not be shared with third parties under any circumstances, except by express request of a judicial authority. Legal basis: Consent of the data subject, in accordance with Regulation (EU) 2016/679 (GDPR). Rights: You have the right to withdraw your consent at any time, as well as to access, rectify, erase your data and exercise other rights recognized by current regulations, by sending a request to: <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2">{CONTACT_EMAIL}</a>. Additional information: You can find more information about the protection of your data in our Privacy Policy.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
