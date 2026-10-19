"use client";

import { useRef, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import PrivateCover from "@/components/PrivateCover";
import { hasCover } from "@/data/projects";

export interface StackCardData {
  slug: string;
  number: string;
  eyebrow: string;
  headline: string;
  body: string;
  imageSrc: string;
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
const LABEL = "font-mono uppercase tracking-[0.1em] text-muted";
// Hidden state only where hover exists; touch and narrow screens always show "View project".
const REVEAL =
  "transition-[opacity,translate] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:[@media(hover:hover)]:-translate-x-4 lg:[@media(hover:hover)]:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100";

function ProjectCard({ card }: { card: StackCardData }) {
  const meta = [
    { label: "Type", value: card.eyebrow },
    { label: "Role", value: card.role },
    { label: "Year", value: card.year },
  ];

  return (
    <article
      id={card.slug}
      className="group relative flex scroll-mt-20 flex-col gap-4 border-b border-border bg-bg px-5 pb-7 pt-6 text-fg lg:grid lg:grid-cols-[5fr_7fr] lg:gap-0 lg:border-b-0 lg:border-t lg:px-12 lg:py-0"
    >
      <Link href={card.href} aria-label={`Open ${card.headline}`} className="absolute inset-0 z-20" />

      <div className="flex flex-col gap-4 lg:justify-between lg:gap-8 lg:py-10 lg:pr-12">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[11px] text-muted lg:text-xs">{card.number}</span>
          <h3 className="text-[28px] font-bold leading-[1.05] tracking-[-0.02em] lg:text-[44px]">{card.headline}</h3>
          <p className="max-w-[440px] text-[15px] leading-[1.55] text-[#4A4A4A] lg:text-[17px]">{card.body}</p>
        </div>

        <div className="flex flex-col gap-4 lg:gap-5">
          <dl>
            {meta.map(({ label, value }) => (
              <div
                key={label}
                className="grid grid-cols-[72px_1fr] items-baseline gap-4 border-t border-border py-2.5 last:border-b lg:grid-cols-[96px_1fr] lg:py-3"
              >
                <dt className={`${LABEL} text-[10px] lg:text-[11px]`}>{label}</dt>
                <dd className="text-sm font-medium lg:text-[15px]">{value}</dd>
              </div>
            ))}
          </dl>

          <span aria-hidden="true" className={`flex min-h-11 items-center gap-1.5 self-end text-[15px] font-medium lg:min-h-0 lg:self-start ${REVEAL}`}>
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

      <div className="order-first lg:order-none lg:flex lg:items-center lg:border-l lg:border-border lg:py-10 lg:pl-10">
        <div className="w-full lg:bg-[#F2F3F5] lg:p-7">
          <div className="relative aspect-video overflow-hidden border border-border">
            {hasCover(card.imageSrc) ? (
              <>
                <div className="absolute inset-0 animate-pulse bg-fg/10" />
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  fill
                  quality={100}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="relative z-10 object-cover object-top transition-transform duration-[600ms] ease-out lg:group-hover:scale-[1.04] lg:group-focus-within:scale-[1.04]"
                />
              </>
            ) : (
              <PrivateCover name={card.headline} />
            )}
          </div>
        </div>
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
  const [shown, setShown] = useState(Math.min(PAGE, total));
  // Cards at or past this index animate in when they mount; the initial page never does.
  const [animateFrom, setAnimateFrom] = useState(PAGE);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const allShown = shown >= total;
  const behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";

  function toggle() {
    if (!allShown) {
      setAnimateFrom(shown);
      setShown(Math.min(shown + PAGE, total));
      return;
    }
    const bar = barRef.current;
    const before = bar?.getBoundingClientRect().top ?? 0;
    flushSync(() => setShown(PAGE));
    // Keep the bar where it was before the cards above it vanished, then glide up from there.
    if (bar) window.scrollBy({ top: bar.getBoundingClientRect().top - before, behavior: "instant" });
    sectionRef.current?.scrollIntoView({ behavior, block: "start" });
  }

  function jumpTo(event: MouseEvent<HTMLAnchorElement>, index: number) {
    event.preventDefault();
    if (index >= shown) {
      const next = Math.min(Math.ceil((index + 1) / PAGE) * PAGE, total);
      // No height animation here: the scroll target must already be at its final position.
      flushSync(() => {
        setAnimateFrom(next);
        setShown(next);
      });
    }
    const slug = cards[index].slug;
    document.getElementById(slug)?.scrollIntoView({ behavior, block: "start" });
    history.pushState(null, "", `#${slug}`);
  }

  return (
    <section ref={sectionRef} id="works" className="relative z-10 w-full bg-bg text-fg" data-navbar-theme="dark">
      <header className="grid grid-cols-1 border-t border-border lg:grid-cols-2" style={{ paddingTop: `${navbarOffsetPx}px` }}>
        <div className="flex flex-col gap-12 px-5 py-12 lg:justify-between lg:gap-16 lg:p-12">
          <span className={`${LABEL} text-xs`}>{introEyebrow}</span>
          <h2 className="text-balance text-[32px] font-bold leading-[1.04] tracking-[-0.025em] lg:text-[56px]">{introHeadline}</h2>
        </div>

        <nav aria-label="Project index" className="hidden border-l border-border p-12 lg:block">
          <div className={`flex justify-between pb-[14px] text-xs ${LABEL}`}>
            <span>Index</span>
            <span>{total} projects</span>
          </div>
          <ol className="border-b border-border">
            {cards.map((card, i) => (
              <li key={card.slug}>
                <a
                  href={`#${card.slug}`}
                  onClick={(e) => jumpTo(e, i)}
                  className="grid min-h-10 grid-cols-[64px_1fr_auto] items-center border-t border-border"
                >
                  <span className="font-mono text-[11px] text-muted">{card.number}</span>
                  <span className="text-base font-medium">{card.headline}</span>
                  <span className={`text-[11px] ${LABEL}`}>{card.eyebrow}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      <ol id="works-list">
        {cards.slice(0, shown).map((card, i) => {
          const animate = i >= animateFrom && !reduceMotion;
          const transition = { duration: 0.7, ease: EASE, delay: (i - animateFrom) * 0.12 };
          return (
            <motion.li
              key={card.slug}
              initial={animate ? { height: 0, opacity: 0 } : false}
              animate={{ height: "auto", opacity: 1 }}
              transition={transition}
              className="overflow-hidden"
            >
              <motion.div initial={animate ? { y: 32 } : false} animate={{ y: 0 }} transition={transition}>
                <ProjectCard card={card} />
              </motion.div>
            </motion.li>
          );
        })}
      </ol>

      <div
        ref={barRef}
        className="flex flex-col gap-5 border-b border-border px-5 py-8 lg:grid lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-0 lg:border-t lg:px-12 lg:py-10"
      >
        <div className="flex items-center gap-6 lg:pr-12">
          <span aria-live="polite" className="shrink-0 font-mono text-[13px] text-muted">
            <span className="text-fg">{String(shown).padStart(2, "0")}</span> / {total} projects
          </span>
          <span aria-hidden="true" className="relative h-px flex-1 bg-border">
            <span
              className="absolute inset-y-0 left-0 bg-fg transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ width: `${(shown / total) * 100}%` }}
            />
          </span>
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-controls="works-list"
          aria-expanded={allShown}
          className="flex h-[52px] w-full items-center justify-center gap-3 bg-fg px-7 text-[15px] font-semibold text-white lg:h-14 lg:w-auto lg:justify-self-end"
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
