"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CONTACTS = [
  {
    label: "mokshbuddhadev@gmail.com",
    href: "mailto:mokshbuddhadev@gmail.com",
    icon: "✉",
  },
  {
    label: "linkedin.com/in/mokshbuddhadev12",
    href: "https://linkedin.com/in/mokshbuddhadev12",
    icon: "in",
  },
  {
    label: "github.com/MokshBuddhadev",
    href: "https://github.com/MokshBuddhadev",
    icon: "gh",
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const rows = rowsRef.current;
    if (!rows) return;

    if (reduced) {
      gsap.set(rows.children, { opacity: 1, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rows.children,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: rows, start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  // Magnetic hover effect for contact rows
  const handleMagneticMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const arrow = el.querySelector('.contact-arrow') as HTMLElement;
    if (!arrow) return;
    
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    
    // Slight shift of arrow towards mouse
    arrow.style.transform = `translateX(${x * 10}px) scale(1.1)`;
  }, []);

  const handleMagneticLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const arrow = e.currentTarget.querySelector('.contact-arrow') as HTMLElement;
    if (arrow) arrow.style.transform = "translateX(0) scale(1)";
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-ink px-6 py-24 md:py-32"
    >
      {/* Subtle top gradient separator */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-ridge to-transparent" />

      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-4xl font-extrabold leading-tight text-salt md:text-5xl">
          Let&apos;s build
          <br />
          <span className="gradient-text">something real.</span>
        </h2>

        <div ref={rowsRef} className="mt-12 gpu-layer">
          {CONTACTS.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              className="group flex items-center justify-between border-b border-ridge py-6 transition-all duration-400 hover:border-b-accent hover:pl-4"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded bg-terrain font-mono text-xs text-fog transition-colors group-hover:bg-accent/10 group-hover:text-accent">
                  {icon}
                </span>
                <span className="font-mono text-base text-salt transition-colors group-hover:text-accent-bright md:text-lg">
                  {label}
                </span>
              </div>
              <span className="contact-arrow font-mono text-accent transition-transform duration-300">
                ↗
              </span>
            </a>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-2 font-mono text-[13px] text-fog">
            <p className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" /> 
              Based in Jaipur, India.
            </p>
            <p>Graduating 2027.</p>
            <p className="text-salt">Available for ML/GenAI internships.</p>
          </div>

          <div className="flex justify-start md:justify-end">
            <a
              href="/Moksh_Resume.pdf"
              download="Moksh_Buddhadev_Resume.pdf"
              className="magnetic-hover group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-ridge bg-terrain px-8 py-4 font-mono text-sm text-salt transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_rgba(167,139,250,0.2)]"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              
              <span className="relative z-10">Download Resume</span>
              <span className="relative z-10 text-accent transition-transform duration-300 group-hover:translate-y-1">↓</span>
            </a>
          </div>
        </div>

        <footer className="mt-24 flex flex-col items-center justify-between border-t border-ridge/50 pt-8 font-mono text-[11px] text-fog md:flex-row">
          <p>© {new Date().getFullYear()} Moksh Buddhadev. All rights reserved.</p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <a href="https://linkedin.com/in/mokshbuddhadev12" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
            <a href="https://github.com/MokshBuddhadev" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GitHub</a>
            <a href="mailto:mokshbuddhadev@gmail.com" className="hover:text-accent transition-colors">Email</a>
          </div>
        </footer>
      </div>
    </section>
  );
}
