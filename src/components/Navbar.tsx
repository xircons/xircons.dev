"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/data/projects";

const WORK_LINKS = [...projects]
  .sort((a, b) => Number(a.id) - Number(b.id))
  .map((project) => ({
    id: project.id,
    label: project.headline,
    slug: project.headline.toLowerCase().replace(/\s+/g, "-"),
  }));

function MenuToggleIcon({ open, className = "" }: { open: boolean; className?: string }) {
  return (
    <span className={`block h-5 w-5 ${className}`} aria-hidden="true">
      <span
        className={`absolute left-1/2 top-1/2 h-0.5 w-4 rounded-full bg-current transition-transform duration-300 ease-out ${open ? "-translate-x-1/2 -translate-y-1/2 rotate-45" : "-translate-x-1/2 -translate-y-[5px]"}`}
      />
      <span
        className={`absolute left-1/2 top-1/2 h-0.5 w-4 rounded-full bg-current transition-transform duration-300 ease-out ${open ? "-translate-x-1/2 -translate-y-1/2 -rotate-45" : "-translate-x-1/2 translate-y-[3px]"}`}
      />
    </span>
  );
}

const NAV = [
  { code: "01", label: "About", href: "/#about" },
  { code: "02", label: "Works", href: "/#works" },
  { code: "03", label: "Skills", href: "/#skills" },
];

const CONNECT = [
  { label: "GitHub", href: "https://github.com/xircons" },
  { label: "Facebook", href: "https://www.facebook.com/pppwtk" },
  { label: "Instagram", href: "https://www.instagram.com/pppwtk" },
];

