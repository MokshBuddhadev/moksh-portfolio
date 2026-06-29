"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/lib/projects-data";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const track = trackRef.current;
    if (!section || !header || !track) return;

    if (reduced) {
      gsap.set([header, ...Array.from(track.children)], { opacity: 1, y: 0, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: section },
        }
      );

      gsap.fromTo(
        track.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: track, start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="bg-ink px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div ref={headerRef}>
          <h2 className="font-display text-4xl font-extrabold leading-tight text-salt md:text-5xl">
            Selected
            <br />
            Projects.
          </h2>
        </div>
        <div
          ref={trackRef}
          className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-8"
          style={{ willChange: "transform" }}
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
