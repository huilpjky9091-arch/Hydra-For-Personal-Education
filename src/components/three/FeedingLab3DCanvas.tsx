import React, { useRef } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CanvasStage } from './CanvasStage';
import { HydraModel3D } from './HydraModel3D';

export type FeedingStage =
  | 'idle'
  | 'prey-spawned'
  | 'approaching'
  | 'contact-discharge'
  | 'immobilized-dragging'
  | 'ingestion'
  | 'extracellular-digestion'
  | 'intracellular-digestion'
  | 'egestion-complete';

export type FeedingClickablePart =
  | 'daphnia'
  | 'tentacles'
  | 'nematocysts'
  | 'mouth'
  | 'gastrovascular-cavity'
  | 'gastrodermis';

interface FeedingLab3DCanvasProps {
  stage: FeedingStage;
  stageProgress: number; // 0..1 within simulation timeline
  xrayMode: boolean;
  selectedPart: FeedingClickablePart | null;
  onSelectPart: (part: FeedingClickablePart) => void;
}

const DaphniaPrey3D: React.FC<{
  position: [number, number, number];
  stunned: boolean;
  scale: number;
  opacity: number;
  onSelect: () => void;
}> = ({ position, stunned, scale, opacity, onSelect }) => {
  const daphniaRef = useRef<THREE.Group>(null);
  const antLRef = useRef<THREE.Mesh>(null);
  const antRRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (daphniaRef.current && !stunned) {
      daphniaRef.current.position.y = position[1] + Math.sin(t * 7) * 0.035;
      daphniaRef.current.rotation.z = Math.sin(t * 4) * 0.14;
    } else if (daphniaRef.current) {
      daphniaRef.current.position.y = position[1];
    }
    if (antLRef.current && antRRef.current) {
      const flap = stunned ? 0.15 : Math.sin(t * 15) * 0.55;
      antLRef.current.rotation.z = 0.7 + flap;
      antRRef.current.rotation.z = -0.7 - flap;
    }
  });

  if (opacity <= 0.02) return null;

  return (
    <group
      ref={daphniaRef}
      position={position}
      scale={scale}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* Translucent Carapace */}
      <mesh>
        <sphereGeometry args={[0.18, 20, 20]} />
        <meshPhysicalMaterial
          color={stunned ? '#fca5a5' : '#fde68a'}
          emissive={stunned ? '#dc2626' : '#f59e0b'}
          emissiveIntensity={stunned ? 0.55 : 0.18}
          transparent
          opacity={opacity * 0.82}
          roughness={0.25}
        />
      </mesh>
      {/* Head Crest & Compound Eye */}
      <mesh position={[-0.12, 0.11, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#f59e0b" transparent opacity={opacity * 0.9} />
      </mesh>
      <mesh position={[-0.17, 0.14, 0.05]}>
        <sphereGeometry args={[0.032, 10, 10]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>
      {/* Tail Spine */}
      <mesh position={[0.17, -0.15, 0]} rotation={[0, 0, 2.3]}>
        <coneGeometry args={[0.024, 0.22, 8]} />
        <meshStandardMaterial color="#d97706" transparent opacity={opacity} />
      </mesh>
      {/* Biramous Swimming Antennae */}
      <mesh ref={antLRef} position={[-0.12, 0.16, 0.09]}>
        <cylinderGeometry args={[0.012, 0.018, 0.28, 8]} />
        <meshStandardMaterial color="#b45309" transparent opacity={opacity} />
      </mesh>
      <mesh ref={antRRef} position={[-0.12, 0.16, -0.09]}>
        <cylinderGeometry args={[0.012, 0.018, 0.28, 8]} />
        <meshStandardMaterial color="#b45309" transparent opacity={opacity} />
      </mesh>
    </group>
  );
};

export const FeedingLab3DCanvas: React.FC<FeedingLab3DCanvasProps> = ({
  stage,
  stageProgress,
  xrayMode,
  selectedPart,
  onSelectPart,
}) => {
  // Compute animation choreography from unified timeline stageProgress (0..1)
  let preyPos: [number, number, number] = [2.2, 2.1, 0.45];
  let preyVisible = stage !== 'idle';
  let preyStunned = false;
  let preyScale = 1;
  let preyOpacity = 1;
  let tentacleCurl = 0;
  let mouthOpen = 0.06;
  let preyInCavityY: number | null = null;
  let enzymeGlow = 0;
  let absorptionGlow = 0;
  let showNematocystBurst = false;

  if (stage === 'prey-spawned') {
    preyPos = [2.05, 2.05, 0.52];
  } else if (stage === 'approaching') {
    const t = Math.min(1, stageProgress / 0.18);
    preyPos = [2.05 - t * 1.12, 2.05 - t * 0.35, 0.52 - t * 0.22];
  } else if (stage === 'contact-discharge') {
    preyPos = [0.93, 1.7, 0.3];
    preyStunned = true;
    showNematocystBurst = true;
    tentacleCurl = 0.2;
  } else if (stage === 'immobilized-dragging') {
    const t = Math.min(1, (stageProgress - 0.28) / 0.16);
    preyPos = [0.93 * (1 - t), 1.7 - t * 0.1, 0.3 * (1 - t)];
    preyStunned = true;
    tentacleCurl = 0.2 + t * 0.78;
    mouthOpen = 0.08 + t * 0.85;
  } else if (stage === 'ingestion') {
    const t = Math.min(1, (stageProgress - 0.44) / 0.14);
    preyPos = [0, 1.6 - t * 0.35, 0];
    preyVisible = t < 0.45;
    preyInCavityY = t >= 0.35 ? 1.4 - (t - 0.35) * 1.3 : null;
    preyStunned = true;
    tentacleCurl = 0.98 - t * 0.75;
    mouthOpen = 0.92 - t * 0.65;
  } else if (stage === 'extracellular-digestion') {
    const t = Math.min(1, (stageProgress - 0.58) / 0.16);
    preyVisible = false;
    preyInCavityY = 0.45 - t * 0.25;
    mouthOpen = 0.08;
    enzymeGlow = Math.min(1, t * 1.4);
  } else if (stage === 'intracellular-digestion') {
    const t = Math.min(1, (stageProgress - 0.74) / 0.15);
    preyVisible = false;
    preyInCavityY = 0.2;
    enzymeGlow = 1 - t * 0.6;
    absorptionGlow = Math.sin(t * Math.PI);
  } else if (stage === 'egestion-complete') {
    const t = Math.min(1, (stageProgress - 0.89) / 0.11);
    preyInCavityY = null;
    mouthOpen = t < 0.75 ? 0.55 : 0.08;
    // Empty chitin shell expelled back out through the SINGLE mouth opening
    preyVisible = true;
    preyStunned = true;
    preyPos = [t * 0.75, 1.56 + t * 0.85, t * 0.35];
    preyScale = 0.62;
    preyOpacity = Math.max(0.2, 0.75 - t * 0.55);
  }

  const mapHydraClick = (partId: string) => {
    if (partId === 'tentacles') onSelectPart('tentacles');
    else if (partId === 'nematocysts' || partId === 'cnidocytes') onSelectPart('nematocysts');
    else if (partId === 'mouth' || partId === 'hypostome') onSelectPart('mouth');
    else if (partId === 'gastrovascular-cavity') onSelectPart('gastrovascular-cavity');
    else if (partId === 'gastrodermis' || partId === 'epidermis') onSelectPart('gastrodermis');
  };

  return (
    <CanvasStage cameraPosition={[0.6, 1.15, 5.2]} fov={40} backgroundColor="#f3f9ff">
      <HydraModel3D
        xrayMode={xrayMode}
        cutawayMode={false}
        selectedPart={selectedPart}
        onSelectPart={mapHydraClick}
        showBud={false}
        mouthOpenAmount={mouthOpen}
        tentacleCurl={tentacleCurl}
        curlTargetTentacle={0}
        preyPositionInCavity={preyInCavityY}
        enzymeGlow={enzymeGlow}
        absorptionGlow={absorptionGlow}
        position={[0, -0.2, 0]}
      />

      {preyVisible && (
        <DaphniaPrey3D
          position={[preyPos[0], preyPos[1] - 0.2, preyPos[2]]}
          stunned={preyStunned}
          scale={preyScale}
          opacity={preyOpacity}
          onSelect={() => onSelectPart('daphnia')}
        />
      )}

      {/* Nematocyst Firing Sparks when Daphnia contacts Tentacle */}
      {showNematocystBurst && (
        <group
          position={[0.88, 1.48, 0.28]}
          onClick={(e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            onSelectPart('nematocysts');
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((idx) => {
            const a = (idx / 6) * Math.PI * 2;
            return (
              <mesh
                key={idx}
                position={[Math.cos(a) * 0.14, Math.sin(a) * 0.14, 0]}
                rotation={[0, 0, a]}
              >
                <cylinderGeometry args={[0.008, 0.015, 0.34, 8]} />
                <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={1.6} />
              </mesh>
            );
          })}
          <Html center zIndexRange={[10, 0]}>
            <button
              type="button"
              onClick={() => onSelectPart('nematocysts')}
              className="rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-md whitespace-nowrap cursor-pointer"
            >
              Nematocyst Discharge!
            </button>
          </Html>
        </group>
      )}

      <OrbitControls enablePan={true} enableZoom={true} minDistance={2.4} maxDistance={8.5} target={[0.2, 0.55, 0]} />
    </CanvasStage>
  );
};
