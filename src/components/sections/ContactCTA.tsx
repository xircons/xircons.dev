import ActionButton from "@/components/ActionButton";

export default function ContactCTA() {
  return (
    <section className="w-full bg-[#1A1A1A] text-[#E0E6ED]">

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2">
        <div className="px-8 py-12 lg:col-start-1 lg:row-start-1 lg:border-r lg:border-b lg:border-border/20 lg:px-16 lg:py-16">
          <span className="mb-8 block text-xs font-medium uppercase tracking-[0.2em] text-[#E0E6ED]/40">
            Contact
          </span>
          <p className="max-w-sm text-base leading-relaxed text-[#E0E6ED]/60 sm:text-lg">
            Tell us about your project and we will advise you on the fit, scope, and options — as well as how to integrate the right technology into your timeline and objectives.
          </p>
        </div>

        <div className="flex flex-col justify-end px-8 py-12 lg:col-span-2 lg:col-start-2 lg:row-start-2 lg:px-16 lg:py-16 border-y border-l border-border/20">
          <h2 className="mb-8 max-w-4xl text-[clamp(2rem,5vw,4rem)] font-bold leading-[1] tracking-tight text-[#E0E6ED]">
            Build something that actually ships.
          </h2>

          <ActionButton href="/contact" label="Contact" tone="dark" />
        </div>
      </div>

    </section>
  );
}
