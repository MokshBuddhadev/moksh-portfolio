"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MetricPill } from "@/components/ui/MetricPill";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    if (reduced) {
      gsap.set([left, right], { opacity: 1, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        left,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current },
        }
      );
      gsap.fromTo(
        right,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-deep-water px-6 py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[3fr_2fr] md:gap-16">
        <div ref={leftRef}>
          <h2 className="font-display text-4xl font-extrabold leading-tight text-salt md:text-5xl lg:text-6xl">
            Building AI that
            <br />
            earns its keep.
          </h2>
        </div>
        <div ref={rightRef}>
          <p className="font-body text-base leading-[1.7] text-fog">
            I&apos;m a final-year CS student at Manipal University Jaipur
            obsessed with the mechanics of how language models actually work —
            not just using them, but instrumenting, evaluating, and pushing
            them. I build pipelines that ship, from RAG systems for regulatory
            compliance to NL-to-SQL engines over oceanographic datasets. CGPA
            8.39 — building systems that run in production.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <MetricPill value={0.9404} label="CV-AUC — Credit Risk" decimals={4} />
            <MetricPill value={95} label="Query success — FloatChat" suffix="%" decimals={0} />
            <MetricPill value={17} label="Classifiers benchmarked" decimals={0} />
          </div>
        </div>
      </div>
    </section>
  );
}
