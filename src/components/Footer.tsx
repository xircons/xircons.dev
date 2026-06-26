import Link from "next/link";
import LogoReveal from "@/components/LogoReveal";

const NAV = [
  { label: "About", href: "/#about" },
  { label: "Works", href: "/#works" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/contact" },
];

const CONNECT = [
  { label: "GitHub", href: "https://github.com/pppwtk" },
  { label: "LinkedIn", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "Dribbble", href: "#" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#1A1A1A] text-[#E0E6ED]">

      <div className="grid grid-cols-1 border-y border-border/20 sm:grid-cols-3">
        {[
          { code: "01 /", title: "Navigate", links: NAV },
          { code: "02 /", title: "Connect", links: CONNECT },
          { code: "03 /", title: "Legal", links: LEGAL },
        ].map((col, i) => (
          <div
            key={col.code}
            className={`flex flex-col gap-6 px-8 py-12 lg:px-16 lg:py-16 xl:px-20 ${i < 2 ? "border-b border-border/20 sm:border-b-0 sm:border-r" : ""
              }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#E0E6ED]/30">
                {col.code}
              </span>
              <span className="h-1.5 w-1.5 bg-[#E8A359]" aria-hidden="true" />
            </div>
            <nav className="flex flex-col gap-3">
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-base text-[#E0E6ED]/70 transition-colors duration-150 hover:text-[#E0E6ED]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      <LogoReveal className="h-[40vh] w-full" />

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/20 px-8 py-5 lg:px-16 xl:px-20">
        <span className="text-[11px] uppercase tracking-widest text-[#E0E6ED]/30">
          ©{year} Xircons
        </span>
      </div>

    </footer>
  );
}
