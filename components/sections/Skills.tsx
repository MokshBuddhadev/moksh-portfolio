"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  SKILLS,
  SKILL_GROUPS,
  SKILL_GROUP_LABELS,
  SKILL_COLORS,
} from "@/lib/skills-data";
import type { SkillGroup } from "@/types";

const SkillsCanvas = dynamic(
  () => import("@/components/sections/SkillsCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] w-full rounded-xl bg-deep-water" />
    ),
  }
);

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [activeGroup, setActiveGroup] = useState<SkillGroup | "all">("all");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const selected = SKILLS.find((s) => s.name === selectedSkill);

  const handleSkillSelect = useCallback((name: string) => {
    setSelectedSkill((prev) => (prev === name ? null : name));
  }, []);

  useEffect(() => {
    const tags = tagsRef.current;
    const header = headerRef.current;
    if (!tags || !header) return;

    if (reduced) {
      gsap.set([header, ...Array.from(tags.children)], { opacity: 1, y: 0 });
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
        tags.children,
        { opacity: 0, scale: 0.9, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.6,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: tags, start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="bg-deep-water px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div ref={headerRef} className="gpu-layer">
          <h2 className="font-display text-4xl font-extrabold leading-tight text-salt md:text-5xl">
            What I work
            <br />
            with.
          </h2>
        </div>

        {/* Category filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveGroup("all")}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-all duration-300 ${
              activeGroup === "all"
                ? "border-accent bg-accent/10 text-accent glow-accent"
                : "border-ridge text-fog hover:border-accent hover:text-salt"
            }`}
          >
            All
          </button>
          {SKILL_GROUPS.map((group) => (
            <button
              key={group}
              type="button"
              onClick={() => setActiveGroup(group)}
              className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-all duration-300 ${
                activeGroup === group
                  ? "border-current bg-current bg-opacity-10"
                  : "border-ridge text-fog hover:border-current hover:text-salt"
              }`}
              style={
                activeGroup === group
                  ? { 
                      borderColor: SKILL_COLORS[group], 
                      color: SKILL_COLORS[group],
                      backgroundColor: `${SKILL_COLORS[group]}22`,
                      boxShadow: `0 0 15px ${SKILL_COLORS[group]}33`
                    }
                  : {
                      '--tw-hover-border-opacity': '1',
                      '--tw-hover-border-color': SKILL_COLORS[group],
                      '--tw-hover-text-color': '#fafafa'
                    } as React.CSSProperties
              }
            >
              {SKILL_GROUP_LABELS[group]}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-ridge relative glass">
          <Suspense
            fallback={
              <div className="h-[500px] w-full rounded-xl bg-terrain" />
            }
          >
            <SkillsCanvas
              activeGroup={activeGroup}
              selectedSkill={selectedSkill}
              onSkillSelect={handleSkillSelect}
            />
          </Suspense>
        </div>

        {/* Selected skill detail */}
        <div
          className={`mt-4 overflow-hidden rounded-lg border bg-terrain/50 transition-all duration-500 ease-out ${
            selected ? "max-h-28 opacity-100 border-ridge shadow-lg" : "max-h-0 border-transparent opacity-0"
          }`}
          style={{
            borderColor: selected ? `${SKILL_COLORS[selected.group]}55` : 'transparent',
            boxShadow: selected ? `0 4px 20px ${SKILL_COLORS[selected.group]}15` : 'none'
          }}
        >
          {selected && (
            <div className="flex items-center gap-4 px-5 py-4">
              <span
                className="h-3 w-3 shrink-0 rounded-full glow-accent"
                style={{ backgroundColor: SKILL_COLORS[selected.group], boxShadow: `0 0 10px ${SKILL_COLORS[selected.group]}` }}
              />
              <div>
                <p className="font-display text-sm font-bold text-salt">
                  {selected.name}
                </p>
                <p className="font-body text-xs text-fog mt-0.5">{selected.description}</p>
              </div>
            </div>
          )}
        </div>

        <div ref={tagsRef} className="mt-8 flex flex-wrap gap-2">
          {SKILLS.filter(
            (s) => activeGroup === "all" || s.group === activeGroup
          ).map(({ name, group }) => (
            <button
              key={name}
              type="button"
              onClick={() => handleSkillSelect(name)}
              onMouseEnter={() => setSelectedSkill(name)}
              className={`rounded-md border px-3 py-1.5 font-mono text-[11px] transition-all duration-300 ${
                selectedSkill === name
                  ? "scale-105 shadow-md"
                  : "border-ridge bg-terrain hover:border-current hover:bg-current hover:bg-opacity-5"
              }`}
              style={
                selectedSkill === name
                  ? { 
                      borderColor: SKILL_COLORS[group], 
                      backgroundColor: `${SKILL_COLORS[group]}22`,
                      color: SKILL_COLORS[group],
                      boxShadow: `0 0 15px ${SKILL_COLORS[group]}33`
                    }
                  : { 
                      borderColor: `${SKILL_COLORS[group]}33`,
                      color: 'var(--salt)',
                      '--tw-hover-border-color': SKILL_COLORS[group],
                      '--tw-hover-bg-color': `${SKILL_COLORS[group]}11`
                    } as React.CSSProperties
              }
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
