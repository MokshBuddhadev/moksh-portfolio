"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MetricPill } from "@/components/ui/MetricPill";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    const cards = section.querySelectorAll(".bento-card");

    if (reduced) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(cards, { opacity: 0, y: 40 });

    const ctx = gsap.context(() => {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { 
          trigger: section,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} id="about" className="scroll-mt-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bento-card col-span-1 md:col-span-2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="font-display text-3xl font-semibold leading-tight text-text-primary md:text-5xl">
            Building AI that earns its keep.
          </h2>
          <p className="mt-6 font-body text-base leading-relaxed text-text-secondary max-w-xl">
            I&apos;m a final-year CS student at Manipal University Jaipur
            obsessed with the mechanics of how language models actually work —
            not just using them, but instrumenting, evaluating, and pushing
            them. I build pipelines that ship, from RAG systems for regulatory
            compliance to NL-to-SQL engines over oceanographic datasets.
          </p>
        </div>

        <div className="bento-card col-span-1 p-8 flex flex-col items-center justify-center text-center">
          <div className="text-5xl font-display font-bold text-text-primary mb-2">8.39</div>
          <div className="text-sm font-mono text-text-secondary uppercase tracking-widest">CGPA</div>
          <div className="mt-4 text-xs text-text-secondary opacity-60">MUJ 2027</div>
        </div>

        <div className="bento-card col-span-1 md:col-span-3 p-8 flex gap-6 overflow-x-auto hide-scrollbar">
          <div className="min-w-fit">
            <MetricPill value={0.9404} label="CV-AUC — Credit Risk" decimals={4} />
          </div>
          <div className="min-w-fit">
            <MetricPill value={95} label="Query success — FloatChat" suffix="%" decimals={0} />
          </div>
          <div className="min-w-fit">
            <MetricPill value={17} label="Classifiers benchmarked" decimals={0} />
          </div>
        </div>
      </div>
    </section>
  );
}
