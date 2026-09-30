"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import HeadlineWord from "@/components/HeadlineWord";

interface ShrinkToRevealProps {
  imageSrc?: string;
  imageAlt?: string;
  edgePadding?: string;
  headline?: string;
  subhead?: string;
  scrollHeight?: string;
}

export default function ShrinkToReveal({
  imageSrc = "/logo/xircons-full-nobg.png",
  imageAlt = "Xircons",
  edgePadding = "1.25rem",
  headline = "HELLO! I'M XIRCONS",
  subhead = "Full-stack developer building web applications, business platforms, and developer tools. I take projects from business requirements and UX/UI design through database architecture, deployment, and maintenance.",
  scrollHeight = "h-[120vh]",
}: ShrinkToRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start -100px"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
    restDelta: 0.0005,
  });

  const bottomInset = useTransform(smoothProgress, [0, 1], [100, 0]);
  const clipPath = useMotionTemplate`inset(${edgePadding} ${edgePadding} calc(${bottomInset}% + ${edgePadding}) ${edgePadding})`;

  const imageY = useTransform(smoothProgress, [0, 1], ["8%", "0%"]);

  const overlayOpacity = useTransform(smoothProgress, [0, 1], [0.6, 0.15]);



  return (
    <section id="about" ref={containerRef} className={`relative w-full scroll-mt-24 ${scrollHeight}`} data-navbar-theme="dark">
      <div className="sticky top-0 flex h-screen flex-col sm:grid w-full sm:grid-cols-1 sm:grid-rows-[1fr] overflow-hidden bg-bg text-fg p-3 sm:p-5 lg:grid-cols-2 lg:grid-rows-[1fr]">
        <div className="relative flex-1 sm:h-auto min-h-0 overflow-hidden">
          <motion.div
            style={{ clipPath, WebkitClipPath: clipPath }}
            className="absolute inset-0 h-full w-full will-change-[clip-path]"
          >
            <motion.div
              style={{
                y: imageY,
              }}
              className="relative h-full w-full will-change-transform"
            >
              <div className="absolute inset-0 bg-fg/10 animate-pulse" />
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="relative z-10 object-cover grayscale"
              />
              <motion.div
                aria-hidden="true"
                style={{ opacity: overlayOpacity }}
                className="absolute inset-0"
              >
                <Image
                  src="/wuttikan/___________________copykub.jpg"
                  alt="Background overlay"
                  fill
                  className="object-cover grayscale"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <div
          className="flex flex-col sm:grid shrink-0 sm:min-h-0 overflow-hidden p-3 sm:p-5"
          style={{ gridTemplateRows: "1fr auto" }}
        >
          <div
            className="flex sm:min-h-0 flex-col justify-between gap-0 border border-border/80 p-6 sm:gap-8 sm:mb-0"
          >
            <h2
              className="text-balance text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-4xl lg:text-5xl xl:text-[3.75rem]"
              style={{ perspective: "800px" }}
            >
              {(() => {
                const lines = headline
                  .split(",")
                  .map((line) => line.trim())
                  .filter(Boolean)
                  .map((line) => line.split(" "));
                const total = lines.reduce((sum, words) => sum + words.length, 0);
                const span = 0.55 / Math.max(total, 1);
                const lineOffsets = lines.reduce<number[]>(
                  (acc, words, i) => [...acc, (acc[i - 1] ?? 0) + (lines[i - 1]?.length ?? 0)],
                  [],
                );
                return lines.map((words, lineIdx) => (
                  <span key={`line-${lineIdx}`} className="block">
                    {words.map((word, i) => {
                      const start = 0.08 + (lineOffsets[lineIdx] + i) * span;
                      return (
                        <HeadlineWord
                          key={`${word}-${lineIdx}-${i}`}
                          word={word}
                          progress={smoothProgress}
                          start={start}
                          end={start + span * 2.4}
                        />
                      );
                    })}
                  </span>
                ));
              })()}
            </h2>
            <p className="mt-12 max-w-[32rem] text-sm leading-relaxed text-fg/70 sm:text-base lg:text-lg">
              {subhead}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
