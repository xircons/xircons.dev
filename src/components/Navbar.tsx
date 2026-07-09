"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
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
  { code: "04", label: "Contact", href: "/contact" },
];

const CONNECT = [
  { label: "GitHub", href: "https://github.com/xircons" },
  { label: "Facebook", href: "https://www.facebook.com/pppwtk" },
  { label: "Instagram", href: "https://www.instagram.com/pppwtk" },
];

const EMAIL = "admin@turnpro.dev";

export default function Navbar() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [worksOpen, setWorksOpen] = useState(false);
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
    ? "border-border/30 bg-fg text-border"
    : isLight
      ? "border-white/40 bg-bg text-fg"
      : "border-border/80 bg-fg text-bg";

  const closeMenu = () => {
    setOpen(false);
  };

  const handleAnchorClick = (href: string) => (e: React.MouseEvent) => {
    closeMenu();
    if (window.location.pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <>
      <Link
        href="/"
        className={`fixed left-4 top-4 z-[70] block h-8 w-20 shrink-0 sm:left-6 sm:top-6 sm:h-10 sm:w-24 lg:left-10 lg:top-5 lg:h-12 lg:w-28 ${mounted ? "hero-enter" : "hero-enter-start"}`}
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
        className={`group fixed right-4 top-4 z-[70] flex h-10 cursor-pointer items-stretch border transition-colors duration-300 sm:right-6 sm:top-5 sm:h-12 lg:right-10 lg:top-5 ${mounted ? "hero-enter" : "hero-enter-start"} ${buttonTheme}`}
      >
        <span className="hidden items-center pl-4 pr-32 text-sm font-medium uppercase tracking-wide sm:flex">
          {open ? "Close" : "Menu"}
        </span>
        <span className="relative flex h-full w-10 items-center justify-center overflow-hidden border-l border-current/30 sm:w-12">
          <MenuToggleIcon open={open} className="absolute transition-transform duration-500 ease-out group-hover:translate-x-[250%]" />
          <MenuToggleIcon open={open} className="absolute -translate-x-[250%] transition-transform duration-500 ease-out group-hover:translate-x-0" />
        </span>
      </button>

      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={closeMenu}
        className={`fixed inset-0 z-40 cursor-default bg-fg/50 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <aside
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-white text-fg shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] sm:w-[70vw] md:w-[50vw] lg:w-[38vw] xl:w-[32vw] ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-full w-full flex-col justify-between overflow-y-auto px-6 pb-8 pt-24 sm:px-8 sm:pt-28 lg:px-10 lg:pb-12">
          <div>
            <h2 className="mb-8 text-xs font-medium uppercase tracking-[0.25em] text-fg/40">
              Navigation
            </h2>
            <nav className="flex flex-col">
              {NAV.map((item) => {
                const isWorks = item.label === "Works";
                return (
                  <div key={item.label}>
                    <div className="group flex items-center justify-between gap-4">
                      <Link
                        href={item.href}
                        onClick={item.href.startsWith("/#") ? handleAnchorClick(item.href) : closeMenu}
                        className={`flex flex-1 items-baseline gap-4 text-fg transition-colors duration-500 ${worksOpen ? "py-3" : "py-5"}`}
                      >
                        <span
                          className={`font-bold leading-[0.95] tracking-tight transition-all duration-500 ease-out group-hover:translate-x-2 ${worksOpen ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl lg:text-6xl"}`}
                        >
                          {item.label}
                        </span>
                      </Link>

                      {isWorks && (
                        <button
                          type="button"
                          aria-label={worksOpen ? "Collapse projects" : "Expand projects"}
                          aria-expanded={worksOpen}
                          onClick={() => setWorksOpen((v) => !v)}
                          className="relative grid h-10 w-10 shrink-0 cursor-pointer place-items-center text-fg/70 transition-colors hover:border-fg/60 hover:text-fg"
                        >
                          <span className="absolute h-0.5 w-4 rounded-full bg-current" />
                          <span
                            className={`absolute h-0.5 w-4 rounded-full bg-current transition-transform duration-500 ease-out ${worksOpen ? "rotate-0" : "rotate-90"}`}
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
                          <ul className="mb-4 ml-4 flex flex-col border-l border-fg/10 pl-4">
                            {WORK_LINKS.map((work) => (
                              <li key={work.slug}>
                                <Link
                                  href={`/project/${work.slug}`}
                                  onClick={closeMenu}
                                  className="group flex items-center justify-between gap-4 py-2 pr-2 transition-colors duration-300"
                                >
                                  <span className="flex items-baseline gap-2">
                                    <span className="font-mono text-xs font-medium text-fg/40 transition-colors duration-300 group-hover:text-fg/70">
                                      P{String(work.id).padStart(3, "0")}
                                    </span>
                                    <span className="text-sm font-medium text-fg/70 transition-colors duration-300 group-hover:text-fg">
                                      {work.label}
                                    </span>
                                  </span>
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    aria-hidden="true"
                                    className="shrink-0 -translate-x-1 text-fg/40 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
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
            </nav>
          </div>

          <div className="mt-12 flex flex-col gap-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
                {CONNECT.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg/60 transition-colors hover:text-fg"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <span className="text-[10px] uppercase tracking-widest text-fg/40">
                © {year} XIRCONS
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
