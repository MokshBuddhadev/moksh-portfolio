"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export function ScrollTriggerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    ScrollTrigger.defaults({
      toggleActions: "play none none reverse",
      start: "top 80%",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
