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
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.5)" }
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
          duration: 1.5, // Slower, smoother count
          ease: "power3.out",
          onUpdate: () => {
            numberEl.textContent = `${obj.val.toFixed(decimals)}${suffix}`;
          },
        });
        
        // Also animate the pill itself slightly
        gsap.fromTo(
          pill,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        );
      },
    });

    return () => trigger.kill();
  }, [value, suffix, decimals, reduced]);

  const displayValue =
    typeof value === "string" ? value : `${(0).toFixed(decimals)}${suffix}`;

  return (
    <div
      ref={pillRef}
      className="group relative overflow-hidden rounded-lg border border-ridge bg-terrain px-5 py-4 transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_15px_rgba(167,139,250,0.1)]"
    >
      {/* Shine effect on hover */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
      
      <span
        ref={numberRef}
        className="relative z-10 font-display text-2xl font-bold text-accent md:text-3xl"
      >
        {displayValue}
      </span>
      <p className="relative z-10 mt-1 font-mono text-xs text-fog group-hover:text-salt transition-colors">{label}</p>
    </div>
  );
}
