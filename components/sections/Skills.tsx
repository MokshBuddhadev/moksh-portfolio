"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SKILLS, SKILL_GROUPS, SKILL_GROUP_LABELS } from "@/lib/skills-data";

export function Skills() {
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
      gsap.set(track.children, { opacity: 0, y: 40 });

      gsap.to(track.children, {
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
    <section ref={sectionRef} id="skills" className="scroll-mt-32">
      <div className="mb-12">
        <h2 className="font-display text-4xl font-semibold leading-tight text-text-primary md:text-5xl">
          Technical Arsenal
        </h2>
      </div>

      <div ref={trackRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {SKILL_GROUPS.map((group) => {
          const groupSkills = SKILLS.filter((s) => s.group === group);
          return (
            <div key={group} className="bento-card p-8">
              <h3 className="font-display text-xl font-medium text-text-primary mb-6">
                {SKILL_GROUP_LABELS[group]}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {groupSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group relative cursor-default rounded-md border border-border-light bg-bg-secondary px-3 py-1.5 transition-colors hover:border-text-secondary hover:bg-bg-tertiary"
                  >
                    <span className="font-mono text-[13px] text-text-secondary group-hover:text-text-primary transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
