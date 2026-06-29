"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="absolute left-0 top-0 h-px bg-dusk-amber transition-[width] duration-75"
      style={{ width: `${progress * 100}%` }}
      aria-hidden="true"
    />
  );
}

export function ScrollProgressBar() {
  return <ScrollProgress />;
}
