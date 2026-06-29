"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const NAV_LINKS = [
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Research", href: "#research" },
  { label: "Beyond", href: "#beyond" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduced = useReducedMotion();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 100 && currentY > lastScrollY.current + 10) {
        setHidden(true);
      } else if (currentY < lastScrollY.current - 10 || currentY < 100) {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      gsap.to(nav, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
    };

    window.addEventListener("hero-navbar-show", onIntro);

    const observers = NAV_LINKS.map(({ href }) => {
      const el = document.getElementById(href.replace("#", ""));
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(href.replace("#", ""));
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

  return (
    <>
      <nav
        ref={navRef}
        className="fixed left-1/2 top-6 z-50 -translate-x-1/2"
        style={{
          transform: `translateX(-50%) translateY(${hidden ? "-150%" : "0"})`,
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="flex items-center gap-2 rounded-full border border-border-light bg-bg-primary/80 px-4 py-2 backdrop-blur-xl">
          <a href="#" className="mr-4 font-display text-sm font-bold text-text-primary">
            MB
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activeSection === href.replace("#", "");
              return (
                <a
                  key={href}
                  href={href}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-text-primary text-bg-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </div>

          <button
            type="button"
            className="flex flex-col gap-1.5 p-2 md:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <span className="block h-[1px] w-5 bg-text-primary" />
            <span className="block h-[1px] w-5 bg-text-primary" />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-bg-primary">
          <button
            type="button"
            className="absolute right-6 top-8 text-2xl text-text-secondary hover:text-text-primary"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
          <div className="flex flex-col items-center gap-6">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="font-display text-4xl font-semibold text-text-primary"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
