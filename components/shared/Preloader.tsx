"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const topCurtain = topCurtainRef.current;
    const bottomCurtain = bottomCurtainRef.current;
    const logo = logoRef.current;
    const barFill = barFillRef.current;
    const counter = counterRef.current;
    if (!container || !topCurtain || !bottomCurtain || !logo || !barFill || !counter) return;

    document.body.style.overflow = "hidden";

    const paths = logo.querySelectorAll("path");
    const totalLength = 400;
    paths.forEach((path) => {
      path.style.strokeDasharray = `${totalLength}`;
      path.style.strokeDashoffset = `${totalLength}`;
    });

    const tl = gsap.timeline();

    // Phase 1: Draw the logo
    tl.to(paths, {
      strokeDashoffset: 0,
      duration: 1.4,
      stagger: 0.2,
      ease: "power2.inOut",
    });

    // Phase 2: Fill the logo
    tl.to(paths, {
      fill: "rgba(167, 139, 250, 1)",
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.3");

    // Phase 3: Loading bar
    const progress = { val: 0 };
    tl.to(progress, {
      val: 100,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => {
        barFill.style.transform = `scaleX(${progress.val / 100})`;
        counter.textContent = `${Math.round(progress.val)}`;
      },
    }, "-=0.4");

    // Phase 4: Scale logo up and fade
    tl.to(logo, {
      scale: 1.2,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    });

    tl.to([barRef.current, counter.parentElement], {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    }, "<");

    // Phase 5: Curtain reveal
    tl.to(topCurtain, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
    });
    tl.to(bottomCurtain, {
      yPercent: 100,
      duration: 0.8,
      ease: "power4.inOut",
    }, "<");

    // Phase 6: Complete
    tl.call(() => {
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("preloader-complete"));
      setDone(true);
    });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100]"
      style={{ pointerEvents: "auto" }}
    >
      {/* Top curtain */}
      <div
        ref={topCurtainRef}
        className="absolute left-0 top-0 h-1/2 w-full"
        style={{ background: "var(--ink)" }}
      />
      {/* Bottom curtain */}
      <div
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 h-1/2 w-full"
        style={{ background: "var(--ink)" }}
      />

      {/* Centered content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8">
        {/* Dot grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--accent) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            animation: "preloader-pulse 2s ease-in-out infinite",
          }}
        />

        {/* SVG Logo */}
        <svg
          ref={logoRef}
          viewBox="0 0 120 60"
          className="relative z-10 w-32 md:w-40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* M */}
          <path
            d="M10 50V15L30 35L50 15V50"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* B */}
          <path
            d="M65 50V10H85C92 10 97 15 97 22C97 27 94 30 90 31C95 32 99 36 99 42C99 49 94 50 87 50H65ZM75 28H83C87 28 89 25 89 22C89 19 87 17 83 17H75V28ZM75 43H85C89 43 91 40 91 37C91 34 89 32 85 32H75V43Z"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        {/* Loading bar */}
        <div className="relative z-10 flex w-48 flex-col items-center gap-3 md:w-56">
          <div
            ref={barRef}
            className="h-[2px] w-full overflow-hidden rounded-full"
            style={{ background: "var(--ridge)" }}
          >
            <div
              ref={barFillRef}
              className="h-full w-full origin-left rounded-full"
              style={{
                background: "linear-gradient(90deg, var(--accent), var(--cyan))",
                transform: "scaleX(0)",
              }}
            />
          </div>
          <span className="font-mono text-xs text-fog">
            <span ref={counterRef}>0</span>
            <span className="text-accent">%</span>
          </span>
        </div>
      </div>
    </div>
  );
}
