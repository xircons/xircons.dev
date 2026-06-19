import Navbar from "@/components/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import ShrinkToReveal from "@/components/ShrinkToReveal";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ShrinkToReveal
        imageSrc="/wuttikan/wuttikan_studio_1.png"
        imageAlt="Wuttikan Studio"
      />
    </>
  );
}
