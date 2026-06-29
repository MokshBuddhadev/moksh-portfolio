"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LINE_ONE = [
  { text: "hey,", accent: false },
  { text: "I'm", accent: false },
  { text: "Moksh", accent: false },
  { text: "—", accent: false },
];

const LINE_TWO = [
  { text: "AI/ML", accent: false },
  { text: "engineer.", accent: false },
];

const LINE_THREE = [
  { text: "I", accent: false },
  { text: "build", accent: false },
  { text: "systems", accent: false },
  { text: "that", accent: false },
  { text: "think.", accent: true },
];

interface GreetingOverlayProps {
  onIntroComplete?: () => void;
}

export function GreetingOverlay({ onIntroComplete }: GreetingOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const words = overlayRef.current?.querySelectorAll(".greeting-word");
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const chevron = chevronRef.current;
    if (!words || !subtitle || !cta) return;

    if (reduced) {
      gsap.set(words, { opacity: 1, y: 0 });
      gsap.set([subtitle, cta, chevron], { opacity: 1 });
      document.body.style.overflow = "";
      onIntroComplete?.();
      window.dispatchEvent(new Event("hero-navbar-show"));
      return;
    }

    document.body.style.overflow = "hidden";

    gsap.set(words, { opacity: 0, y: 16 });
    gsap.set([subtitle, cta], { opacity: 0, y: 10 });
    if (chevron) gsap.set(chevron, { opacity: 0 });

    const playAnimation = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          onIntroComplete?.();
        },
      });

      tl.to(words, {
        opacity: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.45,
        ease: "power3.out",
      }, 0.5); // Start slightly after canvas fades in

      tl.to(subtitle, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 1.8);
      tl.to(cta.children, {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.45,
        ease: "power2.out",
      }, 1.9);

      if (chevron) {
        tl.to(chevron, { opacity: 1, duration: 0.5, ease: "power2.out" }, 2.6);
      }

      tl.call(() => {
        window.dispatchEvent(new Event("hero-navbar-show"));
      }, undefined, 2.3);
    };

    window.addEventListener("canvas-ready", playAnimation, { once: true });

    return () => {
      window.removeEventListener("canvas-ready", playAnimation);
      document.body.style.overflow = "";
    };
  }, [reduced, onIntroComplete]);

  const renderLine = (words: typeof LINE_ONE, key: string) => (
    <span key={key} className="block">
      {words.map(({ text, accent }, i) => (
        <span
          key={`${text}-${i}`}
          className={`greeting-word mr-[0.3em] inline-block ${
            accent ? "text-dusk-amber" : ""
          }`}
        >
          {text}
        </span>
      ))}
    </span>
  );

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none absolute inset-0 z-10 flex items-end px-6 pb-20 md:px-10 md:pb-28 lg:px-16"
    >
      <div className="w-full max-w-xl lg:max-w-lg">
        <h1 className="font-display text-[2rem] font-extrabold leading-[1.15] text-salt sm:text-4xl md:text-[2.5rem] lg:text-5xl">
          {renderLine(LINE_ONE, "l1")}
          {renderLine(LINE_TWO, "l2")}
          {renderLine(LINE_THREE, "l3")}
        </h1>
        <p
          ref={subtitleRef}
          className="mt-3 font-mono text-xs text-fog opacity-0 sm:text-sm"
        >
          B.Tech CSE · MUJ 2027 · AI/ML · GenAI
        </p>
        <div ref={ctaRef} className="mt-5 flex flex-wrap gap-3 opacity-0">
          <a
            href="#projects"
            className="pointer-events-auto inline-block rounded-lg bg-dusk-amber px-5 py-2.5 font-mono text-xs font-medium text-ink transition-transform hover:scale-[1.02] sm:text-sm"
          >
            See my work ↓
          </a>
          <a
            href="/Moksh_Resume.pdf"
            download="Moksh_Buddhadev_Resume.pdf"
            className="pointer-events-auto inline-block rounded-lg border border-ridge bg-terrain/80 px-5 py-2.5 font-mono text-xs text-salt backdrop-blur-sm transition-colors hover:border-shoreline sm:text-sm"
          >
            Download resume ↓
          </a>
        </div>
      </div>

      <div
        ref={chevronRef}
        className="chevron-pulse absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0"
        aria-hidden="true"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 9l6 6 6-6"
            stroke="var(--shoreline)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
