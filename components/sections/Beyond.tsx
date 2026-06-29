"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function MusicVisual() {
  return (
    <div className="mt-6 flex h-16 items-end justify-center gap-1">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="w-1 origin-bottom rounded-sm bg-accent"
          style={{
            height: `${20 + (i % 7) * 6}px`,
            animation: `wave-bar 1.2s ease-in-out infinite`,
            animationDelay: `${i * 0.05}s`,
            boxShadow: "0 0 8px rgba(167, 139, 250, 0.4)",
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
    <svg viewBox="0 0 200 120" className="mt-6 w-full" aria-hidden="true">
      <rect
        x="20"
        y="10"
        width="160"
        height="100"
        fill="none"
        stroke="var(--ridge)"
        strokeWidth="1.5"
      />
      <line
        x1="20"
        y1="60"
        x2="180"
        y2="60"
        stroke="var(--fog)"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <line x1="100" y1="10" x2="100" y2="60" stroke="var(--ridge)" strokeWidth="0.75" />
      <line x1="100" y1="60" x2="100" y2="110" stroke="var(--ridge)" strokeWidth="0.75" />
      <line x1="20" y1="35" x2="180" y2="35" stroke="var(--ridge)" strokeWidth="0.5" />
      <line x1="20" y1="85" x2="180" y2="85" stroke="var(--ridge)" strokeWidth="0.5" />
      <path
        ref={arcRef}
        d="M 40 100 Q 100 10 160 20"
        fill="none"
        stroke="var(--cyan)"
        strokeWidth="2.5"
        filter="drop-shadow(0 0 4px rgba(34, 211, 238, 0.5))"
      />
      <circle cx="160" cy="20" r="4" fill="var(--cyan)" />
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
  const headerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const grid = gridRef.current;
    const header = headerRef.current;
    if (!grid || !header) return;

    if (reduced) {
      gsap.set([header, ...Array.from(grid.children)], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: header, start: "top 85%" }
        }
      );

      gsap.fromTo(
        grid.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: grid, start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="beyond"
      className="bg-deep-water px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div ref={headerRef} className="gpu-layer">
          <h2 className="font-display text-4xl font-extrabold leading-tight text-salt md:text-5xl">
            Not all of <em>me</em>
            <br />
            runs on GPUs.
          </h2>
        </div>

        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 gpu-layer"
        >
          {CARDS.map(({ title, body, Visual }) => (
            <article
              key={title}
              className="beyond-card group relative overflow-hidden rounded-xl border border-ridge bg-terrain p-7 transition-all duration-500 hover:-translate-y-2 hover:border-accent hover:shadow-[0_8px_30px_rgba(167,139,250,0.15)]"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent opacity-0 blur-[50px] transition-opacity duration-500 group-hover:opacity-20" />
              
              <h3 className="relative z-10 font-display text-lg font-bold text-salt">
                {title}
              </h3>
              <p className="relative z-10 mt-2 font-body text-sm text-fog">{body}</p>
              <div className="relative z-10">
                <Visual />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
