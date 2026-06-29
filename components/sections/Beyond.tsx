"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function MusicVisual() {
  return (
    <div className="mt-8 flex h-16 items-end justify-center gap-1.5 opacity-80">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="w-1.5 origin-bottom rounded-full bg-text-primary"
          style={{
            height: `${20 + (i % 5) * 8}px`,
            animation: `wave-bar 1.5s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}

function TennisVisual() {
  const arcRef = useRef<SVGPathElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const arc = arcRef.current;
    if (!arc || reduced) return;

    const length = arc.getTotalLength();
    gsap.set(arc, { strokeDasharray: length, strokeDashoffset: length });

    const trigger = ScrollTrigger.create({
      trigger: arc,
      start: "top 85%",
      onEnter: () => {
        gsap.to(arc, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
        });
      },
    });

    return () => trigger.kill();
  }, [reduced]);

  return (
    <svg viewBox="0 0 200 120" className="mt-8 w-full opacity-80" aria-hidden="true">
      <rect x="20" y="10" width="160" height="100" fill="none" stroke="var(--border-light)" strokeWidth="1.5" />
      <line x1="20" y1="60" x2="180" y2="60" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="4 3" />
      <line x1="100" y1="10" x2="100" y2="60" stroke="var(--border-light)" strokeWidth="1" />
      <line x1="100" y1="60" x2="100" y2="110" stroke="var(--border-light)" strokeWidth="1" />
      <path
        ref={arcRef}
        d="M 40 100 Q 100 10 160 20"
        fill="none"
        stroke="var(--text-primary)"
        strokeWidth="2.5"
      />
      <circle cx="160" cy="20" r="4" fill="var(--text-primary)" />
    </svg>
  );
}

const CARDS = [
  {
    title: "I listen constantly.",
    body: "Playlist > silence, always. Music is how I think.",
    Visual: MusicVisual,
  },
  {
    title: "Federer was poetry.",
    body: "Tennis taught me that precision and aggression aren't opposites.",
    Visual: TennisVisual,
  },
];

export function Beyond() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    if (reduced) {
      gsap.set(grid.children, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(grid.children, { opacity: 0, y: 40 });

      gsap.to(grid.children, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: grid, start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} id="beyond" className="scroll-mt-32">
      <div className="mb-12">
        <h2 className="font-display text-4xl font-semibold leading-tight text-text-primary md:text-5xl">
          Beyond Code
        </h2>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CARDS.map(({ title, body, Visual }) => (
          <article key={title} className="bento-card p-8 md:p-12 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-2xl font-semibold text-text-primary">
                {title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">
                {body}
              </p>
            </div>
            <div>
              <Visual />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
