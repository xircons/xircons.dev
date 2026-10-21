import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main
      className="relative flex min-h-screen w-full flex-col bg-bg text-fg"
      data-navbar-theme="light"
    >
      <Navbar />

      <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 py-32 sm:px-10 lg:py-48">
        <h1 className="mb-10 text-[clamp(3rem,9vw,7rem)] font-bold leading-[0.92] tracking-[-0.04em]">
          Page not found
        </h1>
        <p className="mb-10 max-w-[28rem] text-xl font-medium leading-[1.15] tracking-[-0.02em]">
          That page does not exist or has moved.
        </p>
        <div className="flex gap-8 text-lg font-medium underline underline-offset-4">
          <Link href="/">Home</Link>
          <Link href="/#works">Selected work</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
