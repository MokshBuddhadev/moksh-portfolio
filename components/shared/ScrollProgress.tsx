"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="absolute -bottom-px left-0 h-[2px] rounded-full transition-[width] duration-75"
      style={{
        width: `${progress * 100}%`,
        background: "linear-gradient(90deg, var(--accent), var(--cyan))",
        boxShadow: progress > 0 ? "0 0 8px rgba(167, 139, 250, 0.4)" : "none",
      }}
      aria-hidden="true"
    />
  );
}

export function ScrollProgressBar() {
  return <ScrollProgress />;
}
