"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";
import ProjectCover from "@/components/ProjectCover";
import ProjectMeta from "@/components/ProjectMeta";

export interface StackCardData {
  slug: string;
  number: string;
  eyebrow: string;
  headline: string;
  body: string;
  imageSrc: string;
  images?: string[];
  isPrivate?: boolean;
  imageAlt: string;
  href: string;
  role?: string;
  year?: string;
}

interface WorksSectionProps {
  cards: StackCardData[];
  navbarOffsetPx?: number;
  introEyebrow?: string;
  introHeadline?: string;
}

const PAGE = 3;
const EASE = [0.22, 1, 0.36, 1] as const;
// Kept in sessionStorage so coming back from a project restores the same list and scroll spot.
const STORAGE_KEY = "works-shown";
const listeners = new Set<() => void>();

function readSaved() {
  try {
    return Number(sessionStorage.getItem(STORAGE_KEY)) || PAGE;
  } catch {
    return PAGE;
  }
}

function save(count: number) {
  try {
    sessionStorage.setItem(STORAGE_KEY, String(count));
  } catch {}
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  return () => listeners.delete(notify);
}

const LABEL = "font-mono uppercase tracking-[0.1em] text-muted";
// Hidden state only where hover exists; touch and narrow screens always show "View project".
const REVEAL =
  "transition-[opacity,translate] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:[@media(hover:hover)]:-translate-x-4 lg:[@media(hover:hover)]:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100";

function ProjectCard({ card }: { card: StackCardData }) {
  return (
    <article
      id={card.slug}
      className="group relative flex scroll-mt-20 flex-col gap-4 border-b border-border bg-bg px-5 pb-7 pt-6 text-fg lg:grid lg:grid-cols-[5fr_7fr] lg:gap-0 lg:border-b-0 lg:border-t lg:px-12 lg:py-0"
    >
      <Link href={card.href} aria-label={`Open ${card.headline}`} className="absolute inset-0 z-20" />

      <div className="flex flex-col gap-4 lg:justify-between lg:gap-8 lg:py-10 lg:pr-12">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[11px] text-muted lg:text-xs">{card.number}</span>
          <h3 className="text-2xl font-bold leading-[1.05] tracking-[-0.02em] lg:text-[32px]">{card.headline}</h3>
          <p className="max-w-[440px] text-[15px] lg:text-base leading-[1.55] text-[#4A4A4A]">{card.body}</p>
        </div>

        <div className="flex flex-col gap-4 lg:gap-0">
          <ProjectMeta type={card.eyebrow} role={card.role} year={card.year} />

          {/* 0fr -> 1fr row opens real space for the link, so the list above slides up instead of overlapping. */}
          <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:[@media(hover:hover)]:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
            <div className="flex min-h-0 justify-end overflow-hidden lg:justify-start">
              <span aria-hidden="true" className={`flex min-h-11 items-center gap-1.5 pb-1 text-[15px] font-medium lg:mt-5 lg:min-h-0 ${REVEAL}`}>
                <span className="relative">
                  View project
                  <span className="absolute inset-x-0 -bottom-0.5 h-px w-full bg-fg transition-[width] delay-[80ms] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:[@media(hover:hover)]:w-0 lg:group-hover:w-full group-focus-within:w-full" />
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="transition-[translate] delay-[120ms] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:[@media(hover:hover)]:-translate-x-1.5 lg:[@media(hover:hover)]:translate-y-1.5 lg:group-hover:translate-x-0 lg:group-hover:translate-y-0 group-focus-within:translate-x-0 group-focus-within:translate-y-0"
                >
                  <path d="M3 9 9 3M4 3h5v5" strokeLinecap="square" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="order-first lg:order-none lg:flex lg:items-center lg:border-l lg:border-border lg:py-10 lg:pl-10">
        <ProjectCover
          name={card.headline}
          imageSrc={card.imageSrc}
          images={card.images}
          isPrivate={card.isPrivate}
          alt={card.imageAlt}
          sizes="(min-width: 1024px) 50vw, 100vw"
          hoverScale="lg:group-hover:scale-[1.04] lg:group-focus-within:scale-[1.04]"
        />
      </div>
    </article>
  );
}

