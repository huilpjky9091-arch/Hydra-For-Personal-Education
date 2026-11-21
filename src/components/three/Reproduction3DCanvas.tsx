import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CanvasStage } from './CanvasStage';
import { HydraModel3D } from './HydraModel3D';

interface Reproduction3DCanvasProps {
  mode: 'asexual' | 'sexual';
  progress: number; // 0..1
}

const ReproductionScene: React.FC<Reproduction3DCanvasProps> = ({ mode, progress }) => {
  const spermGroupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (spermGroupRef.current) {
      spermGroupRef.current.children.forEach((child, idx) => {
        const drift = ((t * 0.45 + idx * 0.22) % 1) * Math.max(0, progress - 0.35);
        child.position.x = 0.38 + drift * 1.1;
        child.position.y = 0.55 + Math.sin(t * 5 + idx) * 0.08;
      });
    }
  });

  // Asexual bud metrics
  const budScale = 0.2 + Math.min(0.85, progress * 0.95);
  const detachedOffset = progress > 0.78 ? ((progress - 0.78) / 0.22) * 0.95 : 0;
  const budTentacleGrowth = Math.max(0, Math.min(1, (progress - 0.42) / 0.38));

  // Sexual gonad metrics
  const gonadScale = Math.min(1, progress * 1.6);
  const cystProgress = Math.max(0, (progress - 0.62) / 0.38);

  return (
    <group position={[-0.2, -0.1, 0]}>
      <HydraModel3D showBud={false} scale={0.95} xrayMode={false} />

      {mode === 'asexual' && (
        <group
          position={[0.3 + detachedOffset, -0.35 - detachedOffset * 0.35, 0.1]}
          rotation={[0, 0.15, -0.82 + detachedOffset * 0.78]}
          scale={budScale}
        >
          {/* Developing Bud Body */}
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.14, 0.17, 0.72, 22]} />
            <meshPhysicalMaterial color="#bae6fd" transparent opacity={0.62} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.28, 0]}>
            <cylinderGeometry args={[0.085, 0.11, 0.66, 18]} />
            <meshStandardMaterial color="#f472b6" transparent opacity={0.78} />
          </mesh>
          {/* Bud Hypostome */}
          <mesh position={[0, 0.72, 0]}>
            <coneGeometry args={[0.14, 0.18, 18]} />
            <meshPhysicalMaterial color="#7dd3fc" transparent opacity={0.78} />
          </mesh>
          {/* Bud Growing Tentacles */}
          {budTentacleGrowth > 0.05 &&
            [0, 1, 2, 3, 4].map((bi) => {
              const a = (bi / 5) * Math.PI * 2;
              const len = 0.56 * budTentacleGrowth;
              return (
                <group
                  key={`b-t-${bi}`}
                  position={[Math.cos(a) * 0.12, 0.76, Math.sin(a) * 0.12]}
                  rotation={[Math.sin(a) * 0.9, 0, -Math.cos(a) * 0.9]}
                >
                  <mesh position={[0, len * 0.5, 0]}>
                    <cylinderGeometry args={[0.015, 0.032, len, 10]} />
                    <meshPhysicalMaterial color="#38bdf8" transparent opacity={0.8} />
                  </mesh>
                </group>
              );
            })}
          <Html position={[0.25, 0.5, 0]} center zIndexRange={[10, 0]}>
            <span className="rounded-full bg-pink-600 px-2.5 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap shadow">
              {progress > 0.8 ? 'New Clonal Hydra' : 'Developing Bud'}
            </span>
          </Html>
        </group>
      )}

      {mode === 'sexual' && (
        <group>
          {/* Conical Testes on Upper Body Column */}
          {gonadScale > 0.08 && (
            <group position={[0.28, 0.55, 0.06]} scale={gonadScale}>
              <mesh rotation={[0, 0, -Math.PI / 2]}>
                <coneGeometry args={[0.14, 0.24, 18]} />
                <meshPhysicalMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.45} />
              </mesh>
              <Html position={[0.32, 0.15, 0]} center zIndexRange={[10, 0]}>
                <span className="rounded-full bg-sky-700 px-2.5 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap shadow">
                  Testes (สร้างอสุจิ)
                </span>
              </Html>
            </group>
          )}

          {/* Swimming Sperm released during mid-phase */}
          {progress > 0.35 && progress < 0.78 && (
            <group ref={spermGroupRef}>
              {[0, 1, 2, 3, 4].map((si) => (
                <mesh key={si} position={[0.45, 0.55 + (si - 2) * 0.08, (si % 2) * 0.08]}>
                  <sphereGeometry args={[0.025, 8, 8]} />
                  <meshStandardMaterial color="#0284c7" emissive="#38bdf8" emissiveIntensity={0.9} />
                </mesh>
              ))}
            </group>
          )}

          {/* Rounded Ovary / Embryotheca on Lower Body Column */}
          {gonadScale > 0.08 && (
            <group
              position={[0.31 + cystProgress * 0.55, -0.35 - cystProgress * 0.55, 0.08]}
              scale={gonadScale}
            >
              <mesh>
                <sphereGeometry args={[0.22, 24, 24]} />
                <meshPhysicalMaterial
                  color={cystProgress > 0.2 ? '#9333ea' : '#f472b6'}
                  emissive={cystProgress > 0.2 ? '#6d28d9' : '#db2777'}
                  emissiveIntensity={0.35}
                />
              </mesh>
              {/* Protective Thorny Embryotheca Shell in late phase */}
              {cystProgress > 0.2 &&
                [0, 1, 2, 3, 4, 5, 6, 7].map((sp) => {
                  const a = (sp / 8) * Math.PI * 2;
                  return (
                    <mesh
                      key={sp}
                      position={[Math.cos(a) * 0.24, Math.sin(a) * 0.24, 0]}
                      rotation={[0, 0, a - Math.PI / 2]}
                    >
                      <coneGeometry args={[0.03, 0.11, 8]} />
                      <meshStandardMaterial color="#7c3aed" />
                    </mesh>
                  );
                })}
              <Html position={[0.38, -0.15, 0]} center zIndexRange={[10, 0]}>
                <span className="rounded-full bg-purple-700 px-2.5 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap shadow">
                  {cystProgress > 0.25 ? 'Embryotheca Cyst (ระยะจำศีล)' : 'Ovary & Egg (ไข่)'}
                </span>
              </Html>
            </group>
          )}
        </group>
      )}
    </group>
  );
};

export const Reproduction3DCanvas: React.FC<Reproduction3DCanvasProps> = ({ mode, progress }) => {
  return (
    <CanvasStage cameraPosition={[0.5, 0.65, 4.5]} fov={40} backgroundColor="#fdf4ff">
      <ReproductionScene mode={mode} progress={progress} />
      <OrbitControls enablePan={true} enableZoom={true} minDistance={2.4} maxDistance={7.4} />
    </CanvasStage>
  );
};
