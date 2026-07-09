"use client";

import Image from "next/image";
import { useRef, useCallback, useState, useEffect } from "react";

interface HeroSectionProps {
  headlineLines?: string[];
  subheadText?: string;
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reveal = () => setIsVideoLoaded(true);

    // If the video already has data (fast/cached load), the loadeddata
    // event may have fired before this listener attached — reveal now.
    if (video.readyState >= 2) {
      reveal();
      return;
    }

    video.addEventListener("loadeddata", reveal);
    video.addEventListener("canplay", reveal);
    // Never leave the skeleton stuck if the source fails.
    video.addEventListener("error", reveal);

    return () => {
      video.removeEventListener("loadeddata", reveal);
      video.removeEventListener("canplay", reveal);
      video.removeEventListener("error", reveal);
    };
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
    <section className="flex h-[100vh] w-full flex-col bg-bg lg:block lg:h-auto">
      <div className="grid min-h-0 w-full flex-1 grid-cols-[42vw_1fr] overflow-hidden bg-bg text-fg sm:grid-cols-[35vw_1fr] lg:h-[70vh] lg:max-h-[70vh] lg:flex-none lg:grid-cols-[30vw_1fr]">

        <div className="flex h-full min-h-0 min-w-0 flex-col justify-between gap-4 overflow-hidden border-r border-border/80 px-4 py-4 sm:px-6 sm:py-6 lg:px-10 lg:py-5">
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

          <div className="flex items-center justify-end gap-3 border-b border-border/80 px-4 py-4 sm:px-6 sm:py-5 lg:px-10 lg:py-5">
            <div className="h-10 sm:h-12" />
          </div>

          <div className="relative grid min-h-0 w-full grid-cols-2 grid-rows-4 sm:grid-cols-3 gap-[1px] overflow-hidden bg-border/80">

            <div className="flex items-center bg-bg px-4 sm:px-6 lg:px-8">
              <span
                className={`text-[10px] font-medium text-accent/50 uppercase tracking-[0.2em] sm:text-xs ${mounted ? "hero-enter" : "hero-enter-start"}`}
                style={{ "--enter-x": "24px" } as React.CSSProperties}
              >
                DEVELOPER
              </span>
            </div>

            <div className="bg-bg" />
            <div className="hidden sm:block bg-bg" />

            <div
              className="group relative col-span-2 row-span-2 sm:col-span-3 sm:row-span-2 cursor-none overflow-hidden bg-bg"
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
            <div className="hidden sm:block bg-bg" />

          </div>
        </div>
      </div>

      <div className="relative w-full shrink-0 overflow-hidden bg-bg aspect-video" data-navbar-theme="light">
        {!isVideoLoaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-fg/10 animate-pulse">
            <span className="sr-only">Loading video...</span>
          </div>
        )}
        <video
          ref={videoRef}
          className={`block h-auto w-full transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          src="/video/hero-background-optimized.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
