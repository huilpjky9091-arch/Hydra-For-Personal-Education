import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CanvasStage } from './CanvasStage';

interface Regeneration3DCanvasProps {
  progress: number; // 0..1 controlled by Timeline Slider
}

const RegenerationScene: React.FC<Regeneration3DCanvasProps> = ({ progress }) => {
  const fragmentRef = useRef<THREE.Group>(null);
  const sparkleRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (fragmentRef.current) {
      fragmentRef.current.rotation.y = Math.sin(t * 0.45) * 0.16;
    }
    if (sparkleRef.current) {
      sparkleRef.current.rotation.y = t * 0.55;
    }
  });

  // Stage computations along 0..1
  const separation = progress < 0.25 ? Math.min(1, progress / 0.2) : Math.max(0, 1 - (progress - 0.25) / 0.18);
  const showOldEnds = progress < 0.36;
  const oldEndsOpacity = progress < 0.2 ? 0.78 : Math.max(0, 0.78 - ((progress - 0.2) / 0.16) * 0.78);

  const reorgIntensity = progress >= 0.25 && progress < 0.85 ? Math.sin(((progress - 0.25) / 0.6) * Math.PI) : 0;
  const headGrowth = Math.max(0, Math.min(1, (progress - 0.48) / 0.45));
  const tentacleGrowth = Math.max(0, Math.min(1, (progress - 0.58) / 0.42));
  const basalGrowth = Math.max(0, Math.min(1, (progress - 0.42) / 0.4));

  // Before cut: intact full hydra; after cut: regenerating mid-column elongates into full hydra
  const midHeight = progress < 0.12 ? 1.1 : 0.95 + Math.max(0, progress - 0.35) * 0.65;

  return (
    <group ref={fragmentRef} position={[0, -0.1, 0]}>
      {/* Cut Plane Indicator Rings at early stage */}
      {progress > 0.04 && progress < 0.3 && (
        <>
          <mesh position={[0, 0.56, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.32, 0.46, 32]} />
            <meshBasicMaterial color="#dc2626" side={THREE.DoubleSide} transparent opacity={0.7} />
          </mesh>
          <mesh position={[0, -0.54, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.32, 0.46, 32]} />
            <meshBasicMaterial color="#dc2626" side={THREE.DoubleSide} transparent opacity={0.7} />
          </mesh>
        </>
      )}

      {/* Severed Original Head Fragment drifting away */}
      {showOldEnds && (
        <group position={[-separation * 1.15, 0.72 + separation * 0.45, 0]}>
          <mesh>
            <coneGeometry args={[0.26, 0.36, 20]} />
            <meshPhysicalMaterial color="#7dd3fc" transparent opacity={oldEndsOpacity} />
          </mesh>
          {[0, 1, 2, 3, 4].map((i) => {
            const a = (i / 5) * Math.PI * 2;
            return (
              <mesh
                key={i}
                position={[Math.cos(a) * 0.38, 0.2, Math.sin(a) * 0.38]}
                rotation={[Math.sin(a) * 0.9, 0, -Math.cos(a) * 0.9]}
              >
                <cylinderGeometry args={[0.02, 0.04, 0.75, 10]} />
                <meshPhysicalMaterial color="#7dd3fc" transparent opacity={oldEndsOpacity} />
              </mesh>
            );
          })}
        </group>
      )}

      {/* Severed Original Basal Fragment drifting away */}
      {showOldEnds && (
        <group position={[separation * 1.05, -0.78 - separation * 0.42, 0]}>
          <mesh>
            <cylinderGeometry args={[0.24, 0.42, 0.32, 24]} />
            <meshPhysicalMaterial color="#38bdf8" transparent opacity={oldEndsOpacity} />
          </mesh>
        </group>
      )}

      {/* CENTRAL REGENERATING MID-COLUMN FRAGMENT */}
      <group>
        {/* Epidermis */}
        <mesh>
          <cylinderGeometry args={[0.27, 0.25, midHeight, 28]} />
          <meshPhysicalMaterial
            color="#bae6fd"
            emissive="#0284c7"
            emissiveIntensity={0.1 + reorgIntensity * 0.25}
            transparent
            opacity={0.55}
            roughness={0.2}
          />
        </mesh>
        {/* Inner Gastrodermis */}
        <mesh>
          <cylinderGeometry args={[0.19, 0.17, midHeight * 0.92, 24]} />
          <meshStandardMaterial
            color="#f472b6"
            emissive="#db2777"
            emissiveIntensity={0.22 + reorgIntensity * 0.35}
            transparent
            opacity={0.72}
          />
        </mesh>

        {/* Active Stem Cell / Morphallaxis Sparkles (Epidermal + Gastrodermal + I-cells) */}
        {reorgIntensity > 0.05 && (
          <group ref={sparkleRef}>
            {Array.from({ length: 14 }).map((_, i) => {
              const a = (i / 14) * Math.PI * 2;
              const y = ((i % 5) - 2) * 0.22;
              return (
                <mesh key={i} position={[Math.cos(a) * 0.24, y, Math.sin(a) * 0.24]}>
                  <sphereGeometry args={[0.032, 10, 10]} />
                  <meshStandardMaterial
                    color={i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#0ea5e9' : '#ec4899'}
                    emissive={i % 3 === 0 ? '#7c3aed' : i % 3 === 1 ? '#0284c7' : '#db2777'}
                    emissiveIntensity={1.1}
                  />
                </mesh>
              );
            })}
          </group>
        )}

        {/* Regenerating Wnt Head Organizer & Hypostome */}
        {headGrowth > 0.02 && (
          <group position={[0, midHeight * 0.5 + headGrowth * 0.12, 0]} scale={[1, headGrowth, 1]}>
            <mesh>
              <coneGeometry args={[0.26, 0.34, 24]} />
              <meshPhysicalMaterial
                color="#38bdf8"
                emissive="#7c3aed"
                emissiveIntensity={0.2 + reorgIntensity * 0.55}
                transparent
                opacity={0.78}
              />
            </mesh>
            <Html position={[0.42, 0.18, 0]} center zIndexRange={[10, 0]}>
              <div className="rounded-full bg-purple-700/90 px-2 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap shadow">
                Wnt Head Organizer
              </div>
            </Html>
          </group>
        )}

        {/* Regenerating Tentacles */}
        {tentacleGrowth > 0.02 &&
          [0, 1, 2, 3, 4, 5].map((i) => {
            const a = (i / 6) * Math.PI * 2;
            const len = 0.95 * tentacleGrowth;
            return (
              <group
                key={`regen-t-${i}`}
                position={[Math.cos(a) * 0.22, midHeight * 0.5 + 0.06, Math.sin(a) * 0.22]}
                rotation={[Math.sin(a) * 0.95, 0, -Math.cos(a) * 0.95]}
              >
                <mesh position={[0, len * 0.5, 0]}>
                  <cylinderGeometry args={[0.018, 0.044, len, 12]} />
                  <meshPhysicalMaterial color="#7dd3fc" transparent opacity={0.8} />
                </mesh>
              </group>
            );
          })}

        {/* Regenerating Basal Disc */}
        {basalGrowth > 0.02 && (
          <mesh position={[0, -midHeight * 0.5 - 0.08 * basalGrowth, 0]}>
            <cylinderGeometry args={[0.24, 0.24 + 0.19 * basalGrowth, 0.18 * basalGrowth, 24]} />
            <meshPhysicalMaterial
              color="#0d9488"
              emissive="#14b8a6"
              emissiveIntensity={0.25}
              transparent
              opacity={0.8}
            />
          </mesh>
        )}
      </group>
    </group>
  );
};

export const Regeneration3DCanvas: React.FC<Regeneration3DCanvasProps> = ({ progress }) => {
  return (
    <CanvasStage cameraPosition={[0.5, 0.6, 4.3]} fov={40} backgroundColor="#f6f5ff">
      <RegenerationScene progress={progress} />
      <OrbitControls enablePan={true} enableZoom={true} minDistance={2.2} maxDistance={7.0} />
    </CanvasStage>
  );
};
