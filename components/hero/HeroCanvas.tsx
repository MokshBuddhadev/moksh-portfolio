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

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(container, { opacity: 1, duration: 1, ease: "power2.out" });

    tl.call(
      () => {
        const mesh = orbRef.current?.mesh;
        if (!mesh) return;
        gsap.to(mesh.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1.8,
          ease: "power3.out",
        });
        gsap.to(mesh.position, {
          y: 0,
          duration: 1.8,
          ease: "power3.out",
        });
      },
      undefined,
      0.5
    );

    tl.call(
      () => {
        const rimLight = orbRef.current?.rimLight;
        if (rimLight) {
          gsap.to(rimLight, {
            intensity: 1.5,
            duration: 1,
            ease: "power2.out",
          });
        }
      },
      undefined,
      1.2
    );

    tl.call(
      () => {
        const points = particlesRef.current?.getPoints();
        if (points) {
          gsap.to(points.material, {
            opacity: 0.5,
            duration: 1.2,
            ease: "power1.out",
          });
        }
      },
      undefined,
      2.4
    );

    return () => {
      tl.kill();
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
          // Add a tiny delay to ensure first frame is painted
          setTimeout(() => {
            window.dispatchEvent(new Event("canvas-ready"));
          }, 100);
        }}
      >
        <HeroScene orbRef={orbRef} particlesRef={particlesRef} />
      </Canvas>
    </div>
  );
}
