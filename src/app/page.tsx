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

const SERVICES: StackCardData[] = [
  {
    eyebrow: "Product Engineering",
    headline: "From concept to production code",
    body: "We turn early sketches into shippable products. Type-safe codebases, modern frameworks, and a build pipeline that holds up long after launch.",
    imageSrc: "/wuttikan/wuttikan_studio_1.png",
    imageAlt: "Product engineering at Xircons",
    cta: "See our work",
  },
  {
    eyebrow: "Interface Design",
    headline: "Interfaces with a point of view",
    body: "Grid-driven layouts, restrained typography, and motion that earns its place. Every screen built around clarity instead of decoration.",
    imageSrc: "/logo/xircons-full-bg.jpg",
    imageAlt: "Interface design system",
    cta: "View design system",
  },
  {
    eyebrow: "AI Integration",
    headline: "Intelligence woven into the product",
    body: "We embed the latest Claude models where they create real leverage, with prompt caching, tool use, and evaluation pipelines that keep quality measurable.",
    imageSrc: "/logo/xircons-x-bg.jpg",
    imageAlt: "AI integration",
    cta: "Explore capabilities",
  },
  {
    eyebrow: "Brand & Identity",
    headline: "A system, not just a logo",
    body: "Marks, motion, and a living component library that scales from a landing page to a full platform without losing its voice.",
    imageSrc: "/textures/sliver.jpg",
    imageAlt: "Brand and identity",
    cta: "Start a project",
  },
  {
    eyebrow: "Cloud & Devops",
    headline: "Built to scale, not to break",
    body: "Zero-downtime migrations, infrastructure as code, and edge delivery setups that handle traffic spikes without breaking a sweat.",
    imageSrc: "/wuttikan/wuttikan_studio_1.png",
    imageAlt: "Cloud infrastructure and devops",
    cta: "See cloud architecture",
  },
  {
    eyebrow: "Web Performance",
    headline: "Every millisecond counts",
    body: "We profile, debug, and optimize rendering loops, bundlers, and database queries. A faster site means higher conversion and better search visibility.",
    imageSrc: "/logo/xircons-full-bg.jpg",
    imageAlt: "Web performance optimization",
    cta: "Request an audit",
  },
  {
    eyebrow: "Technical Strategy",
    headline: "Decisions that stand the test of time",
    body: "We help teams choose the right stack, establish coding standards, and plan migrations that minimize business risk.",
    imageSrc: "/logo/xircons-x-bg.jpg",
    imageAlt: "Technical strategy consulting",
    cta: "Consult our team",
  },
  {
    eyebrow: "Mobile Development",
    headline: "Native feel, unified codebases",
    body: "We build responsive, fast mobile applications using cross-platform frameworks without compromising on performance or native integrations.",
    imageSrc: "/textures/sliver.jpg",
    imageAlt: "Mobile development",
    cta: "View mobile apps",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ShrinkToReveal
        imageSrc="/wuttikan/wuttikan_studio_1.png"
        imageAlt="Wuttikan Studio"
      />
      <StackingCards cards={SERVICES} />
      <VideoBand />
      <ValueSection />
      <ContactCTA />
      <Footer />
    </>
  );
}
