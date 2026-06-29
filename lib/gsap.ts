import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Disable lag smoothing for smoother animations
  gsap.ticker.lagSmoothing(0);
  // Use requestAnimationFrame for smoother ticking
  gsap.ticker.fps(-1);
  // Default ease for smoother feel
  gsap.defaults({
    ease: "power3.out",
    overwrite: "auto",
  });
  // ScrollTrigger defaults for smoother scroll animations
  ScrollTrigger.defaults({
    toggleActions: "play none none reverse",
    start: "top 82%",
  });
}

export { gsap, ScrollTrigger };
