"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useCallback, useState, useEffect } from "react";

interface HeroSectionProps {
  headlineLines?: string[];
  subheadText?: string;
}

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

function AsciiCursor({ ref: cursorRef }: { ref: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={cursorRef}
      className="pointer-events-none absolute z-20 opacity-0 transition-opacity duration-150"
      style={{ transform: "translate(-50%, -50%)" }}
      aria-hidden="true"
    >
      <svg width="60" height="60" viewBox="-30 -30 60 60" xmlns="http://www.w3.org/2000/svg">
        <text
          x="0"
          y="0"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="12"
          fontFamily="'Courier New',monospace"
          fill="#1A1A1A"
        >
          +
        </text>
      </svg>
    </div>
  );
}

export default function HeroSection({
  headlineLines = ["FROM", "CONCEPT", "TO CODE"],
  subheadText = "Building products from concept to deployment.",
}: HeroSectionProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Hero section is 70vh tall. We subtract a small offset (~24px) so the logo
      // changes color exactly when it visually touches the video background.
      if (window.scrollY > window.innerHeight * 0.7 - 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on mount to set initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX - rect.left}px`;
      cursorRef.current.style.top = `${e.clientY - rect.top}px`;
      cursorRef.current.style.opacity = "1";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.opacity = "0";
    }
  }, []);

  return (
    <section className="w-full bg-bg">
      <div className="grid h-[70vh] max-h-[70vh] w-full grid-cols-[30vw_1fr] overflow-hidden bg-bg text-fg">

        <div className="flex h-full min-h-0 min-w-0 flex-col justify-between gap-4 overflow-hidden border-r border-border px-4 py-4 sm:px-6 sm:py-6 lg:px-10 lg:py-5">
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
              className={`object-contain object-left transition-opacity duration-300 ${isScrolled ? "opacity-0" : "opacity-100"}`}
            />
            <Image
              src="/logo/xircons-x-white-nobg.png"
              alt="Xircons White"
              fill
              priority
              sizes="(min-width: 1024px) 7rem, (min-width: 640px) 6rem, 5rem"
              className={`object-contain object-left transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"}`}
            />
          </Link>
          <div className="h-8 w-20 shrink-0 sm:h-10 sm:w-24 lg:h-12 lg:w-28" />
          <h1
            className={`min-w-0 break-words text-[clamp(1.5rem,4vw,6rem)] font-bold leading-[0.9] tracking-tight ${mounted ? "hero-enter" : "hero-enter-start"}`}
            style={{ "--enter-y": "24px" } as React.CSSProperties}
          >
            {headlineLines.map((line, index) => (
              <span key={`${line}-${index}`} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p
            className={`max-w-sm text-xs leading-relaxed text-accent/50 sm:text-sm lg:text-base ${mounted ? "hero-enter" : "hero-enter-start"}`}
            style={{ "--enter-y": "24px" } as React.CSSProperties}
          >
            {subheadText}
          </p>
        </div>

        <div className="grid h-full min-h-0 min-w-0 grid-rows-[auto_1fr] overflow-hidden">

          <div className="flex items-center justify-end gap-3 border-b border-border px-4 py-4 sm:px-6 sm:py-5 lg:px-10 lg:py-5">
            <button
              type="button"
              aria-label="Open menu"
              style={{ "--enter-x": "24px" } as React.CSSProperties}
              className={`fixed right-4 top-4 z-50 flex h-10 items-center border transition-colors sm:right-6 sm:top-5 sm:h-12 lg:right-10 lg:top-5 ${mounted ? "hero-enter" : "hero-enter-start"} ${isScrolled
                ? "border-white/40 bg-transparent text-white hover:bg-white/10"
                : "border-border bg-bg text-fg hover:bg-accent/5 hover:text-accent"
                }`}
            >
              <span className="hidden pl-4 pr-32 text-sm font-medium uppercase tracking-wide sm:inline">
                Menu
              </span>
              <span className={`flex h-full w-10 items-center justify-center border-l transition-colors sm:w-12 ${isScrolled ? "border-white/40" : "border-border"}`}>
                <MenuIcon />
              </span>
            </button>
            <div className="h-10 sm:h-12" />
          </div>

          <div className="relative grid min-h-0 w-full grid-cols-3 grid-rows-4 gap-[1px] overflow-hidden bg-border">

            <div className="flex items-center bg-bg px-4 sm:px-6 lg:px-8">
              <span
                className={`text-[10px] font-medium text-accent/50 uppercase tracking-[0.2em] sm:text-xs ${mounted ? "hero-enter" : "hero-enter-start"}`}
                style={{ "--enter-x": "24px" } as React.CSSProperties}
              >
                DEVELOPER
              </span>
            </div>

            <div className="bg-bg" />
            <div className="bg-bg" />

            <div
              className="group relative col-span-3 row-span-2 cursor-none overflow-hidden bg-bg"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`relative h-full w-full ${mounted ? "hero-enter" : "hero-enter-start"}`}
                style={{ "--enter-x": "24px" } as React.CSSProperties}
              >
                <Image
                  src="/logo/xircons-full-nobg.png?v=19"
                  alt="Xircons logo"
                  fill
                  unoptimized
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain scale-[0.85] md:scale-[0.9] transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src="/logo/xircons-ascii-nobg.svg?v=20"
                  alt="Xircons logo ASCII"
                  className="absolute inset-0 z-10 h-full w-full pointer-events-none object-contain scale-[0.85] md:scale-[0.9] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <AsciiCursor ref={cursorRef} />
              </div>
            </div>

            <div className="bg-bg" />
            <div className="bg-bg" />
            <div className="bg-bg" />

          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden bg-bg">
        <video
          className="block h-auto w-full"
          src="/video/hero-background-optimized.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
