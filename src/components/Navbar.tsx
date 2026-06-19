"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="M4 9h16M4 15h16" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const triggerY = 60;
    let rafId = 0;

    const checkTheme = () => {
      const elements = document.querySelectorAll<HTMLElement>("section, [data-navbar-theme]");
      let activeTheme: "light" | "dark" = "dark"; // Default to dark for Hero if no tag

      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        // If this element covers the trigger line (y=60), it is the active one
        if (rect.top <= triggerY && rect.bottom > triggerY) {
          activeTheme = el.dataset.navbarTheme === "light" ? "light" : "dark";
        }
      }

      setIsLight(activeTheme === "light");
      rafId = requestAnimationFrame(checkTheme);
    };

    rafId = requestAnimationFrame(checkTheme);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <Link
        href="/"
        className={`fixed left-4 top-4 z-50 block h-8 w-20 shrink-0 sm:left-6 sm:top-6 sm:h-10 sm:w-24 lg:left-10 lg:top-5 lg:h-12 lg:w-28 ${mounted ? "hero-enter" : "hero-enter-start"}`}
        style={{ "--enter-y": "-16px" } as React.CSSProperties}
      >
        <Image
          src="/logo/xircons-x-nobg.png"
          alt="Xircons"
          fill
          priority
          sizes="(min-width: 1024px) 7rem, (min-width: 640px) 6rem, 5rem"
          className={`object-contain object-left transition-opacity duration-300 ${isLight ? "opacity-0" : "opacity-100"}`}
        />
        <Image
          src="/logo/xircons-x-white-nobg.png"
          alt="Xircons White"
          fill
          priority
          sizes="(min-width: 1024px) 7rem, (min-width: 640px) 6rem, 5rem"
          className={`object-contain object-left transition-opacity duration-300 ${isLight ? "opacity-100" : "opacity-0"}`}
        />
      </Link>

      <button
        type="button"
        aria-label="Open menu"
        style={{ "--enter-x": "24px" } as React.CSSProperties}
        className={`fixed right-4 top-4 z-50 flex h-10 items-center border transition-colors sm:right-6 sm:top-5 sm:h-12 lg:right-10 lg:top-5 ${mounted ? "hero-enter" : "hero-enter-start"} ${isLight
          ? "border-white/40 bg-bg text-fg hover:bg-bg/90"
          : "border-border bg-fg text-bg hover:bg-fg/90"
          }`}
      >
        <span className="hidden pl-4 pr-32 text-sm font-medium uppercase tracking-wide sm:inline">
          Menu
        </span>
        <span className={`flex h-full w-10 items-center justify-center border-l transition-colors sm:w-12 ${isLight ? "border-white/40" : "border-border"}`}>
          <MenuIcon />
        </span>
      </button>
    </>
  );
}
