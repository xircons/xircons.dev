"use client";

import { useState } from "react";
import ActionButton from "@/components/ActionButton";

interface ValueItem {
  title: string;
  body: string;
  cta?: string;
}

const ITEMS: ValueItem[] = [
  {
    title: "Full-Stack Development",
    body: "End-to-end ownership from database schema to pixel-perfect UI. Type-safe APIs, modern frameworks, and CI/CD pipelines that ship reliably — without handoff gaps between layers.",
    cta: "See the work",
  },
  {
    title: "Data & Infrastructure",
    body: "Architecture decisions that hold up under real traffic and real teams. We design for change — modular boundaries, documented contracts, and infrastructure that scales without rewrites.",
    cta: "View approach",
  },
  {
    title: "Interaction & Experience",
    body: "Grid-driven layouts, restrained typography, and motion that earns its place. Every screen built around clarity and usability instead of unnecessary decoration.",
    cta: "Explore designs",
  },
  {
    title: "AI & Advanced Logic",
    body: "We embed the latest intelligence models where they create real leverage, with prompt caching, tool use, and evaluation pipelines that keep quality measurable and outputs reliable.",
    cta: "Explore capabilities",
  },
];

function AccordionItem({
  item,
  open,
  onToggle,
}: {
  item: ValueItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-t border-border/80 first:border-t-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-8 py-6 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-xl font-semibold tracking-tight text-fg sm:text-2xl lg:text-3xl">
          {item.title}
        </span>
        <span
          className="relative ml-6 grid h-6 w-6 shrink-0 place-items-center text-fg"
          aria-hidden="true"
        >
          <span className="absolute h-0.5 w-4 rounded-full bg-current" />
          <span
            className={`absolute h-0.5 w-4 rounded-full bg-current transition-transform duration-300 ease-out ${open ? "rotate-0" : "rotate-90"
              }`}
          />
        </span>
      </button>

      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-8 pb-8">
            <p className="max-w-prose text-base leading-relaxed text-fg/70 sm:text-lg">
              {item.body}
            </p>
            {item.cta && <ActionButton label={item.cta} className="mt-4" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ValueSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="relative z-10 w-full bg-bg text-fg">
      <div className="grid grid-cols-1 lg:grid-cols-2 my-24">

        <div className="lg:sticky lg:top-5">
          <div className="flex min-h-[50vh] flex-col justify-between gap-10 border border-border/80 p-6 lg:p-12">
            <div className="flex flex-col gap-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-fg/50">
                Value
              </span>
              <h2 className="max-w-sm text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-fg">
                Built to last. Shipped to matter.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-fg/50">
              Three principles behind every project — the things that separate work that holds up from work that has to be redone.
            </p>
          </div>
        </div>

        <div className="border border-border/80">
          {ITEMS.map((item, i) => (
            <AccordionItem
              key={item.title}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
