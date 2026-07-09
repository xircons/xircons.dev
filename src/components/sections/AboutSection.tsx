import Image from "next/image";
import ActionButton from "@/components/ActionButton";

const CARDS = [
  {
    label: "Design Systems",
    body: "Component libraries built with strict tokens, documented contracts, and zero ambiguity between design and code.",
    cta: "Learn more",
  },
  {
    label: "AI Integration",
    body: "Embedding intelligence where it creates real leverage — Claude models, tool use, and evaluation pipelines built in.",
    cta: "Learn more",
  },
];

export default function AboutSection() {
  return (
    <section className="w-full bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        <div className="relative min-h-[60vw] lg:min-h-screen">
          <div className="absolute inset-0 bg-fg/10 animate-pulse" />
          <Image
            src="/wuttikan/___________________copykub.jpg"
            alt="Xircons studio"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="relative z-10 object-cover object-center grayscale"
          />
        </div>

        <div className="flex flex-col border-t border-border/80 px-8 py-16 lg:border-l lg:border-t-0 lg:px-16 lg:py-24 xl:px-20 xl:py-28">

          <span className="mb-10 text-xs font-medium uppercase tracking-[0.2em] text-[#1A1A1A]/40">
            About
          </span>

          <h2 className="mb-10 text-[clamp(2rem,4vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-[#1A1A1A]">
            Engineering with intention, shipping with precision.
          </h2>

          <p className="mb-16 max-w-prose text-base leading-relaxed text-[#1A1A1A]/60 sm:text-lg">
            Xircons is a one-person studio at the intersection of design and engineering. Every project starts from first principles — the right stack, the right constraints, and a commitment to work that holds up long after launch.
          </p>

          <div className="mt-auto grid grid-cols-1 gap-8 border-t border-border/80 pt-10 sm:grid-cols-2">
            {CARDS.map((card) => (
              <div key={card.label} className="flex flex-col gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1A1A]">
                  {card.label}
                </span>
                <div className="h-px w-full bg-border/80" />
                <p className="text-sm leading-relaxed text-[#1A1A1A]/60">
                  {card.body}
                </p>
                <ActionButton label={card.cta} className="mt-auto" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
