"use client";

import { useEffect, useRef, useState } from "react";

export function CursorTrail() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const glowPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);
  const isHovering = useRef(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setMounted(true);
    document.documentElement.classList.add("no-native-cursor");

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      // Smoother follow with graduated easing
      dotPos.current.x = lerp(dotPos.current.x, mouse.current.x, 0.28);
      dotPos.current.y = lerp(dotPos.current.y, mouse.current.y, 0.28);

      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.14);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.14);

      glowPos.current.x = lerp(glowPos.current.x, mouse.current.x, 0.08);
      glowPos.current.y = lerp(glowPos.current.y, mouse.current.y, 0.08);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(${isHovering.current ? 1.8 : 1})`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowPos.current.x}px, ${glowPos.current.y}px) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnterInteractive = () => {
      isHovering.current = true;
      if (ringRef.current) {
        ringRef.current.style.borderColor = "rgba(167, 139, 250, 0.6)";
        ringRef.current.style.backgroundColor = "rgba(167, 139, 250, 0.06)";
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%) scale(0.6)`;
      }
    };

    const onLeaveInteractive = () => {
      isHovering.current = false;
      if (ringRef.current) {
        ringRef.current.style.borderColor = "rgba(167, 139, 250, 0.5)";
        ringRef.current.style.backgroundColor = "transparent";
      }
    };

    const bindInteractive = () => {
      document.querySelectorAll("a, button, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);
    bindInteractive();

    const observer = new MutationObserver(bindInteractive);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      document.documentElement.classList.remove("no-native-cursor");
      document.querySelectorAll("a, button, [role='button']").forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Soft glow that trails behind */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9997]"
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)",
          willChange: "transform",
          mixBlendMode: "screen",
        }}
        aria-hidden="true"
      />
      {/* Outer ring with smooth follow */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1.5px solid rgba(167, 139, 250, 0.5)",
          transition: "border-color 0.3s ease, background-color 0.3s ease, width 0.3s ease, height 0.3s ease",
          willChange: "transform",
        }}
        aria-hidden="true"
      />
      {/* Inner dot — snappy follow */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "#a78bfa",
          boxShadow: "0 0 8px rgba(167, 139, 250, 0.6), 0 0 20px rgba(167, 139, 250, 0.2)",
          willChange: "transform",
          transition: "transform 0.15s ease",
        }}
        aria-hidden="true"
      />
    </>
  );
}
