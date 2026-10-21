import Navbar from "@/components/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import ShrinkToReveal from "@/components/ShrinkToReveal";
import WorksSection, {
  type StackCardData,
} from "@/components/sections/WorksSection";
import ValueSection from "@/components/sections/ValueSection";
import ContactCTA from "@/components/sections/ContactCTA";
import VideoBand from "@/components/sections/VideoBand";
import Footer from "@/components/Footer";
import HashScroller from "@/components/HashScroller";
import { projects } from "@/data/projects";
import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Wuttikan Suksan (Xircons): Full-stack Developer in Chiang Mai" },
  description: "Portfolio of Xircons, a full-stack developer in Chiang Mai building systems for government agencies and universities.",
  alternates: { canonical: "https://xircons.dev/" },
  openGraph: {
    ...baseOpenGraph,
    title: "Wuttikan Suksan (Xircons): Full-stack Developer in Chiang Mai",
    description: "Portfolio of Xircons, a full-stack developer in Chiang Mai building systems for government agencies and universities.",
    url: "/",
  },
};

const PROJECT_CARDS: StackCardData[] = [...projects]
  .sort((a, b) => Number(a.id) - Number(b.id))
  .map((project) => {
    const [role, year] = project.eyebrow.split("•").map((s) => s.trim());
    return {
      slug: project.slug,
      number: `P${String(project.id).padStart(3, "0")}`,
      eyebrow: project.category,
      headline: project.headline,
      body: project.body,
      imageSrc: project.imageUrl,
      images: project.cardImages,
      isPrivate: project.isPrivate,
      imageAlt: project.headline,
      href: `/project/${project.slug}`,
      role,
      year,
    };
  });

export default function Home() {
  return (
    <>
      <HashScroller />
      <Navbar />
      <HeroSection />
      <ShrinkToReveal
        imageSrc="/wuttikan/wuttikan-suksan.jpg"
        imageAlt="Wuttikan Suksan"
      />
      <WorksSection
        cards={PROJECT_CARDS}
        introEyebrow="Selected projects"
        introHeadline="Systems built for government agencies, universities and student clubs."
      />
      <VideoBand />
      <ValueSection />
      <ContactCTA />
      <Footer />
    </>
  );
}
