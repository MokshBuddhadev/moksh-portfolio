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
  const reduced = useReducedMotion();
  const [activeGroup, setActiveGroup] = useState<SkillGroup | "all">("all");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const selected = SKILLS.find((s) => s.name === selectedSkill);

  const handleSkillSelect = useCallback((name: string) => {
    setSelectedSkill((prev) => (prev === name ? null : name));
  }, []);

  useEffect(() => {
    const tags = tagsRef.current;
    if (!tags) return;

    if (reduced) {
      gsap.set(tags.children, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        tags.children,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          duration: 0.45,
          ease: "power3.out",
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
        <h2 className="font-display text-4xl font-extrabold leading-tight text-salt md:text-5xl">
          What I work
          <br />
          with.
        </h2>

        {/* Category filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveGroup("all")}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-all duration-300 ${
              activeGroup === "all"
                ? "border-dusk-amber bg-dusk-amber/10 text-dusk-amber"
                : "border-ridge text-fog hover:border-shoreline hover:text-salt"
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
                  ? "border-shoreline bg-shoreline/10 text-shoreline"
                  : "border-ridge text-fog hover:border-shoreline hover:text-salt"
              }`}
              style={
                activeGroup === group
                  ? { borderColor: SKILL_COLORS[group], color: SKILL_COLORS[group] }
                  : undefined
              }
            >
              {SKILL_GROUP_LABELS[group]}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-ridge">
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
          className={`mt-4 overflow-hidden rounded-lg border border-ridge bg-terrain/50 transition-all duration-400 ${
            selected ? "max-h-24 opacity-100" : "max-h-0 border-transparent opacity-0"
          }`}
        >
          {selected && (
            <div className="flex items-center gap-4 px-5 py-4">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: SKILL_COLORS[selected.group] }}
              />
              <div>
                <p className="font-display text-sm font-bold text-salt">
                  {selected.name}
                </p>
                <p className="font-body text-xs text-fog">{selected.description}</p>
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
              className={`rounded border px-2.5 py-1.5 font-mono text-[11px] transition-all duration-300 ${
                selectedSkill === name
                  ? "scale-105 border-dusk-amber bg-dusk-amber/10 text-dusk-amber"
                  : "border-ridge bg-terrain text-shoreline hover:border-shoreline hover:bg-shoreline/5"
              }`}
              style={
                selectedSkill === name
                  ? undefined
                  : { borderColor: `${SKILL_COLORS[group]}33` }
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
