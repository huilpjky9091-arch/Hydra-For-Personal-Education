import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CanvasStage } from './CanvasStage';
import { HydraModel3D } from './HydraModel3D';

const FreshwaterMotes: React.FC = () => {
  const meshRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 90;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Deterministic pseudo-random distribution around specimen
      const angle = i * 2.39996;
      const r = 1.1 + ((i * 17) % 100) * 0.025;
      const y = -1.3 + ((i * 31) % 100) * 0.036;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(angle) * r;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        color="#0ea5e9"
        transparent
        opacity={0.42}
        sizeAttenuation
      />
    </points>
  );
};

interface HeroHydraCanvasProps {
  xrayMode: boolean;
  autoRotate: boolean;
  onSelectQuickPart?: (partId: string) => void;
}

export const HeroHydraCanvas: React.FC<HeroHydraCanvasProps> = ({
  xrayMode,
  autoRotate,
  onSelectQuickPart,
}) => {
  return (
    <CanvasStage eager cameraPosition={[0.55, 0.72, 5.65]} fov={41} backgroundColor="#f4faff">
      <FreshwaterMotes />
      <HydraModel3D
        xrayMode={xrayMode}
        showBud={true}
        position={[0, -0.32, 0]}
        scale={1.0}
        onSelectPart={onSelectQuickPart}
      />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={autoRotate}
        autoRotateSpeed={0.65}
        minDistance={2.4}
        maxDistance={9.0}
        target={[0, 0.25, 0]}
      />
    </CanvasStage>
  );
};
