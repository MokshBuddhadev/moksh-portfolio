"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TerrainBackground } from "./TerrainBackground";
import { ParticleField, ParticleFieldHandle } from "./ParticleField";
import { FloatingOrb, FloatingOrbHandle } from "./FloatingOrb";

function HeroScene({
  orbRef,
  particlesRef,
}: {
  orbRef: React.RefObject<FloatingOrbHandle>;
  particlesRef: React.RefObject<ParticleFieldHandle>;
}) {
  return (
    <>
      <TerrainBackground />
      <ParticleField ref={particlesRef} />
      <Suspense fallback={null}>
        <FloatingOrb ref={orbRef} />
      </Suspense>
    </>
  );
}

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<FloatingOrbHandle>(null);
  const particlesRef = useRef<ParticleFieldHandle>(null);
  const reduced = useReducedMotion();
  const canvasReadyRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (reduced) {
      gsap.set(container, { opacity: 1 });
      const mesh = orbRef.current?.mesh;
      if (mesh) {
        gsap.set(mesh.scale, { x: 1, y: 1, z: 1 });
        gsap.set(mesh.position, { y: 0 });
      }
      const points = particlesRef.current?.getPoints();
      if (points) {
        (points.material as { opacity: number }).opacity = 0.5;
      }
      return;
    }

    gsap.set(container, { opacity: 0 });

    const playIntro = () => {
      if (!canvasReadyRef.current) return;

      const tl = gsap.timeline({ delay: 0.1 });

      tl.to(container, { opacity: 1, duration: 1.2, ease: "power2.out" });

      tl.call(
        () => {
          const mesh = orbRef.current?.mesh;
          if (!mesh) return;
          gsap.to(mesh.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 2,
            ease: "power3.out",
          });
          gsap.to(mesh.position, {
            y: 0,
            duration: 2,
            ease: "power3.out",
          });
        },
        undefined,
        0.3
      );

      tl.call(
        () => {
          const rimLight = orbRef.current?.rimLight;
          if (rimLight) {
            gsap.to(rimLight, {
              intensity: 1.5,
              duration: 1.2,
              ease: "power2.out",
            });
          }
        },
        undefined,
        1.0
      );

      tl.call(
        () => {
          const points = particlesRef.current?.getPoints();
          if (points) {
            gsap.to(points.material, {
              opacity: 0.5,
              duration: 1.5,
              ease: "power1.out",
            });
          }
        },
        undefined,
        1.8
      );
    };

    // Wait for preloader to complete before animating
    const onPreloaderComplete = () => {
      playIntro();
    };

    const onCanvasReady = () => {
      canvasReadyRef.current = true;
    };

    window.addEventListener("preloader-complete", onPreloaderComplete, { once: true });
    window.addEventListener("canvas-ready", onCanvasReady, { once: true });

    return () => {
      window.removeEventListener("preloader-complete", onPreloaderComplete);
      window.removeEventListener("canvas-ready", onCanvasReady);
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 opacity-0 will-change-[opacity]"
    >
      <Canvas
        camera={{ position: [0, 1.5, 6.5], fov: 50 }}
        dpr={[1, 1.2]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }}
        onCreated={() => {
          setTimeout(() => {
            canvasReadyRef.current = true;
            window.dispatchEvent(new Event("canvas-ready"));
          }, 100);
        }}
      >
        <HeroScene orbRef={orbRef} particlesRef={particlesRef} />
      </Canvas>
    </div>
  );
}
