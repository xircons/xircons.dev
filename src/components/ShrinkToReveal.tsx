"use client";

import { useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";
import HeadlineWord from "@/components/HeadlineWord";
import { projects } from "@/data/projects";

export interface Fact {
  label: string;
  value: string;
}

interface ShrinkToRevealProps {
  imageSrc?: string;
  imageAlt?: string;
  headline?: string;
  subhead?: string;
  facts?: Fact[];
}

const DEFAULT_FACTS: Fact[] = [
  { label: "Based in", value: "Chiang Mai, Thailand" },
  { label: "Currently", value: "Full-Stack Developer Intern, turnPRO" },
  { label: "Studying", value: "Digital Industry Integration, Chiang Mai University" },
];

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
const EASE = { ease: easeOutCubic };

// Must match the lg:motion-safe classes below, which set the height before hydration.
const ANIMATED_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

function useAnimated() {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(ANIMATED_QUERY);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(ANIMATED_QUERY).matches,
    // false keeps the server HTML in its final, visible state; the desktop timeline takes over after hydration.
    () => false,
  );
}

export default function ShrinkToReveal({
  imageSrc = "/logo/xircons-full-nobg.png",
  imageAlt = "Xircons",
  headline = "HELLO! I'M XIRCONS",
  subhead = "I'm Wuttikan Suksan. I turn messy requirements into software people use every day: attendance check-ins over LINE, carbon estimates drawn on a map, club management for a whole university.",
  facts = DEFAULT_FACTS,
}: ShrinkToRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const animated = useAnimated();

  // 0 when the section's top enters the viewport bottom, 0.5 when it pins, 1 when the pin ends.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
    restDelta: 0.0005,
  });

  const finished = useMotionValue(1);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full scroll-mt-24 lg:motion-safe:h-[200vh]"
      data-navbar-theme="dark"
    >
      {/* Remount on mode change so every transform re-binds to the right source. */}
      <AboutContent
        key={animated ? "animated" : "static"}
        progress={animated ? smoothProgress : finished}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        headline={headline}
        subhead={subhead}
        facts={facts}
      />
    </section>
  );
}