export default function WorksSection({
  cards,
  navbarOffsetPx = 88,
  introEyebrow = "Selected projects",
  introHeadline = "Systems built for government agencies, universities and student clubs.",
}: WorksSectionProps) {
  const total = cards.length;
  const shown = Math.min(useSyncExternalStore(subscribe, readSaved, () => PAGE), total);
  // Cards at or past this index animate in when they mount; restored cards never do.
  const [animateFrom, setAnimateFrom] = useState(Infinity);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const allShown = shown >= total;

  function toggle() {
    if (allShown) {
      const top = (sectionRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY;
      const collapse = () => save(PAGE);
      if (reduceMotion) {
        window.scrollTo({ top, behavior: "instant" });
        collapse();
        return;
      }
      // Stepped by hand so the collapse waits for the scroll (no scrollend in Safari); instant because html has scroll-smooth.
      animate(window.scrollY, top, {
        duration: 0.8,
        ease: EASE,
        onUpdate: (y) => window.scrollTo({ top: y, behavior: "instant" }),
        onComplete: collapse,
      });
      return;
    }
    setAnimateFrom(shown);
    save(Math.min(shown + PAGE, total));
  }

  return (
    <section ref={sectionRef} id="works" className="relative z-10 w-full bg-bg text-fg" data-navbar-theme="dark">
      <header className="grid grid-cols-1 border-t border-border lg:grid-cols-2" style={{ paddingTop: `${navbarOffsetPx}px` }}>
        <div className="flex flex-col gap-12 px-5 py-12 lg:justify-between lg:gap-16 lg:p-12">
          <span className={`${LABEL} text-xs`}>{introEyebrow}</span>
          <h2 className="text-balance text-[32px] lg:text-[48px] font-bold leading-[1.04] tracking-[-0.025em]">{introHeadline}</h2>
        </div>
      </header>

      <ol id="works-list">
        <AnimatePresence initial={false}>
          {cards.slice(0, shown).map((card, i) => {
            const enter = i >= animateFrom && !reduceMotion;
            const exit = { duration: reduceMotion ? 0 : 0.7, ease: EASE };
            const transition = { ...exit, delay: enter ? (i - animateFrom) * 0.12 : 0 };
            return (
              <motion.li
                key={card.slug}
                initial={enter ? { height: 0, opacity: 0 } : false}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0, transition: exit }}
                transition={transition}
                className="overflow-hidden"
              >
                <motion.div
                  initial={enter ? { y: 32 } : false}
                  animate={{ y: 0 }}
                  exit={{ y: 32, transition: exit }}
                  transition={transition}
                >
                  <ProjectCard card={card} />
                </motion.div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ol>

      <div
        className="flex flex-col gap-5 border-b border-border px-5 py-8 lg:grid lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-0 lg:border-t lg:px-12 lg:py-10"
      >
        <div className="flex items-center gap-6 lg:pr-12">
          <span aria-live="polite" className="shrink-0 font-mono text-[13px] text-muted">
            <span className="text-fg">{String(shown).padStart(2, "0")}</span> / {total} projects
          </span>
          {/* <span aria-hidden="true" className="relative h-px flex-1 bg-border">
            <span
              className="absolute inset-y-0 left-0 bg-fg transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ width: `${(shown / total) * 100}%` }}
            />
          </span> */}
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-controls="works-list"
          aria-expanded={allShown}
          className="flex h-[52px] w-full items-center justify-center gap-3 bg-fg px-7 text-[15px] font-semibold text-white lg:h-14 lg:w-auto lg:justify-self-end cursor-pointer"
        >
          {allShown ? "Show fewer" : "Show more work"}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
            className={`transition-transform duration-300 ${allShown ? "rotate-180" : ""}`}
          >
            <path d="M7 1v12M2 8l5 5 5-5" strokeLinecap="square" />
          </svg>
        </button>
      </div>
    </section>
  );
}
