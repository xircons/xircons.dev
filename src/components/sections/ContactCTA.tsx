"use client";

import { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import ActionButton from "@/components/ActionButton";
import HeadlineWord from "@/components/HeadlineWord";

const HEADLINE = "Build something that actually ships.";

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
    restDelta: 0.0005,
  });

  const words = HEADLINE.split(" ");
  const span = 0.6 / words.length;

  return (
    <section ref={sectionRef} className="w-full bg-[#1A1A1A] text-[#E0E6ED]">

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2">
        <div className="px-8 py-12 lg:col-start-1 lg:row-start-1 lg:border-r lg:border-b lg:border-border/20 lg:px-16 lg:py-16">
          <span className="mb-8 block text-xs font-medium uppercase tracking-[0.2em] text-[#E0E6ED]/40">
            Contact
          </span>
          <p className="max-w-sm text-base leading-relaxed text-[#E0E6ED]/60 sm:text-lg">
            Tell us about your project and we will advise you on the fit, scope, and options — as well as how to integrate the right technology into your timeline and objectives.
          </p>
        </div>

        <div className="flex flex-col justify-end px-8 py-12 lg:col-span-2 lg:col-start-2 lg:row-start-2 lg:px-16 lg:py-16 border-y border-l border-border/20">
          <h2
            className="mb-8 max-w-4xl text-[clamp(2rem,5vw,4rem)] font-bold leading-[1] tracking-tight text-[#E0E6ED]"
            style={{ perspective: "800px" }}
          >
            {words.map((word, i) => {
              const start = 0.1 + i * span;
              return (
                <HeadlineWord
                  key={`${word}-${i}`}
                  word={word}
                  progress={smoothProgress}
                  start={start}
                  end={start + span * 2.4}
                />
              );
            })}
          </h2>

          <ActionButton href="/contact" label="Contact" tone="dark" />
        </div>
      </div>

    </section>
  );
}
