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

const getCategory = (id: string | number) => {
  const map: Record<string, string> = {
    1: "Production",
    2: "Competition",
    3: "Personal",
    4: "Academic",
    5: "Production",
    6: "Personal",
    7: "Academic",
    8: "Personal",
  };
  return map[String(id)] || "Project";
};

const PROJECT_CARDS: StackCardData[] = [...projects]
  .sort((a, b) => Number(a.id) - Number(b.id))
  .map((project) => {
    const [role, year] = project.eyebrow.split("•").map((s) => s.trim());
    return {
      number: `P${String(project.id).padStart(3, "0")} /`,
      eyebrow: getCategory(project.id),
      headline: project.headline,
      body: project.body,
      imageSrc: project.imageUrl,
      imageAlt: project.headline,
      cta: "View Project",
      href: `/project/${project.headline.toLowerCase().replace(/\s+/g, "-")}`,
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
        imageAlt="Wuttikan Studio"
      />
      <WorksSection
        cards={PROJECT_CARDS}
        introEyebrow="Selected Projects"
        introHeadline="Production-ready web applications, business platforms, and developer tools."
      />
      <VideoBand />
      <ValueSection />
      <ContactCTA />
      <Footer />
    </>
  );
}