function AboutContent({
  progress,
  imageSrc,
  imageAlt,
  headline,
  subhead,
  facts,
}: Required<ShrinkToRevealProps> & { progress: MotionValue<number> }) {
  const bottomInset = useTransform(progress, [0, 0.45], [100, 0], EASE);
  const clipPath = useMotionTemplate`inset(0 0 ${bottomInset}% 0)`;
  const imageScale = useTransform(progress, [0, 0.45], [1.12, 1], EASE);
  const imageY = useTransform(progress, [0, 0.45], ["-6%", "0%"], EASE);

  const frame = useTransform(progress, [0.3, 0.5], [0, 1], EASE);

  const eyebrowOpacity = useTransform(progress, [0.12, 0.22], [0, 1], EASE);
  const eyebrowLine = useTransform(progress, [0.12, 0.3], [0, 1], EASE);

  const subheadOpacity = useTransform(progress, [0.46, 0.58], [0, 1], EASE);
  const subheadY = useTransform(progress, [0.46, 0.58], [16, 0], EASE);

  const closingLine = useTransform(progress, [0.74, 0.84], [0, 1], EASE);

  const statsOpacity = useTransform(progress, [0.8, 0.9], [0, 1], EASE);
  const statsY = useTransform(progress, [0.8, 0.9], [16, 0], EASE);
  const count = useTransform(progress, [0.82, 0.97], [0, projects.length], EASE);
  const roundedCount = useTransform(count, (v) => Math.round(v));

  return (
    <div className="grid grid-cols-1 gap-3 overflow-hidden bg-bg p-3 text-fg sm:p-5 lg:h-screen lg:grid-cols-2 lg:gap-5 lg:motion-safe:sticky lg:motion-safe:top-0">
      <div className="relative h-[420px] overflow-hidden lg:h-full">
        <motion.div
          style={{ clipPath, WebkitClipPath: clipPath }}
          className="absolute inset-0 will-change-[clip-path]"
        >
          <motion.div
            style={{ scale: imageScale, y: imageY }}
            className="relative h-full w-full will-change-transform"
          >
            <div className="absolute inset-0 bg-fg/10 animate-pulse" />
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="relative z-10 object-cover object-top grayscale"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative flex min-h-0 flex-col justify-between gap-12 p-6 sm:p-8 lg:p-10">
        {/* Frame drawn as four lines so each side can grow in its own direction. */}
        <motion.span aria-hidden="true" style={{ scaleX: frame }} className="absolute inset-x-0 top-0 h-px origin-left bg-border" />
        <motion.span aria-hidden="true" style={{ scaleY: frame }} className="absolute inset-y-0 right-0 w-px origin-top bg-border" />
        <motion.span aria-hidden="true" style={{ scaleX: frame }} className="absolute inset-x-0 bottom-0 h-px origin-right bg-border" />
        <motion.span aria-hidden="true" style={{ scaleY: frame }} className="absolute inset-y-0 left-0 w-px origin-bottom bg-border" />

        <div>
          <div className="relative pb-[14px]">
            <motion.span
              style={{ opacity: eyebrowOpacity }}
              className="block font-mono text-xs uppercase tracking-[0.1em] text-muted"
            >
              About
            </motion.span>
            <motion.span
              aria-hidden="true"
              style={{ scaleX: eyebrowLine }}
              className="absolute inset-x-0 bottom-0 h-px origin-left bg-border"
            />
          </div>

          <h2
            className="mt-9 text-[32px] lg:text-[48px] font-bold leading-[1.02] tracking-[-0.025em]"
            style={{ perspective: "800px" }}
          >
            {headline.split(" ").map((word, i) => (
              <HeadlineWord
                key={`${word}-${i}`}
                word={word}
                progress={progress}
                start={0.16 + i * 0.06}
                end={0.31 + i * 0.06}
                ease={easeOutCubic}
              />
            ))}
          </h2>

          <motion.p
            style={{ opacity: subheadOpacity, y: subheadY }}
            className="mt-7 max-w-[34em] text-[15px] lg:text-base leading-[1.55] text-[#4A4A4A]"
          >
            {subhead}
          </motion.p>
        </div>

        <div>
          <dl>
            {facts.map((fact, i) => (
              <FactRow key={fact.label} fact={fact} index={i} progress={progress} />
            ))}
          </dl>
          <motion.div aria-hidden="true" style={{ scaleX: closingLine }} className="h-px origin-left bg-border" />

          <motion.div
            style={{ opacity: statsOpacity, y: statsY }}
            className="mt-7 grid grid-cols-2 divide-x divide-border border border-border"
          >
            <div className="px-5 py-[18px]">
              <span className="block text-4xl font-bold tracking-[-0.02em] tabular-nums">
                <motion.span aria-hidden="true">{roundedCount}</motion.span>
                <span className="sr-only">{projects.length}</span>
              </span>
              <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                Selected projects
              </span>
            </div>
            <div className="px-5 py-[18px]">
              <span className="block text-4xl font-bold tracking-[-0.02em] tabular-nums">1st</span>
              <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                iCAS-CMU HUB Hackathon 2025
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function FactRow({ fact, index, progress }: { fact: Fact; index: number; progress: MotionValue<number> }) {
  const a = 0.56 + index * 0.05;
  const line = useTransform(progress, [a, a + 0.1], [0, 1], EASE);
  const opacity = useTransform(progress, [a + 0.03, a + 0.13], [0, 1], EASE);
  const y = useTransform(progress, [a + 0.03, a + 0.13], [12, 0], EASE);

  return (
    <div className="relative py-[14px] lg:grid lg:grid-cols-[150px_1fr] lg:items-baseline lg:gap-4">
      <motion.span aria-hidden="true" style={{ scaleX: line }} className="absolute inset-x-0 top-0 h-px origin-left bg-border" />
      <motion.dt
        style={{ opacity, y }}
        className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted"
      >
        {fact.label}
      </motion.dt>
      <motion.dd style={{ opacity, y }} className="mt-1 text-base font-medium lg:mt-0">
        {fact.value}
      </motion.dd>
    </div>
  );
}
