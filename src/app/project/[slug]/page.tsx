import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects, type ProjectData } from "@/data/projects";
import Link from "next/link";
import ActionButton from "@/components/ActionButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.headline.toLowerCase().replace(/\s+/g, "-"),
  }));
}

function slugify(headline: string) {
  return headline.toLowerCase().replace(/\s+/g, "-");
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

const getCategory = (id: string | number) => {
  const map: Record<string, string> = {
    1: "Production",
    2: "Competition",
    3: "Academic",
    4: "Production",
    5: "Personal",
    6: "Academic",
    7: "Personal",
  };
  return map[String(id)] || "Project";
};


export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const ordered = [...projects].sort((a, b) => Number(a.id) - Number(b.id));
  const currentIndex = ordered.findIndex((p) => p.id === project.id);
  const nextProject = ordered[(currentIndex + 1) % ordered.length];

  const number = `P${String(project.id).padStart(3, "0")}`;
  const [role, year] = project.eyebrow.split("•").map((part) => part.trim());
  const gallery = getGallery(project);
  const paragraphs = project.caseStudy ?? [project.body];

  return (
    <main className="relative w-full bg-bg text-fg" data-navbar-theme="dark">
      <Navbar />

      <div className="flex items-center justify-between border-b border-border/80 px-5 pt-24 pb-5 lg:px-10 lg:pt-28">
        <a
          href="/#works"
          className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-fg/50 transition-colors hover:text-fg"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:-translate-x-1" aria-hidden="true">
            <path d="M7 12L3 8L7 4M13 8H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to works
        </a>
        <span className="font-mono text-sm font-medium tracking-tight text-accent">{number} /</span>
      </div>

      <section className="border-b border-border/80 px-5 py-12 lg:px-10 lg:py-20">
        <h1 className="max-w-5xl text-balance text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[0.92] tracking-[-0.03em] text-fg">
          {project.headline}
        </h1>
      </section>

      <section className="grid grid-cols-2 border-b border-border/80 lg:grid-cols-4">
        {[
          { label: "Role", value: role ?? "—" },
          { label: "Year", value: year ?? "—" },
          { label: "Index", value: number },
        ].map((item, i) => (
          <div
            key={item.label}
            className={`flex flex-col gap-2 border-border/80 px-5 py-6 lg:px-10 lg:py-8 ${
              i === 0 || i === 2 ? "border-r" : i === 1 ? "lg:border-r" : ""
            } ${i < 2 ? "border-b lg:border-b-0" : ""}`}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg/50">{item.label}</span>
            <span className="text-sm font-medium text-fg lg:text-base">{item.value}</span>
          </div>
        ))}
        <div className="flex items-center px-5 py-6 lg:px-10 lg:py-8">
          {project.ctaLink ? (
            <ActionButton href={project.ctaLink} label={project.ctaText ?? "View project"} fullWidth />
          ) : (
            <span className="text-sm font-medium text-fg/50">{project.ctaText ?? "Private"}</span>
          )}
        </div>
      </section>

      <section className="relative z-0 px-5 py-12 lg:px-10 lg:py-20">
        <div className="flex w-full flex-col gap-10 md:flex-row md:items-start md:gap-x-[5%]">
          <aside className="relative z-20 w-full min-w-0 self-start text-left md:sticky md:top-28 md:w-[34%] md:shrink-0">
            <div className="flex flex-col gap-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-fg/50">
                Overview
              </span>
              {paragraphs.map((paragraph, i) => (
                <p key={i} className="text-sm leading-relaxed text-fg/70 sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </aside>

          <div className="relative z-0 flex w-full min-w-0 flex-col gap-5 md:w-[61%] md:shrink-0">
            {gallery.map((src) => (
              <div key={src} className="relative w-full shrink-0 overflow-hidden border border-border/80">
                <img src={src} alt="" loading="lazy" className="block h-auto w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border/80 bg-bg text-fg">
        <div className="flex items-center justify-between px-5 py-6 lg:px-10 lg:py-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-fg/50">
            Next project
          </span>
          <span className="font-mono text-sm font-medium tracking-tight text-accent">
            P{String(nextProject.id).padStart(3, "0")} /
          </span>
        </div>

        <Link
          href={`/project/${slugify(nextProject.headline)}`}
          className="group grid cursor-pointer grid-cols-1 border-t border-border/80 md:grid-cols-2"
        >
          <div className="border-b border-border/80 p-5 md:border-b-0 md:border-r lg:p-10">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                src={nextProject.imageUrl}
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-12 p-5 lg:p-10">
            <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.02em]">
              {nextProject.headline}
            </h2>

            <div className="flex items-end justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-fg/50">
                    Type
                  </span>
                  <span className="text-sm font-medium lg:text-base">{getCategory(nextProject.id)}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-fg/50">
                    Role
                  </span>
                  <span className="text-sm font-medium lg:text-base">
                    {nextProject.eyebrow.split("•")[0].trim()}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-fg/50">
                    Year
                  </span>
                  <span className="text-sm font-medium lg:text-base">
                    {nextProject.eyebrow.split("•")[1]?.trim() ?? "—"}
                  </span>
                </div>
              </div>

              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden border border-border/80 text-fg transition-colors duration-500 ease-out group-hover:border-accent group-hover:text-accent">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className="absolute transition-transform duration-500 ease-out group-hover:translate-x-[250%]">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className="absolute -translate-x-[250%] transition-transform duration-500 ease-out group-hover:translate-x-0">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <Footer />
    </main>
  );
}
