import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface ParticlesProps {
  count?: number;
  color?: string;
  size?: number;
}

function Particles({
  count = 2000,
  color = "#FF007F",
  size = 0.012,
}: ParticlesProps) {
  const { viewport } = useThree();
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random positions for particles
  const positions = useRef<Float32Array>();
  const speeds = useRef<Float32Array>();

  if (!positions.current) {
    positions.current = new Float32Array(count * 3);
    speeds.current = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions.current[i3] = (Math.random() - 0.5) * 10;
      positions.current[i3 + 1] = (Math.random() - 0.5) * 10;
      positions.current[i3 + 2] = (Math.random() - 0.5) * 10;
      speeds.current[i] = Math.random() * 0.01;
    }
  }

  useFrame((state) => {
    if (!pointsRef.current || !positions.current || !speeds.current) return;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions.current[i3 + 1] += speeds.current[i];

      // Reset particles that go out of bounds
      if (positions.current[i3 + 1] > viewport.height) {
        positions.current[i3] = (Math.random() - 0.5) * 10;
        positions.current[i3 + 1] = -viewport.height;
        positions.current[i3 + 2] = (Math.random() - 0.5) * 10;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} limit={8000}>
      <PointMaterial
        transparent
        size={size}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color={color}
      />
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
    </Points>
  );
}

function GridLines() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    gridRef.current.rotation.x =
      Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    gridRef.current.rotation.z =
      Math.cos(state.clock.getElapsedTime() * 0.1) * 0.1;
  });

  return null; // disable grid for performance
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 bg-[#0D0D0D] -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[0.75, 1]}>
        <ambientLight intensity={0.2} />
        <Particles />
        <GridLines />
      </Canvas>
    </div>
  );
}
