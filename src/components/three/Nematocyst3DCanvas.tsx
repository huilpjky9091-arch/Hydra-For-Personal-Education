import React, { useMemo, useRef } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CanvasStage } from './CanvasStage';
import type { NematocystPart, NematocystTypeInfo } from '../../data/nematocystData';

interface Nematocyst3DCanvasProps {
  progress: number; // 0..1 simulation progress
  selectedPart: NematocystPart['id'] | null;
  onSelectPart: (id: NematocystPart['id']) => void;
  nematocystType: NematocystTypeInfo['id'];
  showLabels: boolean;
}

const NematocystScene: React.FC<Nematocyst3DCanvasProps> = ({
  progress,
  selectedPart,
  onSelectPart,
  nematocystType,
  showLabels,
}) => {
  const toxinGroupRef = useRef<THREE.Group>(null);
  const coilRef = useRef<THREE.Group>(null);

  // Derived animation phases
  const detectionAmt = Math.min(1, progress / 0.18);
  const activationAmt = Math.max(0, Math.min(1, (progress - 0.16) / 0.18));
  const dischargeAmt = Math.max(0, Math.min(1, (progress - 0.34) / 0.24));
  const engageAmt = Math.max(0, Math.min(1, (progress - 0.56) / 0.18));
  const toxinAmt = Math.max(0, Math.min(1, (progress - 0.72) / 0.18));
  const immobileAmt = Math.max(0, Math.min(1, (progress - 0.88) / 0.12));

  // Cutaway geometries for Cnidocyte & Nematocyst Capsule cross-section
  const geometries = useMemo(() => {
    const cellPts: THREE.Vector2[] = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const angle = -Math.PI * 0.5 + t * Math.PI * 0.94;
      const r = Math.max(0.06, Math.cos(angle) * 0.95);
      const y = Math.sin(angle) * 1.15 - 0.12;
      cellPts.push(new THREE.Vector2(r, y));
    }

    const capPts: THREE.Vector2[] = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      const angle = -Math.PI * 0.5 + t * Math.PI * 0.9;
      const r = Math.max(0.05, Math.cos(angle) * 0.54);
      const y = Math.sin(angle) * 0.76 - 0.08;
      capPts.push(new THREE.Vector2(r, y));
    }

    return {
      cnidocyteCut: new THREE.LatheGeometry(cellPts, 36, 0.55, Math.PI * 1.48),
      capsuleCut: new THREE.LatheGeometry(capPts, 32, 0.55, Math.PI * 1.48),
    };
  }, []);

  React.useEffect(() => {
    return () => {
      geometries.cnidocyteCut.dispose();
      geometries.capsuleCut.dispose();
    };
  }, [geometries]);

  // Everting shaft + extended tubule geometry
  const tubuleLength = dischargeAmt * 1.68;
  const cnidocilTilt = -0.15 - detectionAmt * 0.42;
  const operculumOpenAngle = dischargeAmt > 0.02 ? -Math.min(1.9, dischargeAmt * 3.8) : 0;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (coilRef.current) {
      coilRef.current.rotation.y = t * 0.4;
    }
    if (toxinGroupRef.current && nematocystType === 'stenotele') {
      toxinGroupRef.current.children.forEach((child, i) => {
        if (toxinAmt > 0) {
          const offset = ((t * 1.2 + i * 0.25) % 1) * toxinAmt;
          child.position.y = 2.15 + offset * 0.55;
          child.position.x = Math.sin(i * 2.1 + offset * 4) * 0.18 * offset;
          child.position.z = Math.cos(i * 1.7 + offset * 4) * 0.18 * offset;
          child.scale.setScalar(1 - offset * 0.35);
        }
      });
    }
  });

  const handleClick = (id: NematocystPart['id']) => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelectPart(id);
  };

  const isSelected = (id: NematocystPart['id']) => selectedPart === id;

  // Prey surface moves in during Step 01 and immobilizes in Step 06
  const preyX = 0.65 - detectionAmt * 0.52;
  const preyY = 2.18 + Math.sin(progress * 20) * (1 - immobileAmt) * 0.02;

  return (
    <group position={[0, -0.55, 0]}>
      {/* Supporting Tentacle Epidermis Base */}
      <mesh position={[0, -1.26, 0]}>
        <cylinderGeometry args={[1.45, 1.55, 0.22, 36]} />
        <meshStandardMaterial color="#e0f2fe" roughness={0.65} />
      </mesh>

      {/* 1. CNIDOCYTE (Translucent Cross-Section Host Cell) */}
      <mesh
        geometry={geometries.cnidocyteCut}
        onClick={handleClick('cnidocyte')}
      >
        <meshPhysicalMaterial
          color={isSelected('cnidocyte') ? '#38bdf8' : '#bae6fd'}
          emissive={isSelected('cnidocyte') ? '#0284c7' : '#0369a1'}
          emissiveIntensity={isSelected('cnidocyte') ? 0.5 : 0.08}
          transparent
          opacity={0.44}
          roughness={0.18}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Crescent Nucleus pushed to bottom-left of Cnidocyte */}
      <mesh position={[-0.45, -0.74, -0.22]} onClick={handleClick('cnidocyte')}>
        <sphereGeometry args={[0.21, 20, 20]} />
        <meshStandardMaterial color="#7c3aed" emissive="#6d28d9" emissiveIntensity={0.35} />
      </mesh>

      {/* 2. NEMATOCYST CAPSULE (Double-walled Pressurized Organelle) */}
      <mesh
        geometry={geometries.capsuleCut}
        onClick={handleClick('capsule')}
      >
        <meshPhysicalMaterial
          color={
            isSelected('capsule')
              ? '#ef4444'
              : activationAmt > 0.1
              ? '#f97316'
              : '#fb923c'
          }
          emissive={
            isSelected('capsule')
              ? '#dc2626'
              : activationAmt > 0.1
              ? '#ea580c'
              : '#9a3412'
          }
          emissiveIntensity={isSelected('capsule') ? 0.7 : 0.15 + activationAmt * 0.85}
          transparent
          opacity={0.65}
          roughness={0.22}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Osmotic Pressure Waves inside Capsule during Activation */}
      {activationAmt > 0.05 && dischargeAmt < 0.7 && (
        <mesh position={[0, -0.08, 0]}>
          <sphereGeometry args={[0.42 * (0.6 + activationAmt * 0.4), 24, 24]} />
          <meshBasicMaterial
            color="#ef4444"
            transparent
            opacity={0.25 * activationAmt * (1 - dischargeAmt)}
          />
        </mesh>
      )}

      {/* 3. COILED TUBULE INSIDE CAPSULE (Shrinks as it everts!) */}
      <group
        ref={coilRef}
        scale={[1, Math.max(0.08, 1 - dischargeAmt * 0.92), 1]}
        position={[0, -0.05 - dischargeAmt * 0.3, 0]}
        onClick={handleClick('tubule')}
      >
        {[-0.36, -0.22, -0.08, 0.06, 0.2, 0.34].map((ry, idx) => (
          <mesh key={idx} position={[0, ry, 0]} rotation={[Math.PI / 2, 0, idx * 0.4]}>
            <torusGeometry args={[0.31 - Math.abs(ry) * 0.28, 0.036, 12, 28]} />
            <meshStandardMaterial
              color={isSelected('tubule') ? '#f97316' : '#dc2626'}
              emissive="#b91c1c"
              emissiveIntensity={isSelected('tubule') ? 0.95 : 0.45}
            />
          </mesh>
        ))}
      </group>

      {/* 4. OPERCULUM (Hinged Capsule Lid) */}
      <group position={[-0.24, 0.63, 0]} rotation={[0, 0, -operculumOpenAngle]}>
        <mesh position={[0.24, 0.03, 0]} onClick={handleClick('operculum')}>
          <cylinderGeometry args={[0.24, 0.26, 0.07, 24]} />
          <meshStandardMaterial
            color={isSelected('operculum') ? '#fbbf24' : '#f59e0b'}
            emissive="#d97706"
            emissiveIntensity={isSelected('operculum') ? 0.9 : 0.35}
          />
        </mesh>
      </group>

      {/* 5. CNIDOCIL (Mechanosensory Trigger Hair) */}
      <group position={[0.42, 0.88, 0.14]} rotation={[0, 0, cnidocilTilt]}>
        <mesh position={[0, 0.28, 0]} onClick={handleClick('cnidocil')}>
          <coneGeometry args={[0.048, 0.62, 16]} />
          <meshStandardMaterial
            color={isSelected('cnidocil') ? '#14b8a6' : '#0d9488'}
            emissive={detectionAmt > 0.1 ? '#14b8a6' : '#0f766e'}
            emissiveIntensity={isSelected('cnidocil') ? 0.95 : 0.3 + detectionAmt * 0.6}
          />
        </mesh>
      </group>

      {/* DISCHARGED EVERTING TUBULE + TYPE-SPECIFIC MECHANISM */}
      {dischargeAmt > 0.01 && (
        <group position={[0, 0.62, 0]} onClick={handleClick('tubule')}>
          {/* Main Shaft */}
          <mesh position={[0, tubuleLength * 0.5, 0]}>
            <cylinderGeometry args={[0.036, 0.075, tubuleLength, 16]} />
            <meshStandardMaterial
              color="#ea580c"
              emissive="#dc2626"
              emissiveIntensity={0.65}
            />
          </mesh>

          {/* Type 1: Stenotele 3 Stylet Barbs + Toxin Injection */}
          {nematocystType === 'stenotele' && (
            <>
              {[0, 1, 2].map((b) => {
                const ba = (b / 3) * Math.PI * 2;
                const barbY = Math.min(tubuleLength * 0.88, 1.32);
                return (
                  <mesh
                    key={`barb-${b}`}
                    position={[Math.cos(ba) * 0.11, barbY, Math.sin(ba) * 0.11]}
                    rotation={[Math.sin(ba) * 0.9, 0, -Math.cos(ba) * 0.9]}
                  >
                    <coneGeometry args={[0.042, 0.24, 10]} />
                    <meshStandardMaterial color="#b91c1c" emissive="#ef4444" emissiveIntensity={0.7} />
                  </mesh>
                );
              })}

              {/* Toxin Droplets inside Prey Tissue (Step 05) */}
              {toxinAmt > 0.05 && (
                <group ref={toxinGroupRef}>
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((ti) => (
                    <mesh key={`tox-${ti}`} position={[0, 1.55, 0]}>
                      <sphereGeometry args={[0.045, 10, 10]} />
                      <meshStandardMaterial
                        color="#dc2626"
                        emissive="#ef4444"
                        emissiveIntensity={1.1}
                      />
                    </mesh>
                  ))}
                </group>
              )}
            </>
          )}

          {/* Type 2: Desmoneme Coiling Lasso (NO TOXIN) */}
          {nematocystType === 'desmoneme' && engageAmt > 0.05 && (
            <group position={[0, tubuleLength, 0]}>
              {[0, 1, 2, 3].map((li) => (
                <mesh
                  key={`loop-${li}`}
                  position={[0, li * 0.08 * engageAmt, 0]}
                  rotation={[Math.PI / 2 + li * 0.18, li * 0.25, 0]}
                >
                  <torusGeometry args={[0.19 - li * 0.015, 0.024, 10, 24]} />
                  <meshStandardMaterial color="#f97316" emissive="#ea580c" emissiveIntensity={0.6} />
                </mesh>
              ))}
            </group>
          )}

          {/* Type 3 & 4: Isorhiza Adhesive / Micro-spined Thread (NO TOXIN) */}
          {(nematocystType === 'holotrichous' || nematocystType === 'atrichous') &&
            engageAmt > 0.05 && (
              <group position={[0, tubuleLength, 0]}>
                <mesh>
                  <sphereGeometry args={[0.16 * engageAmt, 16, 16]} />
                  <meshPhysicalMaterial
                    color={nematocystType === 'holotrichous' ? '#0284c7' : '#14b8a6'}
                    emissive={nematocystType === 'holotrichous' ? '#0369a1' : '#0d9488'}
                    emissiveIntensity={0.55}
                    transparent
                    opacity={0.75}
                  />
                </mesh>
              </group>
            )}
        </group>
      )}

      {/* TARGET PREY CUTICLE / BRISTLE AT TOP */}
      <group position={[preyX, preyY, 0]}>
        <mesh rotation={[0, 0, 0.25]}>
          <capsuleGeometry args={[0.28, 0.95, 14, 24]} />
          <meshPhysicalMaterial
            color={immobileAmt > 0.5 ? '#cbd5e1' : '#e2e8f0'}
            emissive={toxinAmt > 0.2 && nematocystType === 'stenotele' ? '#ef4444' : '#64748b'}
            emissiveIntensity={toxinAmt > 0.2 && nematocystType === 'stenotele' ? toxinAmt * 0.55 : 0.06}
            transparent
            opacity={0.85}
            roughness={0.35}
          />
        </mesh>
        {/* Prey Seta / Bristle */}
        <mesh position={[-0.12, -0.45, 0.05]} rotation={[0, 0, 0.85]}>
          <cylinderGeometry args={[0.016, 0.032, 0.65, 10]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
      </group>

      {/* Interactive 3D Floating Structure Labels */}
      {showLabels && (
        <>
          {[
            { id: 'cnidocyte' as const, label: 'Cnidocyte', pos: [-1.08, 0.35, 0] as [number, number, number] },
            { id: 'capsule' as const, label: 'Nematocyst Capsule', pos: [-0.76, 0.02, 0.25] as [number, number, number] },
            { id: 'tubule' as const, label: 'Coiled Tubule', pos: [0.68, dischargeAmt > 0.4 ? 1.4 : 0.18, 0.18] as [number, number, number] },
            { id: 'operculum' as const, label: 'Operculum', pos: [-0.36, 0.85, 0.15] as [number, number, number] },
            { id: 'cnidocil' as const, label: 'Cnidocil', pos: [0.76, 1.32, 0.15] as [number, number, number] },
          ].map((item) => (
            <Html key={item.id} position={item.pos} center zIndexRange={[10, 0]}>
              <button
                type="button"
                onClick={() => onSelectPart(item.id)}
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold whitespace-nowrap shadow-sm border transition-all cursor-pointer ${
                  isSelected(item.id)
                    ? 'bg-orange-600 text-white border-orange-600 scale-105'
                    : 'bg-white/92 text-slate-800 border-slate-300 hover:border-orange-400'
                }`}
              >
                {item.label}
              </button>
            </Html>
          ))}
        </>
      )}
    </group>
  );
};

export const Nematocyst3DCanvas: React.FC<Nematocyst3DCanvasProps> = (props) => {
  return (
    <CanvasStage cameraPosition={[0.45, 0.55, 4.55]} fov={40} backgroundColor="#fff8f5">
      <NematocystScene {...props} />
      <OrbitControls enablePan={true} enableZoom={true} minDistance={2.2} maxDistance={7.2} target={[0, 0.2, 0]} />
    </CanvasStage>
  );
};
