import Image from "next/image";
import ActionButton from "@/components/ActionButton";

export interface StackCardData {
  number?: string;
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
  mobileCardHeight?: string;
  mobilePeekPx?: number;
  introEyebrow?: string;
  introHeadline?: string;
}

function StackedCard({
  card,
  index,
  navbarOffsetPx,
  cardHeight,
  peekPx,
  mobileCardHeight,
  mobilePeekPx,
}: {
  card: StackCardData;
  index: number;
  navbarOffsetPx: number;
  cardHeight: string;
  peekPx: number;
  mobileCardHeight: string;
  mobilePeekPx: number;
}) {
  const number = card.number ?? `${String(index + 1).padStart(2, "0")} /`;
  const top = navbarOffsetPx + index * peekPx;
  const topMobile = navbarOffsetPx + index * mobilePeekPx;

  return (
    <article
      className={`sticky overflow-hidden border-t border-border/80 bg-bg text-fg [top:var(--card-top-m)] h-auto lg:[top:var(--card-top)] lg:[height:var(--card-h)] ${index > 0 ? "shadow-[0_-5px_12.5px_rgba(0,0,0,0.015)]" : ""
        }`}
      style={{
        "--card-top-m": `${topMobile}px`,
        "--card-h-m": mobileCardHeight,
        "--card-top": `${top}px`,
        "--card-h": cardHeight,
        zIndex: index + 1,
      } as React.CSSProperties}
    >
      <div className="flex h-full flex-col lg:grid lg:grid-cols-[8%_48%_44%]">
        <div className="hidden items-start justify-center border-r border-border/80 pt-5 font-mono text-sm font-medium tracking-tight text-accent lg:flex">
          {number}
        </div>

        <div className="order-2 relative aspect-video w-full shrink-0 overflow-hidden p-6 pt-0 lg:order-none lg:aspect-auto lg:h-full lg:shrink lg:border-r lg:border-border/80 lg:p-6">
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={card.imageSrc}
              alt={card.imageAlt}
              fill
              quality={100}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="contents lg:flex lg:min-h-0 lg:flex-col">
          <div className="order-1 flex items-center gap-4 px-6 py-5 lg:order-none lg:px-12">
            <span className="font-mono text-sm font-medium tracking-tight text-accent lg:hidden">
              {number}
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.1em] sm:text-sm lg:text-base">
              {card.eyebrow}
            </span>
          </div>

          <div className="order-3 flex min-h-0 flex-1 flex-col justify-start gap-6 overflow-hidden px-6 pb-8 lg:order-none lg:justify-between lg:gap-8 lg:px-12 lg:pb-20 lg:pt-6">
            <h3 className="text-balance text-2xl font-bold leading-[1.04] tracking-[-0.02em] sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
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
  mobileCardHeight = "82vh",
  mobilePeekPx = 48,
  introEyebrow = "Solutions",
  introHeadline = "Industrialized technology for an evolving environment",
}: StackingCardsProps) {
  const lastCardIndex = Math.max(0, cards.length - 1);
  const lastCardTop = navbarOffsetPx + lastCardIndex * peekPx;
  const lastCardTopMobile = navbarOffsetPx + lastCardIndex * mobilePeekPx;
  const paddingBottom = `max(0px, calc(100vh - (${lastCardTop}px + ${cardHeight})))`;
  const paddingBottomMobile = `max(0px, calc(100vh - (${lastCardTopMobile}px + 82vh)))`;

  return (
    <section
      id="works"
      className="relative z-10 w-full bg-bg text-fg [padding-bottom:var(--stack-pad-b-m)] lg:[padding-bottom:var(--stack-pad-b)]"
      data-navbar-theme="dark"
      style={{
        "--stack-pad-b-m": paddingBottomMobile,
        "--stack-pad-b": paddingBottom,
      } as React.CSSProperties}
    >
      <header
        className="grid grid-cols-1 lg:grid-cols-2"
        style={{ paddingTop: `${navbarOffsetPx}px` }}
      >
        <div className="flex flex-col gap-12 border-t border-border/80 px-5 py-12 lg:p-12 lg:gap-20 lg:border-b-0 lg:border-r">
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
          mobileCardHeight={mobileCardHeight}
          mobilePeekPx={mobilePeekPx}
        />
      ))}
    </section>
  );
}
