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

interface RevealCard {
  eyebrow: string;
  body: string;
  href?: string;
  cta?: string;
}

interface ShrinkToRevealProps {
  imageSrc?: string;
  imageAlt?: string;
  edgePadding?: string;
  headline?: string;
  subhead?: string;
  scrollHeight?: string;
  cards?: RevealCard[];
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const DEFAULT_CARDS: RevealCard[] = [
  {
    eyebrow: "Lorem Ipsum",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966,",
  },
  {
    eyebrow: "Lorem Ipsum",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966,",
  },
];

export default function ShrinkToReveal({
  imageSrc = "/logo/xircons-full-nobg.png",
  imageAlt = "Xircons",
  edgePadding = "1.25rem",
  headline = "HELLO! I'M XIRCONS",
  subhead = "Full-Stack Developer experienced in building production-ready web applications, business platforms, and developer tools. Skilled in translating business requirements into scalable software solutions, from UX/UI design and database architecture to deployment and maintenance.",
  scrollHeight = "h-[120vh]",
  cards = DEFAULT_CARDS,
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

  const indicatorScaleY = useTransform(smoothProgress, [0.05, 1], [0, 1]);
  const indicatorOpacity = useTransform(smoothProgress, [0.05, 0.2, 0.95, 1], [0, 1, 1, 0.3]);


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
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover grayscale"
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

          <div className="grid min-h-0 grid-cols-2 border-x border-b border-t-0 border-border/80">
            {cards.map((card, idx) => (
              <a
                key={`${card.eyebrow}-${idx}`}
                href={card.href ?? "#"}
                className={`group relative flex min-h-0 flex-col justify-between gap-3 overflow-hidden p-4 transition-colors duration-500 ease-out sm:gap-4 sm:p-6 ${idx > 0 ? "border-l border-border/80" : ""
                  }`}
              >
                <div className="flex items-center justify-between sm:mb-8 lg:mb-12">
                  <h3 className="text-base font-bold uppercase transition-colors duration-300 group-hover:text-accent sm:text-lg">
                    {card.eyebrow}
                  </h3>
                </div>
                <p className="line-clamp-3 text-xs leading-relaxed text-fg/70 sm:line-clamp-4 sm:text-sm">
                  {card.body}
                </p>
                <div className="inline-flex w-full items-stretch border border-border/80 text-xs font-medium transition-colors duration-500 ease-out group-hover:border-accent group-hover:text-accent sm:text-sm">
                  <span className="flex flex-1 items-center px-4 py-2.5">
                    {card.cta ?? "Learn more"}
                  </span>
                  <span className="relative flex w-10 items-center justify-center overflow-hidden border-l border-border/80 transition-colors duration-500 ease-out group-hover:border-accent">
                    <ArrowIcon className="absolute transition-transform duration-500 ease-out group-hover:translate-x-[250%]" />
                    <ArrowIcon className="absolute -translate-x-[250%] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
