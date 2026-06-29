"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const INTERESTS = [
  "Agentic observability patterns",
  "LLM evaluation methodology (RAGAS, DeepEval)",
  "LoRA fine-tuning for domain adaptation",
  "Custom CUDA kernels for ML ops",
  "AI security & adversarial robustness",
];

export function Research() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    if (reduced) {
      gsap.set([left, right], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([left, right], { opacity: 0, y: 40 });

      gsap.to([left, right], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} id="research" className="scroll-mt-32">
      <div className="mb-12">
        <h2 className="font-display text-4xl font-semibold leading-tight text-text-primary md:text-5xl">
          Research & Exploration
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div ref={leftRef} className="bento-card p-8 md:p-12">
          <p className="font-mono text-xs uppercase tracking-wider text-text-secondary">
            In Progress
          </p>
          <h3 className="mt-4 font-display text-2xl font-semibold text-text-primary">
            NeuroTrace
          </h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">
            AI Evaluation & Observability Platform for RAG and agentic systems.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["FastAPI", "Next.js", "PostgreSQL", "Qdrant", "Prometheus"].map((tech) => (
              <span key={tech} className="rounded-md border border-border-light bg-bg-primary px-2 py-1 font-mono text-[11px] text-text-secondary">
                {tech}
              </span>
            ))}
          </div>

          <svg
            viewBox="0 0 400 80"
            className="mt-12 w-full max-w-sm"
            aria-hidden="true"
          >
            <rect x="10" y="20" width="100" height="40" rx="8" fill="var(--bg-secondary)" stroke="var(--border-light)" />
            <text x="60" y="44" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="monospace">
              RAG Pipeline
            </text>

            <line x1="115" y1="40" x2="145" y2="40" stroke="var(--border-light)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

            <rect x="150" y="20" width="100" height="40" rx="8" fill="var(--bg-primary)" stroke="var(--text-primary)" strokeWidth="1.5" />
            <text x="200" y="44" textAnchor="middle" fill="var(--text-primary)" fontSize="11" fontFamily="monospace" fontWeight="bold">
              Evaluation
            </text>

            <line x1="255" y1="40" x2="285" y2="40" stroke="var(--border-light)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

            <rect x="290" y="20" width="100" height="40" rx="8" fill="var(--bg-secondary)" stroke="var(--border-light)" />
            <text x="340" y="44" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="monospace">
              Dashboard
            </text>

            <defs>
              <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6" fill="var(--text-secondary)" />
              </marker>
            </defs>
          </svg>
        </div>

        <div ref={rightRef} className="bento-card p-8 md:p-12 flex flex-col justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-text-secondary">
              Currently reading into
            </p>
            <ul className="mt-8 space-y-4">
              {INTERESTS.map((item) => (
                <li
                  key={item}
                  className="font-mono text-sm text-text-primary flex items-start gap-3"
                >
                  <span className="text-text-secondary mt-0.5">→</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-12 font-mono text-sm text-text-secondary max-w-xs">
            Depth-first exploration. Always building toward the next breakthrough.
          </p>
        </div>
      </div>
    </section>
  );
}
