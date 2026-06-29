"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MetricPillProps {
  value: number | string;
  label: string;
  suffix?: string;
  decimals?: number;
}

export function MetricPill({
  value,
  label,
  suffix = "",
  decimals = 0,
}: MetricPillProps) {
  const pillRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const pill = pillRef.current;
    const numberEl = numberRef.current;
    if (!pill || !numberEl) return;

    if (typeof value === "string") {
      if (reduced) return;
      const trigger = ScrollTrigger.create({
        trigger: pill,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(
            numberEl,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.6 }
          );
        },
      });
      return () => trigger.kill();
    }

    const obj = { val: 0 };
    const finalVal = value;

    if (reduced) {
      numberEl.textContent = `${finalVal.toFixed(decimals)}${suffix}`;
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: pill,
      start: "top 85%",
      onEnter: () => {
        gsap.to(obj, {
          val: finalVal,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => {
            numberEl.textContent = `${obj.val.toFixed(decimals)}${suffix}`;
          },
        });
      },
    });

    return () => trigger.kill();
  }, [value, suffix, decimals, reduced]);

  const displayValue =
    typeof value === "string" ? value : `${(0).toFixed(decimals)}${suffix}`;

  return (
    <div
      ref={pillRef}
      className="rounded-lg border border-ridge bg-terrain px-5 py-4"
    >
      <span
        ref={numberRef}
        className="font-display text-2xl font-bold text-dusk-amber md:text-3xl"
      >
        {displayValue}
      </span>
      <p className="mt-1 font-mono text-xs text-fog">{label}</p>
    </div>
  );
}
