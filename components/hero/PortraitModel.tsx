"use client";

import {
  useRef,
  useMemo,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

export interface PortraitModelHandle {
  group: THREE.Group | null;
  rimLight: THREE.PointLight | null;
}

const vertexShader = `
uniform float uTime;
uniform float uDepthScale;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);

  vec3 pos = position;
  float wave = sin(pos.x * 4.0 + uTime * 0.6) * 0.015
             + sin(pos.y * 3.0 + uTime * 0.4) * 0.01;
  pos.z += wave;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vViewPosition = -mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vec4 tex = texture2D(uTexture, vUv);
  vec3 viewDir = normalize(vViewPosition);
  float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.5);
  vec3 rim = vec3(0.910, 0.529, 0.227) * fresnel * 0.35;
  vec3 fill = vec3(0.220, 0.741, 0.973) * fresnel * 0.08;
  vec3 color = tex.rgb + rim + fill;
  gl_FragColor = vec4(color, tex.a);
}
`;

export const PortraitModel = forwardRef<PortraitModelHandle>(
  function PortraitModel(_, ref) {
    const groupRef = useRef<THREE.Group>(null);
    const meshRef = useRef<THREE.Mesh>(null);
    const rimLightRef = useRef<THREE.PointLight>(null);
    const texture = useLoader(TextureLoader, "/moksh-portrait.png");

    const { geometry, material } = useMemo(() => {
      texture.colorSpace = THREE.SRGBColorSpace;

      const geo = new THREE.PlaneGeometry(1.8, 2.4, 48, 48);
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: texture },
          uTime: { value: 0 },
          uDepthScale: { value: 0.35 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
      });

      return { geometry: geo, material: mat };
    }, [texture]);

    useImperativeHandle(ref, () => ({
      get group() {
        return groupRef.current;
      },
      get rimLight() {
        return rimLightRef.current;
      },
    }));

    useEffect(() => {
      return () => {
        geometry.dispose();
        material.dispose();
      };
    }, [geometry, material]);

    useFrame((state) => {
      if (!meshRef.current || !groupRef.current) return;
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.elapsedTime;
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
    });

    return (
      <group ref={groupRef} position={[3.5, 0.2, 0]} scale={0}>
        <ambientLight intensity={0.15} />
        <pointLight position={[-2, 3, 4]} color="#ffffff" intensity={1.4} />
        <pointLight position={[2, 1, 3]} color="#38BDF8" intensity={0.5} />
        <pointLight
          ref={rimLightRef}
          position={[0, 0, 4]}
          color="#E8873A"
          intensity={0.6}
        />

        {/* Glow ring behind portrait */}
        <mesh position={[0, 0, -0.15]}>
          <ringGeometry args={[1.0, 1.35, 64]} />
          <meshBasicMaterial
            color="#E8873A"
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Portrait relief mesh */}
        <mesh ref={meshRef} geometry={geometry} material={material} />

        {/* Frame */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[1.95, 2.55]} />
          <meshBasicMaterial color="#243447" />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[1.86, 2.46]} />
          <meshBasicMaterial
            color="#E8873A"
            transparent
            opacity={0.15}
            wireframe
          />
        </mesh>
      </group>
    );
  }
);
