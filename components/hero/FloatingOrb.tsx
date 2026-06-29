"use client";

import {
  useRef,
  useMemo,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface FloatingOrbHandle {
  mesh: THREE.Group | null;
  rimLight: THREE.PointLight | null;
}

// Inner Core Shader
const coreVertexShader = `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vec3 pos = position;
  float displacement = sin(pos.x * 4.0 + uTime * 1.2) * 0.08
                     + sin(pos.y * 3.5 + uTime * 1.0) * 0.08;
  pos += normal * displacement;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vViewPosition = -mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`;

const coreFragmentShader = `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vViewPosition;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec3 baseColor = vec3(0.039, 0.086, 0.157); // Deep water base
  vec3 viewDir = normalize(vViewPosition);
  float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.5);
  vec3 rimColor = vec3(0.910, 0.529, 0.227); // Dusk amber

  float noise = hash(vNormal.xy + uTime * 0.1) * 0.05;
  vec3 color = baseColor + rimColor * fresnel * (0.8 + sin(uTime * 1.5) * 0.2);
  color += noise;

  gl_FragColor = vec4(color, 1.0);
}
`;

export const FloatingOrb = forwardRef<FloatingOrbHandle>(
  function FloatingOrb(_, ref) {
    const groupRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const wireframeRef1 = useRef<THREE.Mesh>(null);
    const wireframeRef2 = useRef<THREE.Mesh>(null);
    const rimLightRef = useRef<THREE.PointLight>(null);

    const { coreGeo, coreMat, wireGeo } = useMemo(() => {
      const cGeo = new THREE.SphereGeometry(1.2, 64, 64);
      const cMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: coreVertexShader,
        fragmentShader: coreFragmentShader,
      });

      // Icosahedron looks premium and geometric for wireframes
      const wGeo = new THREE.IcosahedronGeometry(1.4, 2);

      return { coreGeo: cGeo, coreMat: cMat, wireGeo: wGeo };
    }, []);

    useImperativeHandle(ref, () => ({
      get mesh() {
        return groupRef.current;
      },
      get rimLight() {
        return rimLightRef.current;
      },
    }));

    useEffect(() => {
      return () => {
        coreGeo.dispose();
        coreMat.dispose();
        wireGeo.dispose();
      };
    }, [coreGeo, coreMat, wireGeo]);

    useFrame((state) => {
      if (!groupRef.current || !coreRef.current || !wireframeRef1.current || !wireframeRef2.current) return;
      const time = state.clock.elapsedTime;

      // Update core shader
      const mat = coreRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = time;

      // Rotate group slightly
      groupRef.current.position.y = Math.sin(time * 0.6) * 0.1;

      // Core rotation
      coreRef.current.rotation.y += 0.004;
      coreRef.current.rotation.x += 0.002;

      // Complex wireframe rotations
      wireframeRef1.current.rotation.y -= 0.003;
      wireframeRef1.current.rotation.z += 0.002;
      wireframeRef1.current.scale.setScalar(1.0 + Math.sin(time * 0.8) * 0.05);

      wireframeRef2.current.rotation.x += 0.004;
      wireframeRef2.current.rotation.y += 0.001;
      wireframeRef2.current.scale.setScalar(1.0 + Math.cos(time * 0.7) * 0.06);
    });

    return (
      <group>
        <ambientLight intensity={0.1} />
        <pointLight position={[-3, 4, 2]} color="#ffffff" intensity={1.2} />
        <pointLight position={[3, 2, -2]} color="#38BDF8" intensity={0.6} />
        <pointLight
          ref={rimLightRef}
          position={[0, -2, 3]}
          color="#E8873A"
          intensity={0.8}
        />
        
        <group ref={groupRef} scale={0} position={[3, -4, 0]}>
          {/* Inner pulsating core */}
          <mesh ref={coreRef} geometry={coreGeo} material={coreMat} />
          
          {/* Outer geometric wireframes */}
          <mesh ref={wireframeRef1} geometry={wireGeo}>
            <meshBasicMaterial 
              color="#38BDF8" 
              wireframe 
              transparent 
              opacity={0.15} 
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <mesh ref={wireframeRef2} geometry={wireGeo}>
            <meshBasicMaterial 
              color="#E8873A" 
              wireframe 
              transparent 
              opacity={0.12} 
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Core glow aura */}
          <mesh scale={1.8}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial
              color="#E8873A"
              transparent
              opacity={0.03}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      </group>
    );
  }
);
