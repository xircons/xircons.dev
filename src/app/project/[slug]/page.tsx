import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects, type ProjectData } from "@/data/projects";
import Link from "next/link";
import Image from "next/image";
import ActionButton from "@/components/ActionButton";
import ProjectCover from "@/components/ProjectCover";
import ProjectMeta from "@/components/ProjectMeta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_URL, baseOpenGraph } from "@/lib/site";
import { breadcrumbSchema, creativeWorkSchema, softwareApplicationSchema } from "@/lib/structured-data";

// The segment's opengraph-image.tsx supplies the image.
const projectOpenGraph = Object.fromEntries(
  Object.entries(baseOpenGraph).filter(([key]) => key !== "images"),
);

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const title = `${project.headline}: ${project.descriptor}`;
  const description = project.metaDescription ?? project.body;
  return {
    title,
    description,
    alternates: {
      canonical: `https://xircons.dev/project/${slug}`,
    },
    openGraph: {
      ...projectOpenGraph,
      title: `${title} | Xircons`,
      description,
      url: `https://xircons.dev/project/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Xircons`,
      description,
    },
  };
}

// Reads width and height from the PNG or WebP header; other formats count as landscape.
function isPortrait(file: string) {
  const head = Buffer.alloc(30);
  const fd = fs.openSync(file, "r");
  fs.readSync(fd, head, 0, 30, 0);
  fs.closeSync(fd);
  const size = (w: number, h: number) => h > w;
  switch (head.toString("ascii", 12, 16)) {
    case "IHDR":
      return size(head.readUInt32BE(16), head.readUInt32BE(20));
    case "VP8X":
      return size(head.readUIntLE(24, 3), head.readUIntLE(27, 3));
    case "VP8 ":
      return size(head.readUInt16LE(26) & 0x3fff, head.readUInt16LE(28) & 0x3fff);
    case "VP8L": {
      const bits = head.readUInt32LE(21);
      return size(bits & 0x3fff, (bits >> 14) & 0x3fff);
    }
    default:
      return false;
  }
}

