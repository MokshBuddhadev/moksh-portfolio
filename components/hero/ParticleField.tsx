"use client";

import { useRef, useMemo, useEffect, forwardRef, useImperativeHandle } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface ParticleFieldHandle {
  getPoints: () => THREE.Points | null;
}

function getParticleCount() {
  if (typeof window === "undefined") return 400;
  return window.innerWidth < 768 ? 250 : 400;
}

export const ParticleField = forwardRef<ParticleFieldHandle>(
  function ParticleField(_, ref) {
    const pointsRef = useRef<THREE.Points>(null);
    const basePositions = useRef<Float32Array | null>(null);
    const countRef = useRef(getParticleCount());

    const { geometry, material, phases } = useMemo(() => {
      const count = countRef.current;
      const positions = new Float32Array(count * 3);
      const phaseArr = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
        phaseArr[i] = Math.random() * Math.PI * 2;
      }

      basePositions.current = positions.slice();

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const mat = new THREE.PointsMaterial({
        color: "#a78bfa",
        size: 0.025,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        sizeAttenuation: true,
      });

      return { geometry: geo, material: mat, phases: phaseArr };
    }, []);

    useImperativeHandle(ref, () => ({
      getPoints: () => pointsRef.current,
    }));

    useEffect(() => {
      return () => {
        geometry.dispose();
        material.dispose();
      };
    }, [geometry, material]);

    useFrame((state) => {
      const points = pointsRef.current;
      const base = basePositions.current;
      if (!points || !base) return;

      const posAttr = points.geometry.attributes.position as THREE.BufferAttribute;
      const time = state.clock.elapsedTime;
      const count = countRef.current;

      for (let i = 0; i < count; i++) {
        posAttr.array[i * 3 + 1] =
          base[i * 3 + 1] + Math.sin(time + phases[i]) * 0.25;
      }
      posAttr.needsUpdate = true;
    });

    return (
      <points ref={pointsRef} geometry={geometry} material={material} />
    );
  }
);
