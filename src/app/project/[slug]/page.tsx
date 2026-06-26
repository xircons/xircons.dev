import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects, type ProjectData } from "@/data/projects";
import Link from "next/link";
import ActionButton from "@/components/ActionButton";
import Navbar from "@/components/Navbar";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.headline.toLowerCase().replace(/\s+/g, "-"),
  }));
}

function getGallery(project: ProjectData): string[] {
  const rel = path.dirname(project.imageUrl);
  const dir = path.join(process.cwd(), "public", rel);
  try {
    return fs
      .readdirSync(dir)
      .filter(
        (file) =>
          /\.(png|jpe?g|webp|avif)$/i.test(file) &&
          file !== "hero.png" &&
          !file.includes(" ")
      )
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => `${rel}/${file}`);
  } catch {
    return [];
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const number = `P${String(project.id).padStart(3, "0")} /`;
  const [role, year] = project.eyebrow.split("•").map((part) => part.trim());
  const gallery = getGallery(project);

  return (
    <main className="relative w-full bg-bg text-fg" data-navbar-theme="dark">
      <Navbar />

      <header className="flex items-center justify-between border-b border-border/80 px-5 pt-24 pb-6 lg:px-10 lg:pt-28">
        <Link
          href="/#works"
          className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-fg/50 transition-colors hover:text-fg"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:-translate-x-1" aria-hidden="true">
            <path d="M7 12L3 8L7 4M13 8H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to works
        </Link>
        <span className="font-mono text-sm font-medium tracking-tight text-accent">{number}</span>
      </header>

      <section className="relative z-0 px-5 py-12 lg:px-10 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-10 md:flex-row md:items-start md:gap-x-[5%]">
          <aside className="relative z-20 w-full min-w-0 self-start text-left md:sticky md:top-28 md:w-[35%] md:shrink-0">
            <div className="flex flex-col gap-8">
              <h1 className="text-balance text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1] tracking-[-0.03em] text-fg">
                {project.headline}
              </h1>

              <div className="flex max-w-md flex-col gap-5">
                {(project.caseStudy ?? [project.body]).map((paragraph, i) => (
                  <p key={i} className="text-base leading-relaxed text-fg/70">
                    {paragraph}
                  </p>
                ))}
              </div>

              {project.ctaLink ? (
                <ActionButton href={project.ctaLink} label={project.ctaText ?? "View project"} />
              ) : (
                <span className="text-sm font-medium text-fg/50">{project.ctaText ?? "Private"}</span>
              )}

              <dl className="grid grid-cols-2 border-t border-border/80 pt-6">
                <div className="flex flex-col gap-1">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg/50">Role</dt>
                  <dd className="text-sm font-medium text-fg">{role ?? "—"}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg/50">Year</dt>
                  <dd className="text-sm font-medium text-fg">{year ?? "—"}</dd>
                </div>
              </dl>
            </div>
          </aside>

          <div className="relative z-0 flex w-full min-w-0 flex-col gap-5 md:w-[60%] md:shrink-0">
            {gallery.map((src) => (
              <div key={src} className="relative w-full shrink-0 overflow-hidden border border-border/80">
                <img src={src} alt="" loading="lazy" className="block h-auto w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
