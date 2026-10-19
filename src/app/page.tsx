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

export const metadata: Metadata = {
  title: { absolute: "Xircons | Engineering & Design" },
  description: "Portfolio of Xircons, a full-stack developer building web apps, business platforms, and developer tools.",
  openGraph: {
    title: "Xircons | Engineering & Design",
    description: "Portfolio of Xircons, a full-stack developer building web apps, business platforms, and developer tools.",
    url: "/",
  },
};

const PROJECT_CARDS: StackCardData[] = [...projects]
  .sort((a, b) => Number(a.id) - Number(b.id))
  .map((project) => {
    const [role, year] = project.eyebrow.split("•").map((s) => s.trim());
    return {
      number: `P${String(project.id).padStart(3, "0")} /`,
      eyebrow: project.category,
      headline: project.headline,
      body: project.body,
      imageSrc: project.imageUrl,
      imageAlt: project.headline,
      cta: "View Project",
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
        imageSrc="/wuttikan/___________________copykub.jpg"
        imageAlt="Xircons studio"
      />
      <WorksSection
        cards={PROJECT_CARDS}
        introEyebrow="Selected Projects"
        introHeadline="Web applications, business platforms, and developer tools."
      />
      <VideoBand />
      <ValueSection />
      <ContactCTA />
      <Footer />
    </>
  );
}
