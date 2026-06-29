"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const counter = counterRef.current;
    if (!container || !counter) return;

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();

    const progress = { val: 0 };
    tl.to(progress, {
      val: 100,
      duration: 1.5,
      ease: "power3.inOut",
      onUpdate: () => {
        counter.textContent = `${Math.round(progress.val)}%`;
      },
    });

    tl.to(counter, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in",
    });

    tl.to(container, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
    }, "-=0.2");

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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary"
      style={{ pointerEvents: "auto" }}
    >
      <span
        ref={counterRef}
        className="font-display text-4xl font-semibold text-text-primary md:text-6xl"
      >
        0%
      </span>
    </div>
  );
}
