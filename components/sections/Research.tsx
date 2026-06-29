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
      gsap.set([left, right], { opacity: 1, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        left,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
      gsap.fromTo(
        right,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
      
      // Parallax diagram
      const diagram = left.querySelector("svg");
      if (diagram) {
        gsap.to(diagram, {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="research"
      className="bg-ink px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 font-display text-4xl font-extrabold leading-tight text-salt md:text-5xl animate-fade-in-up">
          Where I go
          <br />
          when I go deep.
        </h2>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div ref={leftRef} className="gpu-layer">
            <p className="font-mono text-xs uppercase tracking-wider text-accent glow-accent">
              In Progress
            </p>
            <h3 className="mt-2 font-display text-xl font-bold text-salt">
              NeuroTrace
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-fog">
              AI Evaluation &amp; Observability Platform for RAG and agentic
              systems.
            </p>
            <p className="mt-4 font-mono text-[13px] text-fog">
              FastAPI · Next.js · PostgreSQL · Redis · Qdrant · Celery · Ollama
              · Prometheus · Grafana
            </p>

            <svg
              viewBox="0 0 400 80"
              className="mt-8 w-full"
              aria-hidden="true"
            >
              <rect
                x="10"
                y="20"
                width="100"
                height="40"
                rx="8"
                fill="var(--terrain)"
                stroke="var(--ridge)"
              />
              <text
                x="60"
                y="45"
                textAnchor="middle"
                fill="var(--fog)"
                fontSize="10"
                fontFamily="monospace"
              >
                RAG Pipeline
              </text>

              <line
                x1="115"
                y1="40"
                x2="145"
                y2="40"
                stroke="var(--fog)"
                strokeWidth="1.5"
                markerEnd="url(#arrowhead)"
              />

              <rect
                x="150"
                y="20"
                width="100"
                height="40"
                rx="8"
                fill="var(--terrain)"
                stroke="var(--accent)"
                strokeWidth="1.5"
                filter="drop-shadow(0 0 4px rgba(167, 139, 250, 0.4))"
              />
              <text
                x="200"
                y="45"
                textAnchor="middle"
                fill="var(--salt)"
                fontSize="10"
                fontFamily="monospace"
              >
                Evaluation
              </text>

              <line
                x1="255"
                y1="40"
                x2="285"
                y2="40"
                stroke="var(--fog)"
                strokeWidth="1.5"
              />

              <rect
                x="290"
                y="20"
                width="100"
                height="40"
                rx="8"
                fill="var(--terrain)"
                stroke="var(--cyan)"
                strokeWidth="1.5"
              />
              <text
                x="340"
                y="45"
                textAnchor="middle"
                fill="var(--cyan)"
                fontSize="10"
                fontFamily="monospace"
              >
                Dashboard
              </text>

              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="6"
                  markerHeight="6"
                  refX="5"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L6,3 L0,6" fill="var(--fog)" />
                </marker>
              </defs>
            </svg>
          </div>

          <div ref={rightRef} className="gpu-layer">
            <p className="font-mono text-xs uppercase tracking-wider text-cyan glow-cyan">
              Currently reading into
            </p>
            <ul className="mt-4 space-y-0">
              {INTERESTS.map((item) => (
                <li
                  key={item}
                  className="border-b border-ridge py-3 font-mono text-sm text-salt transition-colors duration-300 hover:text-cyan hover:border-cyan/50 hover:pl-2"
                  style={{ transitionProperty: "color, border-color, padding-left" }}
                >
                  <span className="text-cyan mr-2 opacity-50">→</span> {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-sm text-fog">
              Depth-first exploration. Always building toward the next breakthrough.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
