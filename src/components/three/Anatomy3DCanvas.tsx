import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { CanvasStage } from './CanvasStage';
import { HydraModel3D } from './HydraModel3D';
import { ANATOMY_PARTS, type AnatomyPart } from '../../data/anatomyData';

interface CameraRigProps {
  selectedPart: AnatomyPart;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  autoFocusTrigger: number;
}

const CameraRig: React.FC<CameraRigProps> = ({
  selectedPart,
  controlsRef,
  autoFocusTrigger,
}) => {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(...selectedPart.cameraPosition));
  const targetLook = useRef(new THREE.Vector3(...selectedPart.cameraTarget));
  const animating = useRef(false);

  useEffect(() => {
    targetPos.current.set(...selectedPart.cameraPosition);
    targetLook.current.set(...selectedPart.cameraTarget);
    animating.current = true;
  }, [selectedPart, autoFocusTrigger]);

  useFrame((_, delta) => {
    if (!animating.current || !controlsRef.current) return;
    const step = 1 - Math.exp(-delta * 4.5);
    camera.position.lerp(targetPos.current, step);
    controlsRef.current.target.lerp(targetLook.current, step);
    controlsRef.current.update();

    if (
      camera.position.distanceTo(targetPos.current) < 0.03 &&
      controlsRef.current.target.distanceTo(targetLook.current) < 0.03
    ) {
      animating.current = false;
    }
  });

  return null;
};

interface AnatomyPin {
  id: string;
  label: string;
  position: [number, number, number];
}

const ANATOMY_PINS: AnatomyPin[] = [
  { id: 'mouth', label: 'Mouth', position: [0, 1.66, 0] },
  { id: 'hypostome', label: 'Hypostome', position: [-0.42, 1.38, 0.25] },
  { id: 'tentacles', label: 'Tentacles', position: [1.18, 1.68, 0.35] },
  { id: 'cnidocytes', label: 'Cnidocytes', position: [-1.18, 1.54, 0.4] },
  { id: 'nematocysts', label: 'Nematocysts', position: [0.95, 1.98, -0.35] },
  { id: 'epidermis', label: 'Epidermis', position: [-0.62, 0.78, 0.28] },
  { id: 'mesoglea', label: 'Mesoglea', position: [0.58, 0.48, 0.28] },
  { id: 'gastrodermis', label: 'Gastrodermis', position: [-0.56, 0.16, 0.28] },
  { id: 'gastrovascular-cavity', label: 'Gastrovascular Cavity', position: [0.12, -0.18, 0.18] },
  { id: 'body-column', label: 'Body Column', position: [-0.64, -0.56, 0.24] },
  { id: 'bud', label: 'Bud', position: [0.76, -0.18, 0.22] },
  { id: 'basal-disc', label: 'Basal Disc', position: [0.52, -1.08, 0.26] },
];

interface Anatomy3DCanvasProps {
  selectedId: string;
  onSelectPart: (id: string) => void;
  cutawayMode: boolean;
  xrayMode: boolean;
  showPins: boolean;
  autoFocusTrigger: number;
}

export const Anatomy3DCanvas: React.FC<Anatomy3DCanvasProps> = ({
  selectedId,
  onSelectPart,
  cutawayMode,
  xrayMode,
  showPins,
  autoFocusTrigger,
}) => {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const activePart = ANATOMY_PARTS.find((p) => p.id === selectedId) ?? ANATOMY_PARTS[0];

  return (
    <CanvasStage cameraPosition={[2.6, 1.1, 3.1]} fov={40} backgroundColor="#f3f8ff">
      <CameraRig
        selectedPart={activePart}
        controlsRef={controlsRef}
        autoFocusTrigger={autoFocusTrigger}
      />

      <HydraModel3D
        xrayMode={xrayMode}
        cutawayMode={cutawayMode}
        selectedPart={selectedId}
        onSelectPart={onSelectPart}
        showBud={true}
      />

      {showPins &&
        ANATOMY_PINS.map((pin) => {
          const isActive = pin.id === selectedId;
          return (
            <Html key={pin.id} position={pin.position} center zIndexRange={[10, 0]}>
              <button
                type="button"
                onClick={() => onSelectPart(pin.id)}
                className={`group flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-tight transition-all cursor-pointer whitespace-nowrap shadow-xs border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 scale-105 shadow-md'
                    : 'bg-white/92 text-slate-700 border-slate-300/90 hover:bg-sky-50 hover:text-sky-800 hover:border-sky-300'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isActive ? 'bg-sky-400' : 'bg-teal-500'
                  }`}
                />
                {pin.label}
              </button>
            </Html>
          );
        })}

      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        minDistance={1.4}
        maxDistance={6.8}
        target={activePart.cameraTarget}
      />
    </CanvasStage>
  );
};
