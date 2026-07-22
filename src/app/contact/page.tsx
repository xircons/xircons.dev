import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch to start a project with Xircons.",
  openGraph: {
    title: "Contact — Xircons",
    description: "Get in touch to start a project with Xircons.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main
      className="relative min-h-screen w-full bg-bg text-fg"
      data-navbar-theme="light"
    >
      <Navbar />

      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
        <section className="flex flex-col border-b border-border/60 lg:border-b-0 lg:border-r">
          <div className="flex flex-col border-b border-border/80 px-6 pb-12 pt-28 sm:px-10 sm:pt-32 lg:px-16 lg:pb-24 lg:pt-40 xl:px-24">
            <h1 className="mb-10 text-[clamp(4rem,11vw,9rem)] font-bold leading-[0.92] tracking-[-0.04em] text-fg">
              Contact
            </h1>
            <p className="max-w-[28rem] text-xl font-medium leading-[1.15] tracking-[-0.02em] sm:text-2xl lg:text-[2rem]">
              Tell us about your case and we will guide you with the right approach.
            </p>
          </div>
          <div aria-hidden="true" className="flex-1 px-6 py-12 sm:px-10 lg:px-16 lg:py-24 xl:px-24" />
        </section>

        <section className="flex flex-col justify-center px-6 pb-24 pt-12 sm:px-10 sm:pt-16 lg:px-16 lg:pb-24 lg:pt-40 xl:px-24">
          <ContactForm />
        </section>
      </div>
      <Footer />
    </main>
  );
}
