"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";

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
          fill="#E0E6ED"
        >
          +
        </text>
      </svg>
    </div>
  );
}

interface LogoRevealProps {
  className?: string;
}

export default function LogoReveal({ className = "" }: LogoRevealProps) {
  const cursorRef = useRef<HTMLDivElement>(null);

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
    <div
      className={`group relative cursor-none overflow-hidden bg-[#1A1A1A] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-full w-full">
        <Image
          src="/logo/xircons-full-nobg.png?v=19"
          alt="Xircons logo"
          fill
          unoptimized
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain scale-[0.85] md:scale-[0.9] brightness-0 invert transition-opacity duration-300 group-hover:opacity-0"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/xircons-ascii-nobg.svg?v=20"
          alt="Xircons logo ASCII"
          className="absolute inset-0 z-10 h-full w-full pointer-events-none object-contain scale-[0.85] md:scale-[0.9] brightness-0 invert opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <AsciiCursor ref={cursorRef} />
      </div>
    </div>
  );
}
