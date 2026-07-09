import Image from "next/image";
import Link from "next/link";

export interface StackCardData {
  number?: string;
  eyebrow: string;
  headline: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
  cta?: string;
  role?: string;
  year?: string;
}

interface WorksSectionProps {
  cards: StackCardData[];
  navbarOffsetPx?: number;
  introEyebrow?: string;
  introHeadline?: string;
}

function ProjectCard({ card }: { card: StackCardData }) {
  return (
    <article className="group relative overflow-hidden border-t border-border/80 bg-bg text-fg">
      <Link
        href={card.href ?? "#"}
        aria-label={`Open ${card.headline}`}
        className="absolute inset-0 z-20"
      />

      <div className="rounded-none lg:hidden">
        <div className="p-0">
          <div className="relative aspect-video overflow-hidden">
            <div className="absolute inset-0 bg-fg/10 animate-pulse" />
            <Image
              src={card.imageSrc}
              alt={card.imageAlt}
              fill
              quality={100}
              sizes="100vw"
              className="relative z-10 object-cover object-center"
            />
          </div>
        </div>

        <div className="flex items-start justify-between gap-4 border-t border-border/80 p-5">
          <div>
            {card.number && (
              <span className="mb-2 block font-mono text-[10px] font-medium tracking-widest text-gray-500 uppercase">
                {card.number}
              </span>
            )}
            <h3 className="text-lg font-bold leading-tight tracking-tight text-black">
              {card.headline}
            </h3>
            <span className="mt-1 block text-sm text-gray-500">{card.eyebrow}</span>
          </div>
          <span aria-hidden="true" className="text-lg text-black">↗</span>
        </div>

        {(card.role || card.year) && (
          <div className="grid grid-cols-2 divide-x divide-border/80 border-t border-border/80">
            {card.role && (
              <div className="p-5">
                <span className="block font-mono text-[10px] tracking-widest text-gray-500 uppercase">
                  Role
                </span>
                <span className="mt-1 block text-sm font-bold text-black">{card.role}</span>
              </div>
            )}
            {card.year && (
              <div className="p-5">
                <span className="block font-mono text-[10px] tracking-widest text-gray-500 uppercase">
                  Year
                </span>
                <span className="mt-1 block text-sm font-bold text-black">{card.year}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="hidden grid-cols-[25%_50%_25%] px-12 lg:grid">

        <div className="relative">
          <div className="absolute inset-x-7 top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out group-hover:top-0 group-hover:translate-y-5">
            {card.number && (
              <span className="mb-3 block font-mono text-[10px] font-medium tracking-widest text-fg/30 uppercase">
                {card.number}
              </span>
            )}
            <h3 className="text-lg font-bold leading-tight tracking-tight text-fg">
              {card.headline}
            </h3>
          </div>
        </div>

        <div className="relative aspect-video overflow-hidden border-x border-border/80">
          <div className="absolute inset-0 bg-fg/10 animate-pulse" />
          <Image
            src={card.imageSrc}
            alt={card.imageAlt}
            fill
            quality={100}
            sizes="50vw"
            className="relative z-10 object-cover object-center scale-[1.15] group-hover:scale-100 transition-transform duration-700 ease-in-out"
          />
        </div>

        <div className="relative overflow-hidden">
          <span
            aria-hidden="true"
            className="absolute right-5 top-1/2 -translate-y-1/2 text-lg text-fg/50 transition-all duration-500 ease-in-out group-hover:top-0 group-hover:translate-y-4 group-hover:text-fg"
          >
            ↗
          </span>

          {(card.eyebrow || card.role || card.year) && (
            <div className="absolute inset-x-5 bottom-5 flex translate-y-[calc(100%+1.5rem)] flex-col items-end gap-3 text-right transition-transform duration-500 ease-in-out group-hover:translate-y-0">
              {card.eyebrow && (
                <div>
                  <span className="block font-mono text-[10px] tracking-widest text-fg/40 uppercase">
                    Type
                  </span>
                  <span className="text-sm font-semibold text-fg">{card.eyebrow}</span>
                </div>
              )}
              {card.role && (
                <div>
                  <span className="block font-mono text-[10px] tracking-widest text-fg/40 uppercase">
                    Role
                  </span>
                  <span className="text-sm font-semibold text-fg">{card.role}</span>
                </div>
              )}
              {card.year && (
                <div>
                  <span className="block font-mono text-[10px] tracking-widest text-fg/40 uppercase">
                    Year
                  </span>
                  <span className="text-sm font-semibold text-fg">{card.year}</span>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </article>
  );
}

export default function WorksSection({
  cards,
  navbarOffsetPx = 88,
  introEyebrow = "Solutions",
  introHeadline = "Industrialized technology for an evolving environment",
}: WorksSectionProps) {
  return (
    <section
      id="works"
      className="relative z-10 w-full bg-bg text-fg"
      data-navbar-theme="dark"
    >
      <header
        className="grid grid-cols-1 lg:grid-cols-2"
        style={{ paddingTop: `${navbarOffsetPx}px` }}
      >
        <div className="flex flex-col gap-12 border-t border-border/80 px-5 py-12 lg:p-12 lg:gap-20 lg:border-b-0 lg:border-r">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] sm:text-sm">
            {introEyebrow}
          </span>
          <h2 className="text-balance text-3xl font-bold leading-[1.04] tracking-[-0.02em] sm:text-4xl lg:text-5xl xl:text-[3.5rem]">
            {introHeadline}
          </h2>
        </div>
        <div className="hidden lg:block border-t border-border/80" aria-hidden="true" />
      </header>

      {cards.map((card, index) => (
        <ProjectCard key={`${card.headline}-${index}`} card={card} />
      ))}

      <div className="border-t border-border/80 h-24" aria-hidden="true" />
    </section>
  );
}
