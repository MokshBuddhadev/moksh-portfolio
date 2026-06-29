"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function GreetingOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;

    if (!container || !title || !subtitle || !cta) return;

    if (reduced) {
      gsap.set([title, subtitle, cta], { opacity: 1, y: 0 });
      window.dispatchEvent(new Event("hero-navbar-show"));
      return;
    }

    // Masking setup
    const titleLines = title.querySelectorAll(".overflow-hidden > span");
    
    gsap.set(titleLines, { y: "120%" });
    gsap.set([subtitle, cta], { opacity: 0, y: 20 });

    const playAnimation = () => {
      const tl = gsap.timeline();

      tl.to(titleLines, {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
      });

      tl.to(subtitle, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");
      tl.to(cta, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

      tl.call(() => {
        window.dispatchEvent(new Event("hero-navbar-show"));
      });
    };

    window.addEventListener("preloader-complete", playAnimation, { once: true });

    return () => {
      window.removeEventListener("preloader-complete", playAnimation);
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-12 lg:px-24"
    >
      <div className="w-full max-w-5xl">
        <h1 ref={titleRef} className="font-display text-[15vw] font-black leading-[0.8] tracking-tighter text-text-primary md:text-[12vw]">
          Moksh<br />Buddhadev.
        </h1>
        
        <p
          ref={subtitleRef}
          className="mt-8 max-w-2xl font-mono text-sm leading-relaxed text-text-secondary md:text-base"
        >
          Building intelligent systems and pushing the boundaries of what&apos;s possible with AI. B.Tech CSE at MUJ.
        </p>
        
        <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="inline-block rounded-full bg-text-primary px-8 py-4 font-body text-sm font-semibold text-bg-primary transition-transform hover:scale-105"
          >
            Explore Work
          </a>
          <a
            href="/Moksh_Resume.pdf"
            download="Moksh_Buddhadev_Resume.pdf"
            className="inline-block rounded-full border border-border-light bg-transparent px-8 py-4 font-body text-sm font-medium text-text-primary transition-colors hover:bg-bg-secondary"
          >
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}