export default function Navbar() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [worksOpen, setWorksOpen] = useState(false);
  const router = useRouter();
  const year = new Date().getFullYear();

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const triggerY = 60;
    let rafId = 0;

    const checkTheme = () => {
      const elements = document.querySelectorAll<HTMLElement>("section, [data-navbar-theme]");
      let activeTheme: "light" | "dark" = "dark";

      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY && rect.bottom > triggerY) {
          activeTheme = el.dataset.navbarTheme === "light" ? "light" : "dark";
        }
      }

      setIsLight(activeTheme === "light");
      rafId = requestAnimationFrame(checkTheme);
    };

    rafId = requestAnimationFrame(checkTheme);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const buttonTheme = open
    ? "border-[#E0E6ED]/30 bg-[#1A1A1A] text-[#E0E6ED]"
    : isLight
      ? "border-white/40 bg-bg text-fg"
      : "border-border/80 bg-fg text-bg";

  return (
    <>
      <Link
        href="/"
        className={`fixed left-4 top-4 z-[60] block h-8 w-20 shrink-0 sm:left-6 sm:top-6 sm:h-10 sm:w-24 lg:left-10 lg:top-5 lg:h-12 lg:w-28 ${mounted ? "hero-enter" : "hero-enter-start"}`}
        style={{ "--enter-y": "-16px" } as React.CSSProperties}
      >
        <Image
          src="/logo/xircons-x-nobg.png"
          alt="Xircons"
          fill
          priority
          sizes="(min-width: 1024px) 7rem, (min-width: 640px) 6rem, 5rem"
          className={`object-contain object-left transition-opacity duration-300 ${isLight || open ? "opacity-0" : "opacity-100"}`}
        />
        <Image
          src="/logo/xircons-x-white-nobg.png"
          alt="Xircons White"
          fill
          priority
          sizes="(min-width: 1024px) 7rem, (min-width: 640px) 6rem, 5rem"
          className={`object-contain object-left transition-opacity duration-300 ${isLight || open ? "opacity-100" : "opacity-0"}`}
        />
      </Link>

      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        style={{ "--enter-x": "24px" } as React.CSSProperties}
        className={`group fixed right-4 top-4 z-[60] flex h-10 items-stretch border transition-colors duration-300 sm:right-6 sm:top-5 sm:h-12 lg:right-10 lg:top-5 ${mounted ? "hero-enter" : "hero-enter-start"} ${buttonTheme}`}
      >
        <span className="hidden items-center pl-4 pr-32 text-sm font-medium uppercase tracking-wide sm:flex">
          {open ? "Close" : "Menu"}
        </span>
        <span className="relative flex h-full w-10 items-center justify-center overflow-hidden border-l border-current/30 sm:w-12">
          <MenuToggleIcon open={open} className="absolute transition-transform duration-500 ease-out group-hover:translate-x-[250%]" />
          <MenuToggleIcon open={open} className="absolute -translate-x-[250%] transition-transform duration-500 ease-out group-hover:translate-x-0" />
        </span>
      </button>

      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 h-full w-full bg-[#1A1A1A] text-[#E0E6ED] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-full w-full flex-col justify-between px-5 pt-24 pb-8 lg:px-10 lg:pt-28 lg:pb-12">
          <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto">
            {NAV.map((item, i) => {
              const isWorks = item.label === "Works";
              return (
                <div
                  key={item.label}
                  className={`border-t border-[#E0E6ED]/15 ${i === NAV.length - 1 && !isWorks ? "border-b" : ""}`}
                >
                  <div className="flex items-center justify-between gap-5">
                    <a
                      href={item.href}
                      onClick={(e) => {
                        setOpen(false);
                        document.body.style.overflow = "";
                        if (window.location.pathname === "/") {
                          e.preventDefault();
                          const targetId = item.href.replace("/#", "");
                          const target = document.getElementById(targetId);
                          if (target) {
                            target.scrollIntoView({ behavior: "smooth", block: "start" });
                            window.history.pushState(null, "", item.href);
                          }
                        }
                      }}
                      className={`group flex flex-1 items-baseline gap-6 text-[#E0E6ED]/70 transition-all duration-500 ease-out hover:text-[#E0E6ED] ${worksOpen ? "py-3 lg:py-5" : "py-6 lg:py-10"}`}
                    >
                      <span className="font-mono text-xs font-medium text-[#E0E6ED]/40 transition-colors duration-500 group-hover:text-[#E0E6ED]/60 sm:text-sm">
                        {item.code}
                      </span>
                      <span
                        className={`font-bold leading-[0.85] tracking-tighter transition-all duration-500 ease-out group-hover:translate-x-4 ${worksOpen ? "text-[clamp(2rem,5vw,3.5rem)]" : "text-[clamp(3rem,10vw,7.5rem)]"}`}
                      >
                        {item.label}
                      </span>
                    </a>

                    {isWorks && (
                      <button
                        type="button"
                        aria-label={worksOpen ? "Collapse projects" : "Expand projects"}
                        aria-expanded={worksOpen}
                        onClick={() => setWorksOpen((v) => !v)}
                        className="relative grid h-14 w-14 shrink-0 cursor-pointer place-items-center text-[#E0E6ED]/70 transition-colors hover:text-[#E0E6ED]"
                      >
                        <span className="absolute h-0.5 w-6 rounded-full bg-current" />
                        <span
                          className={`absolute h-0.5 w-6 rounded-full bg-current transition-transform duration-500 ease-out ${worksOpen ? "rotate-0" : "rotate-90"}`}
                        />
                      </button>
                    )}
                  </div>

                  {isWorks && (
                    <div
                      className="grid transition-all duration-500 ease-out"
                      style={{ gridTemplateRows: worksOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <ul className="mb-4 ml-5 flex flex-col lg:ml-6">
                          {WORK_LINKS.map((work) => (
                            <li key={work.slug}>
                              <Link
                                href={`/project/${work.slug}`}
                                onClick={() => {
                                  setOpen(false);
                                  document.body.style.overflow = "";
                                }}
                                className="group flex items-center justify-between gap-4 py-2.5 pl-6 pr-4 transition-colors duration-500 hover:bg-[#E0E6ED]/5 lg:py-3 lg:pl-10 lg:pr-6"
                              >
                                <span className="flex items-baseline gap-2 sm:gap-2">
                                  <span className="font-mono text-xs font-medium text-[#E0E6ED]/40 transition-colors duration-500 group-hover:text-[#E0E6ED]/60">
                                    P{String(work.id).padStart(3, "0")} /
                                  </span>
                                  <span className="text-base font-medium text-[#E0E6ED]/70 transition-colors duration-500 group-hover:text-[#E0E6ED] lg:text-lg">
                                    {work.label}
                                  </span>
                                </span>
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  aria-hidden="true"
                                  className="shrink-0 -translate-x-1 text-[#E0E6ED]/40 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                >
                                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div className="border-b border-[#E0E6ED]/15" />
          </nav>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {CONNECT.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#E0E6ED]/70 transition-colors hover:text-[#E0E6ED]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#E0E6ED]/30">
              <span>© {year} All Rights Reserved. XIRCONS.</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
