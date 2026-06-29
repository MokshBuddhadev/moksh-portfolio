"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";
import { fibonacciSphere } from "@/lib/utils";
import { SKILLS, SKILL_COLORS } from "@/lib/skills-data";
import type { SkillGroup } from "@/types";

interface SkillsCanvasProps {
  activeGroup: SkillGroup | "all";
  selectedSkill: string | null;
  onSkillSelect: (name: string) => void;
}

interface SkillOrbProps {
  name: string;
  group: SkillGroup;
  basePosition: [number, number, number];
  phase: number;
  speed: number;
  isHighlighted: boolean;
  isDimmed: boolean;
  onSelect: () => void;
}

export function SkillOrbMesh({
  name,
  group,
  basePosition,
  phase,
  speed,
  isHighlighted,
  isDimmed,
  onSelect,
}: SkillOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const targetScale = useRef(1);
  const color = SKILL_COLORS[group];

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.position.y =
      basePosition[1] +
      Math.sin(state.clock.elapsedTime * speed + phase) * 0.12;

    const desired = isHighlighted ? 1.5 : isDimmed ? 0.7 : 1;
    if (targetScale.current !== desired) {
      targetScale.current = desired;
      gsap.to(meshRef.current.scale, {
        x: desired,
        y: desired,
        z: desired,
        duration: 0.35,
        ease: "power2.out",
      });
    }

    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = isHighlighted ? 1 : isDimmed ? 0.15 : 0.4;
    mat.opacity = isDimmed ? 0.35 : 1;

    if (lightRef.current) {
      lightRef.current.intensity = isHighlighted ? 2.5 : 0;
    }
  });

  return (
    <group position={[basePosition[0], basePosition[1], basePosition[2]]}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerEnter={() => onSelect()}
      >
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          transparent
          opacity={1}
        />
      </mesh>
      <pointLight ref={lightRef} color="#E8873A" intensity={0} distance={3} />
      <Html
        center
        distanceFactor={8}
        style={{
          pointerEvents: "none",
          opacity: isDimmed ? 0.3 : isHighlighted ? 1 : 0.75,
          transition: "opacity 0.3s ease",
        }}
      >
        <span className="whitespace-nowrap font-mono text-[10px] text-salt">
          {name}
        </span>
      </Html>
    </group>
  );
}

function SkillOrbs({
  activeGroup,
  selectedSkill,
  onSkillSelect,
}: SkillsCanvasProps) {
  const positions = useMemo(
    () => fibonacciSphere(SKILLS.length, 2.2),
    []
  );

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 5, 5]} intensity={0.7} />
      {SKILLS.map((skill, i) => {
        const isHighlighted = selectedSkill === skill.name;
        const isDimmed =
          selectedSkill !== null && !isHighlighted
            ? true
            : activeGroup !== "all" && skill.group !== activeGroup;

        return (
          <SkillOrbMesh
            key={skill.name}
            name={skill.name}
            group={skill.group}
            basePosition={positions[i]}
            phase={i * 0.7}
            speed={0.4 + (i % 5) * 0.08}
            isHighlighted={isHighlighted}
            isDimmed={isDimmed}
            onSelect={() => onSkillSelect(skill.name)}
          />
        );
      })}
    </>
  );
}

export default function SkillsCanvas({
  activeGroup,
  selectedSkill,
  onSkillSelect,
}: SkillsCanvasProps) {
  return (
    <div className="h-[500px] w-full cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <SkillOrbs
          activeGroup={activeGroup}
          selectedSkill={selectedSkill}
          onSkillSelect={onSkillSelect}
        />
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.25}
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
