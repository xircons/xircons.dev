"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring } from "framer-motion";
import ActionButton from "@/components/ActionButton";
import HeadlineWord from "@/components/HeadlineWord";

const HEADLINE = "Building scalable software solutions.";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setRevealed(entries[0].isIntersecting);
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, revealed };
}

interface ValueItem {
  title: string;
  body: string;
  skills?: string[];
  cta?: string;
}

const ITEMS: ValueItem[] = [
  {
    title: "Full-Stack Development",
    body: "I am experienced in building production-ready web applications, business platforms, and developer tools. I handle the entire software development lifecycle—from translating business requirements and system design to full-stack development using React, Next.js, TypeScript, and Node.js.",
    skills: [
      "React & Next.js",
      "Astro & Islands",
      "Vite & Redux Toolkit",
      "Node.js & Express",
      "Python Flask (Beginner)",
      "RESTful Routing & Auth",
      "Socket.io & JWT",
    ],
    cta: "See the work",
  },
  {
    title: "Data & Infrastructure",
    body: "I design database architectures and robust deployment workflows across both development and production environments. I focus on building scalable software solutions, reliable REST API integrations, and maintaining infrastructure that can support complex internal and customer-facing platforms.",
    skills: [
      "PostgreSQL",
      "MySQL",
      "Firestore",
      "GitHub Actions",
      "Docker",
      "Linux",
      "CI/CD",
      "Nginx",
    ],
    cta: "View approach",
  },
  {
    title: "Interaction & Experience",
    body: "I collaborate heavily on UX/UI design and feature planning to deliver truly user-centered solutions. By building clean, multi-language platforms and intuitive administrative dashboards, I ensure that the frontend experience is highly scalable, engaging, and easy to navigate.",
    skills: [
      "Framer Motion",
      "Scroll Animations",
      "Micro-interactions",
      "CSS Transitions",
      "Tailwind CSS & Radix UI",
      "Responsive UI & Component Design",
      "Chart.js & Recharts",
    ],
    cta: "Explore designs",
  },
  {
    title: "AI & Advanced Logic",
    body: "I build advanced features and automated developer tools, such as zero-configuration CLI packages and automated testing pipelines. I focus on implementing dynamic logic, secure authentication, and real-time operations that transform complex datasets into production-ready features.",
    skills: [
      "LLM Integration & Tool Use",
      "Prompt Caching",
      "Evaluation Pipelines",
      "State Machines",
      "Advanced Data Parsing",
    ],
    cta: "Explore capabilities",
  },
];

function AccordionItem({
  item,
  open,
  onToggle,
  index,
}: {
  item: ValueItem;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`border-t border-border/80 first:border-t-0 transition-all duration-700 ease-out ${revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
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
            {item.skills && (
              <ul className="mt-8 flex flex-col gap-2">
                {item.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-[10px] font-semibold uppercase tracking-widest text-fg/60"
                  >
                    / {skill}
                  </li>
                ))}
              </ul>
            )}
            {item.cta && <ActionButton label={item.cta} className="mt-8" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ValueSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section id="skills" ref={sectionRef} className="relative z-10 w-full scroll-mt-24 bg-bg text-fg">
      <div className="grid grid-cols-1 lg:grid-cols-2 my-24">

        <div className="lg:sticky lg:top-5">
          <div className="flex min-h-[40vh] lg:min-h-[75vh] flex-col justify-between gap-10 border border-border/80 p-6 lg:p-12">
            <div className="flex flex-col gap-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-fg/50">
                Value
              </span>
              <h2
                className="max-w-sm text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-fg"
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
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-fg/50">
              Translating business requirements into production-ready platforms, from system design to final deployment.
            </p>
          </div>
        </div>

        <div className="border border-border/80">
          {ITEMS.map((item, i) => (
            <AccordionItem
              key={item.title}
              item={item}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
