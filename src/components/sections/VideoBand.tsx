"use client";

import { useEffect, useRef } from "react";

export default function VideoBand() {
  const bandRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let frame = 0;
    let target = 0;
    let current = 0;

    const measure = () => {
      const band = bandRef.current;
      if (!band) return;
      const rect = band.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = (viewport - rect.top) / (viewport + rect.height);
      const clamped = Math.min(Math.max(progress, 0), 1);
      const travel = rect.height * 0.15;
      target = (clamped - 0.5) * travel;
    };

    const render = () => {
      const video = videoRef.current;
      current += (target - current) * 0.06;
      if (video) {
        video.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;
      }
      frame = requestAnimationFrame(render);
    };

    measure();
    current = target;
    frame = requestAnimationFrame(render);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section className="relative z-0 w-full bg-bg" data-navbar-theme="light">
      <div ref={bandRef} className="relative h-[50vh] w-full overflow-hidden isolate">
        <video
          ref={videoRef}
          className="absolute inset-x-0 -top-[12.5%] z-0 h-[125%] w-full object-cover will-change-transform"
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
