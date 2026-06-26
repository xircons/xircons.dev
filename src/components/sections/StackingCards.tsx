import Image from "next/image";
import ActionButton from "@/components/ActionButton";

export interface StackCardData {
  eyebrow: string;
  headline: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
  cta?: string;
}

interface StackingCardsProps {
  cards: StackCardData[];
  navbarOffsetPx?: number;
  cardHeight?: string;
  peekPx?: number;
  introEyebrow?: string;
  introHeadline?: string;
}

function StackedCard({
  card,
  index,
  navbarOffsetPx,
  cardHeight,
  peekPx,
}: {
  card: StackCardData;
  index: number;
  navbarOffsetPx: number;
  cardHeight: string;
  peekPx: number;
}) {
  const number = `${String(index + 1).padStart(2, "0")} /`;
  const top = navbarOffsetPx + index * peekPx;

  return (
    <article
      className={`sticky overflow-hidden border-t border-border/80 bg-bg text-fg ${index > 0 ? "shadow-[0_-5px_12.5px_rgba(0,0,0,0.015)]" : ""
        }`}
      style={{ top: `${top}px`, height: cardHeight, zIndex: index + 1 }}
    >
      <div className="grid h-full grid-cols-1 lg:grid-cols-[8%_48%_44%]">
        <div className="hidden items-start justify-center border-r border-border/80 pt-5 font-mono text-sm font-medium tracking-tight text-accent lg:flex">
          {number}
        </div>

        <div className="relative min-h-0 overflow-hidden border-b border-border/80 p-6 lg:border-b-0 lg:border-r">
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={card.imageSrc}
              alt={card.imageAlt}
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="flex min-h-0 flex-col">
          <div className="flex items-center gap-4 px-6 py-5 lg:px-12">
            <span className="font-mono text-sm font-medium tracking-tight text-accent lg:hidden">
              {number}
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.1em] sm:text-sm lg:text-base">
              {card.eyebrow}
            </span>
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-between gap-8 overflow-hidden px-6 py-14 lg:px-12 lg:py-20">
            <h3 className="text-balance text-3xl font-bold leading-[1.04] tracking-[-0.02em] sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
              {card.headline}
            </h3>
            <p className="max-w-[36rem] text-sm leading-relaxed text-fg/70 sm:text-base lg:text-lg">
              {card.body}
            </p>
            <ActionButton href={card.href ?? "#"} label={card.cta ?? "Learn more"} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function StackingCards({
  cards,
  navbarOffsetPx = 88,
  cardHeight = "45vh",
  peekPx = 56,
  introEyebrow = "Solutions",
  introHeadline = "Industrialized technology for an evolving environment",
}: StackingCardsProps) {
  const lastCardIndex = Math.max(0, cards.length - 1);
  const lastCardTop = navbarOffsetPx + lastCardIndex * peekPx;
  const paddingBottom = `max(0px, calc(100vh - (${lastCardTop}px + ${cardHeight})))`;

  return (
    <section
      className="relative z-10 w-screen bg-bg text-fg"
      data-navbar-theme="dark"
      style={{ paddingBottom }}
    >
      <header
        className="grid grid-cols-1 border-b border-border/80 lg:grid-cols-2"
        style={{ paddingTop: `${navbarOffsetPx}px` }}
      >
        <div className="flex flex-col gap-12 border-t border-border/80 p-12 lg:gap-20 lg:border-b-0 lg:border-r">
          <div className="flex items-start justify-between gap-6">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] sm:text-sm">
              {introEyebrow}
            </span>
          </div>
          <h2 className="text-balance text-3xl font-bold leading-[1.04] tracking-[-0.02em] sm:text-4xl lg:text-5xl xl:text-[3.5rem]">
            {introHeadline}
          </h2>
        </div>
        <div className="hidden lg:block border-t border-border/80" aria-hidden="true" />
      </header>

      {cards.map((card, index) => (
        <StackedCard
          key={`${card.headline}-${index}`}
          card={card}
          index={index}
          navbarOffsetPx={navbarOffsetPx}
          cardHeight={cardHeight}
          peekPx={peekPx}
        />
      ))}
    </section>
  );
}
