"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CONTACTS = [
  {
    label: "Email",
    value: "mokshbuddhadev@gmail.com",
    href: "mailto:mokshbuddhadev@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mokshbuddhadev12",
    href: "https://linkedin.com/in/mokshbuddhadev12",
  },
  {
    label: "GitHub",
    value: "github.com/MokshBuddhadev",
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
      gsap.set(rows.children, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(rows.children, { opacity: 0, y: 30 });
      gsap.to(rows.children, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: rows, start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} id="contact" className="px-6 py-32 border-t border-border-light bg-bg-secondary">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
          
          <div>
            <h2 className="font-display text-4xl font-semibold leading-tight text-text-primary md:text-5xl lg:text-7xl mb-8">
              Let&apos;s build
              <br />
              something real.
            </h2>
            <div className="space-y-2 font-mono text-[13px] text-text-secondary">
              <p className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-text-primary animate-pulse" /> 
                Based in Jaipur, India.
              </p>
              <p>Graduating 2027.</p>
              <p className="text-text-primary">Available for ML/GenAI internships.</p>
            </div>

            <div className="mt-12">
              <a
                href="/Moksh_Resume.pdf"
                download="Moksh_Buddhadev_Resume.pdf"
                className="inline-flex items-center gap-3 rounded-full border border-border-light bg-bg-primary px-8 py-4 font-mono text-sm text-text-primary transition-colors hover:bg-text-primary hover:text-bg-primary"
              >
                <span>Download Resume</span>
                <span>↓</span>
              </a>
            </div>
          </div>

          <div ref={rowsRef} className="flex flex-col justify-center">
            {CONTACTS.map(({ label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="group flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-light py-8 transition-colors hover:border-text-secondary"
              >
                <span className="font-mono text-sm text-text-secondary mb-2 sm:mb-0">
                  {label}
                </span>
                <span className="font-display text-lg sm:text-xl text-text-primary transition-transform group-hover:-translate-x-2">
                  {value}
                </span>
              </a>
            ))}
          </div>
          
        </div>

        <footer className="mt-32 flex flex-col items-center justify-between border-t border-border-light pt-8 font-mono text-[11px] text-text-secondary md:flex-row">
          <p>© {new Date().getFullYear()} Moksh Buddhadev. All rights reserved.</p>
          <div className="mt-4 flex gap-6 md:mt-0">
            {CONTACTS.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">
                {label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
}