// Consecutive portrait (phone) shots are grouped so they sit side by side instead of each filling the column.
function getGallery(project: ProjectData): string[][] {
  const rel = path.dirname(project.imageUrl);
  const dir = path.join(process.cwd(), "public", rel);
  try {
    const files = fs.readdirSync(dir);
    return files
      .filter(
        (file) =>
          /\.(png|jpe?g|webp|avif)$/i.test(file) &&
          !file.includes(" ") &&
          // A PNG with a WebP copy beside it is skipped, so each screenshot shows once.
          !(file.endsWith(".png") && files.includes(file.replace(/\.png$/, ".webp")))
      )
      // The hero image leads the gallery, then the numbered screenshots.
      .sort((a, b) => Number(b.startsWith("hero.")) - Number(a.startsWith("hero.")) || a.localeCompare(b, undefined, { numeric: true }))
      .reduce<string[][]>((groups, file) => {
        const src = `${rel}/${file}`;
        const last = groups.at(-1);
        if (!isPortrait(path.join(dir, file))) groups.push([src]);
        else if (last && isPortrait(path.join(dir, path.basename(last[0])))) last.push(src);
        else groups.push([src]);
        return groups;
      }, []);
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

  const ordered = [...projects].sort((a, b) => Number(a.id) - Number(b.id));
  const currentIndex = ordered.findIndex((p) => p.slug === project.slug);
  const nextIndex = (currentIndex + 1) % ordered.length;
  const nextProject = ordered[nextIndex];
  const [nextRole, nextYear] = nextProject.eyebrow.split("•").map((part) => part.trim());

  const number = `P${String(project.id).padStart(3, "0")}`;
  const [role, year] = project.eyebrow.split("•").map((part) => part.trim());
  const gallery = getGallery(project);
  const shots = gallery.flat();
  const shotAlt = (src: string) => `${project.headline} screenshot ${shots.indexOf(src) + 1}`;
  const paragraphs = project.caseStudy ?? [project.body];

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "https://xircons.dev/" },
    { name: project.headline, url: `https://xircons.dev/project/${slug}` },
  ]);

  const schemaImageUrl = project.imageUrl.endsWith("placeholder.svg")
    ? `${SITE_URL}/project/${slug}/opengraph-image`
    : `${SITE_URL}${project.imageUrl}`;

  const projectSchema = project.headline === "Zero-mock" 
    ? softwareApplicationSchema({
        name: project.headline,
        url: project.ctaLink ?? `https://xircons.dev/project/${slug}`,
        imageUrl: schemaImageUrl,
        description: project.body,
      })
    : creativeWorkSchema({
        name: project.headline,
        url: `https://xircons.dev/project/${slug}`,
        imageUrl: schemaImageUrl,
        description: project.body,
      });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [breadcrumb, projectSchema],
  };

  return (
    <main className="relative w-full bg-bg text-fg" data-navbar-theme="dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <div className="flex items-center justify-between border-b border-border/80 px-5 pt-24 pb-5 lg:px-10 lg:pt-28">
        <Link
          href="/#works"
          className="group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted transition-colors hover:text-fg"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-1" aria-hidden="true">
            <path d="M6 13L1 7l5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to works
        </Link>
        <span className="font-mono text-sm font-medium tracking-tight text-accent">{number} /</span>
      </div>

      <section className="border-b border-border/80 px-5 py-12 lg:px-10 lg:py-20">
        <h1 className="max-w-5xl text-balance text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[0.92] tracking-[-0.03em] text-fg">
          {project.headline}
        </h1>
      </section>

      <section className="grid grid-cols-2 border-b border-border/80 lg:grid-cols-4">
        {[
          { label: "Role", value: role },
          { label: "Year", value: year },
          { label: "Index", value: number },
        ].map((item, i) => (
          <div
            key={item.label}
            className={`flex flex-col gap-2 border-border/80 px-5 py-6 lg:px-10 lg:py-8 ${
              i === 0 || i === 2 ? "border-r" : i === 1 ? "lg:border-r" : ""
            } ${i < 2 ? "border-b lg:border-b-0" : ""}`}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{item.label}</span>
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
          {gallery.length === 0 ? (
            <>
              <aside className="relative z-20 w-full min-w-0 self-start md:sticky md:top-28 md:w-[34%] md:shrink-0">
                <h2 className="font-mono text-xs font-normal uppercase tracking-[0.1em] text-muted">Overview</h2>
              </aside>
              <div className="flex w-full min-w-0 max-w-[68ch] flex-col gap-6 md:w-[61%] md:shrink-0">
                {paragraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "text-xl leading-[1.45] text-fg md:text-[clamp(1.25rem,1.6vw,1.5rem)]"
                        : "text-base leading-[1.7] text-[#4A4A4A] md:text-lg"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </>
          ) : (
            <>
              <aside className="relative z-20 w-full min-w-0 self-start text-left md:sticky md:top-28 md:w-[34%] md:shrink-0">
                <div className="flex flex-col gap-6">
                  <h2 className="font-mono text-xs font-normal uppercase tracking-[0.1em] text-muted">
                    Overview
                  </h2>
                  {paragraphs.map((paragraph, i) => (
                    <p key={i} className="text-sm leading-relaxed text-fg/70 sm:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </aside>

              <div className="relative z-0 flex w-full min-w-0 flex-col gap-5 md:w-[61%] md:shrink-0">
                {gallery.map((group) =>
                  group.length === 1 ? (
                    <div key={group[0]} className="relative w-full shrink-0 overflow-hidden border border-border/80">
                      <div className="absolute inset-0 bg-fg/10 animate-pulse" />
                      <Image src={group[0]} alt={shotAlt(group[0])} width={1920} height={1080} className="relative z-10 block h-auto w-full" />
                    </div>
                  ) : (
                    <div key={group[0]} className="grid grid-cols-2 gap-5 sm:grid-cols-3">
                      {group.map((src) => (
                        <div key={src} className="relative overflow-hidden border border-border/80">
                          <div className="absolute inset-0 bg-fg/10 animate-pulse" />
                          <Image src={src} alt={shotAlt(src)} width={860} height={1860} sizes="(min-width: 768px) 20vw, 50vw" className="relative z-10 block h-auto w-full" />
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="bg-bg text-fg">
        <div className="flex items-center justify-between border-t border-border px-5 py-7 lg:px-12">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">Next project</span>
          <span className="font-mono text-[13px] text-muted">
            <span className="text-fg">{String(nextIndex + 1).padStart(2, "0")}</span> / {projects.length} projects
          </span>
        </div>

        <Link
          href={`/project/${nextProject.slug}`}
          aria-label={`Next project: ${nextProject.headline}`}
          className="group flex flex-col gap-5 border-y border-border px-5 py-6 lg:grid lg:grid-cols-[7fr_5fr] lg:gap-0 lg:px-12 lg:py-0"
        >
          <div className="lg:flex lg:items-center lg:border-r lg:border-border lg:py-10 lg:pr-10">
            <ProjectCover
              name={nextProject.headline}
              imageSrc={nextProject.imageUrl}
              images={nextProject.cardImages}
              isPrivate={nextProject.isPrivate}
              alt={nextProject.headline}
              sizes="(min-width: 1024px) 58vw, 100vw"
              hoverScale="motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-visible:scale-[1.03]"
            />
          </div>

          <div className="flex flex-col gap-5 lg:justify-between lg:gap-8 lg:py-10 lg:pl-12">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[11px] text-muted lg:text-xs">P{String(nextProject.id).padStart(3, "0")}</span>
              <h2 className="text-[32px] font-bold leading-[1.02] tracking-[-0.025em] lg:text-[56px]">{nextProject.headline}</h2>
              <p className="max-w-[440px] text-[15px] leading-[1.55] text-[#4A4A4A] lg:text-[17px]">{nextProject.body}</p>
            </div>

            <div className="flex flex-col gap-5">
              <ProjectMeta type={nextProject.category} role={nextRole} year={nextYear} />
              <span className="flex min-h-[52px] items-center justify-between border border-fg px-5 text-[15px] font-semibold transition-colors duration-300 ease-out group-hover:bg-fg group-hover:text-white group-focus-visible:bg-fg group-focus-visible:text-white lg:min-h-14">
                Next project
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  className="transition-transform duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:translate-x-1.5 motion-safe:group-focus-visible:translate-x-1.5"
                >
                  <path d="M1 6h14M10 1l5 5-5 5" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
