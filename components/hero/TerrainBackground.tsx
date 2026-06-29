"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
uniform float uTime;
varying float vElevation;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float oceanWave = sin(modelPosition.x * 2.0 + uTime * 0.8) * 0.15
                  + sin(modelPosition.z * 1.5 + uTime * 0.6) * 0.1;

  float mountain = abs(sin(modelPosition.x * 1.2) * cos(modelPosition.z * 0.8)) * 0.8;

  float blend = smoothstep(-0.5, 0.5, modelPosition.z);
  modelPosition.y += mix(mountain, oceanWave, blend);

  vElevation = modelPosition.y;
  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
`;

const fragmentShader = `
uniform vec3 uOceanColor;
uniform vec3 uMountainColor;
uniform vec3 uPeakColor;
varying float vElevation;

void main() {
  vec3 color = mix(uOceanColor, uMountainColor, smoothstep(-0.2, 0.4, vElevation));
  color = mix(color, uPeakColor, smoothstep(0.3, 0.8, vElevation));
  gl_FragColor = vec4(color, 0.9);
}
`;

export function TerrainBackground() {
  const meshRef = useRef<THREE.Mesh>(null);

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 20, 128, 128);
    geo.rotateX(-Math.PI / 2);

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uOceanColor: { value: new THREE.Color("#0c0a1a") },
        uMountainColor: { value: new THREE.Color("#18181b") },
        uPeakColor: { value: new THREE.Color("#1e1b2e") },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    return { geometry: geo, material: mat };
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} position={[0, -1.5, 0]} />
  );
}
