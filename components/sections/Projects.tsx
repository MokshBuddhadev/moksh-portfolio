"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/lib/projects-data";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (reduced) {
      gsap.set(track.children, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(track.children, { opacity: 0, y: 60 });
      
      ScrollTrigger.batch(track.children, {
        start: "top 85%",
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} id="projects" className="scroll-mt-32">
      <div className="mb-12">
        <h2 className="font-display text-4xl font-semibold leading-tight text-text-primary md:text-5xl">
          Selected Work
        </h2>
      </div>
      <div
        ref={trackRef}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.index} {...project} />
        ))}
      </div>
    </section>
  );
}
