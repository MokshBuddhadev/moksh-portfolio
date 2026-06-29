"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  const [hidden, setHidden] = useState(false);
  const reduced = useReducedMotion();
  const lastScrollY = useRef(0);

  // Scroll direction detection for hide/show
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const threshold = 100;
      if (currentY > threshold && currentY > lastScrollY.current + 10) {
        setHidden(true);
      } else if (currentY < lastScrollY.current - 10 || currentY < threshold) {
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

  // Magnetic hover effect
  const handleMagneticMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }, []);

  const handleMagneticLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translate(0, 0)";
  }, []);

  useEffect(() => {
    if (!menuOpen || reduced) return;

    const links = document.querySelectorAll(".mobile-nav-link");
    gsap.fromTo(
      links,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power3.out" }
    );
  }, [menuOpen, reduced]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed left-1/2 top-4 z-50 -translate-x-1/2"
        style={{
          transform: `translateX(-50%) translateY(${hidden ? "-120%" : "0"})`,
          transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <div
          className="flex items-center gap-1 rounded-full border border-ridge/50 px-2 py-1.5 md:px-3"
          style={{
            background: "rgba(9, 9, 11, 0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          <ScrollProgress />

          {/* Logo */}
          <a
            href="#"
            className="mr-2 rounded-full px-3 py-1.5 font-display text-base font-bold transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--cyan))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            MB
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-0.5 md:flex">
            {NAV_LINKS.map(({ label, href }) => {
              const sectionId = href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={href}
                  href={href}
                  className="magnetic-hover relative rounded-full px-3.5 py-1.5 font-mono text-[12px] tracking-wide transition-all duration-300"
                  style={{
                    color: isActive ? "var(--accent-bright)" : "var(--fog)",
                    background: isActive ? "rgba(167, 139, 250, 0.1)" : "transparent",
                  }}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                >
                  {label}
                  {isActive && (
                    <span
                      className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                  )}
                </a>
              );
            })}
            <a
              href="/Moksh_Resume.pdf"
              download="Moksh_Buddhadev_Resume.pdf"
              className="ml-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] transition-all duration-300"
              style={{
                borderColor: "rgba(167, 139, 250, 0.3)",
                color: "var(--accent)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.background = "rgba(167, 139, 250, 0.08)";
                e.currentTarget.style.boxShadow = "0 0 15px rgba(167, 139, 250, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(167, 139, 250, 0.3)";
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Resume ↓
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="flex flex-col gap-1 rounded-full p-2 md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="block h-[1.5px] w-5 rounded-full bg-salt transition-all" />
            <span className="block h-[1.5px] w-5 rounded-full bg-salt transition-all" />
            <span className="block h-[1.5px] w-3.5 rounded-full bg-salt transition-all" />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
          style={{
            background: "rgba(9, 9, 11, 0.95)",
            backdropFilter: "blur(24px)",
          }}
        >
          <button
            type="button"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-ridge text-2xl text-salt transition-all duration-300 hover:border-accent hover:text-accent"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{ transform: "rotate(0deg)", transition: "transform 0.3s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "rotate(90deg)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "rotate(0deg)"; }}
          >
            ×
          </button>
          <div className="flex flex-col items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="mobile-nav-link font-display text-3xl font-bold text-salt transition-colors duration-300 hover:text-accent"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              href="/Moksh_Resume.pdf"
              download="Moksh_Buddhadev_Resume.pdf"
              className="mobile-nav-link font-display text-2xl font-bold transition-colors duration-300"
              style={{ color: "var(--cyan)" }}
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
