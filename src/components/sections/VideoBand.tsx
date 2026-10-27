"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useBackgroundVideo } from "@/lib/use-background-video";

export default function VideoBand() {
  const bandRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const showVideo = useBackgroundVideo();

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
      const layer = layerRef.current;
      current += (target - current) * 0.06;
      if (layer) {
        layer.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;
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
        <div ref={layerRef} className="absolute inset-x-0 -top-[12.5%] z-0 h-[125%] w-full will-change-transform">
          {/* Same src and sizes as the hero poster, so phones reuse that request instead of fetching the raw file. */}
          <Image src="/video/hero-poster.webp" alt="" fill sizes="100vw" className="object-cover" />
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={showVideo ? "/video/hero-background.mp4" : undefined}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
