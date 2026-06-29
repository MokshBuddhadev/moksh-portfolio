"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CONTACTS = [
  {
    label: "mokshbuddhadev@gmail.com",
    href: "mailto:mokshbuddhadev@gmail.com",
  },
  {
    label: "linkedin.com/in/mokshbuddhadev12",
    href: "https://linkedin.com/in/mokshbuddhadev12",
  },
  {
    label: "github.com/MokshBuddhadev",
    href: "https://github.com/MokshBuddhadev",
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
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: rows, start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-ink px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-4xl font-extrabold leading-tight text-salt md:text-5xl">
          Let&apos;s build
          <br />
          something real.
        </h2>

        <div ref={rowsRef} className="mt-12">
          {CONTACTS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="contact-row group flex items-center justify-between border-b border-ridge py-6 transition-transform duration-300 hover:translate-x-2 hover:border-l-2 hover:border-l-dusk-amber hover:pl-2"
            >
              <span className="font-mono text-base text-salt md:text-lg">
                {label}
              </span>
              <span className="font-mono text-dusk-amber transition-transform group-hover:scale-110">
                →
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 space-y-1 font-mono text-[13px] text-fog">
          <p>Based in India. Open to remote. Graduating 2027.</p>
          <p>Available for ML/GenAI internships.</p>
        </div>

        <a
          href="/Moksh_Resume.pdf"
          download="Moksh_Buddhadev_Resume.pdf"
          className="mt-8 inline-flex items-center gap-3 rounded-lg border border-ridge bg-terrain px-6 py-4 font-mono text-sm text-salt transition-all duration-300 hover:border-dusk-amber hover:shadow-[0_0_20px_rgba(232,135,58,0.12)]"
        >
          <span>Download Resume</span>
          <span className="text-dusk-amber">↓</span>
        </a>

        <footer className="mt-16 text-center font-mono text-[11px] text-ridge">
          Moksh Buddhadev · Built with Next.js · 2027
        </footer>
      </div>
    </section>
  );
}
