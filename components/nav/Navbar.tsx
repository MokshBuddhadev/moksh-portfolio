"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const NAV_LINKS = [
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Research", href: "#research" },
  { label: "Beyond", href: "#beyond" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = ["projects", "skills", "research", "beyond", "contact"];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    if (reduced) {
      gsap.set(nav, { y: 0, opacity: 1 });
    } else {
      gsap.set(nav, { y: -80, opacity: 0 });
    }

    const onIntro = () => {
      if (reduced) return;
      gsap.to(nav, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
    };

    window.addEventListener("hero-navbar-show", onIntro);

    const observers = SECTION_IDS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      observer.observe(el);
      return observer;
    });

    return () => {
      window.removeEventListener("hero-navbar-show", onIntro);
      observers.forEach((o) => o?.disconnect());
    };
  }, [reduced]);

  useEffect(() => {
    if (!menuOpen || reduced) return;

    const links = document.querySelectorAll(".mobile-nav-link");
    gsap.fromTo(
      links,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: "power2.out" }
    );
  }, [menuOpen, reduced]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-50 border-b border-ridge"
        style={{
          background: "rgba(13, 15, 20, 0.75)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <ScrollProgress />
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="#"
            className="font-display text-lg font-bold text-dusk-amber"
          >
            MB
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map(({ label, href }) => {
              const sectionId = href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={href}
                  href={href}
                  className={`relative font-mono text-[13px] transition-colors duration-300 ${
                    isActive ? "text-dusk-amber" : "text-fog hover:text-salt"
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-dusk-amber" />
                  )}
                </a>
              );
            })}
            <a
              href="/Moksh_Resume.pdf"
              download="Moksh_Buddhadev_Resume.pdf"
              className="rounded border border-ridge px-3 py-1 font-mono text-[11px] text-shoreline transition-all duration-300 hover:border-shoreline hover:bg-shoreline/5"
            >
              Resume ↓
            </a>
          </div>

          <button
            type="button"
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="block h-0.5 w-6 bg-salt" />
            <span className="block h-0.5 w-6 bg-salt" />
            <span className="block h-0.5 w-6 bg-salt" />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-ink"
          style={{ backdropFilter: "blur(12px)" }}
        >
          <button
            type="button"
            className="absolute right-6 top-6 font-display text-3xl text-salt"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
          <div className="flex flex-col items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="mobile-nav-link font-display text-3xl font-bold text-salt"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              href="/Moksh_Resume.pdf"
              download="Moksh_Buddhadev_Resume.pdf"
              className="mobile-nav-link font-display text-2xl font-bold text-shoreline"
              onClick={() => setMenuOpen(false)}
            >
              Resume ↓
            </a>
          </div>
        </div>
      )}
    </>
  );
}
