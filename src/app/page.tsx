import Navbar from "@/components/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import ShrinkToReveal from "@/components/ShrinkToReveal";
import StackingCards, {
  type StackCardData,
} from "@/components/sections/StackingCards";
import ValueSection from "@/components/sections/ValueSection";
import ContactCTA from "@/components/sections/ContactCTA";
import VideoBand from "@/components/sections/VideoBand";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

const PROJECT_CARDS: StackCardData[] = projects.map((project) => ({
  eyebrow: project.eyebrow,
  headline: project.headline,
  body: project.body,
  imageSrc: project.imageUrl,
  imageAlt: project.headline,
  cta: project.ctaText,
  href: project.ctaLink,
}));

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ShrinkToReveal
        imageSrc="/wuttikan/___________________copykub.jpg"
        imageAlt="Wuttikan Studio"
      />
      <StackingCards
        cards={PROJECT_CARDS}
        introEyebrow="Selected Works"
        introHeadline="Projects built end-to-end, shipped and maintained"
      />
      <VideoBand />
      <ValueSection />
      <ContactCTA />
      <Footer />
    </>
  );
}
