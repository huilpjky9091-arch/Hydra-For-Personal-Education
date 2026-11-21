import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CanvasStage } from './CanvasStage';
import type { CellTypeId } from '../../data/cellBiologyData';

interface CellMicroscope3DCanvasProps {
  cellType: CellTypeId;
  magnification: 100 | 400 | 1000;
  fluorescenceStain: boolean;
}

const CellSpecimenMesh: React.FC<{
  cellType: CellTypeId;
  fluorescenceStain: boolean;
}> = ({ cellType, fluorescenceStain }) => {
  const groupRef = useRef<THREE.Group>(null);
  const flagellaRef = useRef<THREE.Mesh>(null);
  const vesicleGroupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.35) * 0.25;
      groupRef.current.position.y = Math.sin(t * 0.9) * 0.04;
    }
    if (flagellaRef.current) {
      flagellaRef.current.rotation.z = Math.sin(t * 4.5) * 0.35;
    }
    if (vesicleGroupRef.current) {
      vesicleGroupRef.current.children.forEach((child, idx) => {
        child.position.y += Math.sin(t * 1.8 + idx) * 0.0012;
      });
    }
  });

  const cytoplasmColor = fluorescenceStain ? '#d8b4fe' : '#bae6fd';
  const membraneEmissive = fluorescenceStain ? '#9333ea' : '#0284c7';
  const nucleusColor = fluorescenceStain ? '#db2777' : '#6d28d9';

  const nerveBranchPositions = useMemo(
    () => [
      [0.75, 0.55, 0.2],
      [-0.85, 0.42, -0.15],
      [0.65, -0.68, -0.3],
      [-0.7, -0.58, 0.35],
      [0.15, 0.88, -0.35],
      [-0.2, -0.88, 0.15],
    ],
    []
  );

  return (
    <group ref={groupRef}>
      {cellType === 'epithelio-muscular' && (
        <group>
          {/* Tall Epithelial Body */}
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.45, 0.36, 1.3, 28]} />
            <meshPhysicalMaterial
              color={cytoplasmColor}
              emissive={membraneEmissive}
              emissiveIntensity={fluorescenceStain ? 0.28 : 0.08}
              transparent
              opacity={0.58}
              roughness={0.2}
            />
          </mesh>
          {/* Basal Longitudinal Muscle Process (Myoneme Foot) */}
          <mesh position={[0, -0.52, 0]} rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.17, 1.65, 12, 24]} />
            <meshPhysicalMaterial
              color="#7dd3fc"
              emissive="#0284c7"
              emissiveIntensity={0.22}
              transparent
              opacity={0.72}
            />
          </mesh>
          {/* Contractile Actin/Myosin Myofibrils inside base */}
          {[-0.06, 0, 0.06].map((zOff, i) => (
            <mesh key={i} position={[0, -0.54, zOff]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.022, 0.022, 1.75, 10]} />
              <meshStandardMaterial color="#ec4899" emissive="#db2777" emissiveIntensity={0.5} />
            </mesh>
          ))}
          {/* Nucleus */}
          <mesh position={[0, 0.18, 0]}>
            <sphereGeometry args={[0.21, 24, 24]} />
            <meshStandardMaterial color={nucleusColor} emissive={nucleusColor} emissiveIntensity={0.35} />
          </mesh>
        </group>
      )}

      {cellType === 'cnidocytes' && (
        <group>
          {/* Outer Cnidocyte Cell Soma */}
          <mesh position={[0, -0.05, 0]}>
            <sphereGeometry args={[0.72, 32, 32]} />
            <meshPhysicalMaterial
              color={cytoplasmColor}
              emissive={membraneEmissive}
              emissiveIntensity={0.18}
              transparent
              opacity={0.44}
              roughness={0.15}
            />
          </mesh>
          {/* Internal Nematocyst Capsule */}
          <mesh position={[0, 0.08, 0]}>
            <capsuleGeometry args={[0.32, 0.42, 16, 28]} />
            <meshPhysicalMaterial
              color="#fb923c"
              emissive="#ea580c"
              emissiveIntensity={0.45}
              transparent
              opacity={0.72}
            />
          </mesh>
          {/* Coiled Tubule Rings inside Capsule */}
          {[-0.1, 0.02, 0.14, 0.25].map((yPos, idx) => (
            <mesh key={idx} position={[0, yPos, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.19, 0.028, 10, 24]} />
              <meshStandardMaterial color="#dc2626" emissive="#b91c1c" emissiveIntensity={0.6} />
            </mesh>
          ))}
          {/* Operculum Lid */}
          <mesh position={[0, 0.61, 0]}>
            <cylinderGeometry args={[0.16, 0.18, 0.06, 20]} />
            <meshStandardMaterial color="#f59e0b" />
          </mesh>
          {/* Cnidocil Trigger Cilium */}
          <mesh position={[0.26, 0.78, 0.1]} rotation={[0, 0, -0.18]}>
            <coneGeometry args={[0.045, 0.56, 12]} />
            <meshStandardMaterial color="#0d9488" emissive="#14b8a6" emissiveIntensity={0.4} />
          </mesh>
          {/* Crescent Nucleus pushed to base */}
          <mesh position={[-0.25, -0.45, 0.18]}>
            <sphereGeometry args={[0.16, 20, 20]} />
            <meshStandardMaterial color={nucleusColor} />
          </mesh>
        </group>
      )}

      {cellType === 'sensory' && (
        <group>
          {/* Slender Spindle Cell Body */}
          <mesh position={[0, 0, 0]}>
            <capsuleGeometry args={[0.24, 1.15, 16, 28]} />
            <meshPhysicalMaterial
              color="#99f6e4"
              emissive="#0d9488"
              emissiveIntensity={0.22}
              transparent
              opacity={0.58}
            />
          </mesh>
          {/* Apical Sensory Cilium */}
          <mesh position={[0, 1.05, 0]}>
            <coneGeometry args={[0.04, 0.65, 14]} />
            <meshStandardMaterial color="#0284c7" emissive="#38bdf8" emissiveIntensity={0.6} />
          </mesh>
          {/* Basal Neurite Synaptic Branches */}
          {[-0.35, 0.35].map((xDir, idx) => (
            <mesh
              key={idx}
              position={[xDir * 0.75, -0.82, 0]}
              rotation={[0, 0, xDir > 0 ? 0.85 : -0.85]}
            >
              <cylinderGeometry args={[0.02, 0.05, 0.75, 10]} />
              <meshStandardMaterial color="#7c3aed" emissive="#6d28d9" emissiveIntensity={0.45} />
            </mesh>
          ))}
          <mesh position={[0, 0.05, 0]}>
            <sphereGeometry args={[0.16, 20, 20]} />
            <meshStandardMaterial color={nucleusColor} />
          </mesh>
        </group>
      )}

      {cellType === 'nerve' && (
        <group>
          {/* Multipolar Soma */}
          <mesh>
            <sphereGeometry args={[0.36, 28, 28]} />
            <meshPhysicalMaterial
              color="#c4b5fd"
              emissive="#7c3aed"
              emissiveIntensity={0.35}
              transparent
              opacity={0.75}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.17, 20, 20]} />
            <meshStandardMaterial color="#db2777" emissive="#be185d" emissiveIntensity={0.45} />
          </mesh>
          {/* Radiating Neurite Connections */}
          {nerveBranchPositions.map((pos, idx) => {
            const target = new THREE.Vector3(...pos);
            const len = target.length();
            const q = new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 1, 0),
              target.clone().normalize()
            );
            return (
              <group key={idx}>
                <mesh position={target.clone().multiplyScalar(0.5)} quaternion={q}>
                  <cylinderGeometry args={[0.025, 0.065, len, 10]} />
                  <meshStandardMaterial color="#8b5cf6" emissive="#7c3aed" emissiveIntensity={0.45} />
                </mesh>
                <mesh position={target}>
                  <sphereGeometry args={[0.075, 12, 12]} />
                  <meshStandardMaterial color="#ec4899" emissive="#db2777" emissiveIntensity={0.8} />
                </mesh>
              </group>
            );
          })}
        </group>
      )}

      {cellType === 'gland' && (
        <group>
          {/* Flask-shaped Secretory Gland Cell */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.42, 0.24, 1.35, 28]} />
            <meshPhysicalMaterial
              color="#fbcfe8"
              emissive="#db2777"
              emissiveIntensity={0.2}
              transparent
              opacity={0.55}
            />
          </mesh>
          {/* Nucleus at Basal Stalk */}
          <mesh position={[0, -0.4, 0]}>
            <sphereGeometry args={[0.17, 20, 20]} />
            <meshStandardMaterial color="#7c3aed" />
          </mesh>
          {/* Zymogen / Enzyme Secretory Granules at Apex */}
          <group ref={vesicleGroupRef}>
            {[
              [0.14, 0.25, 0.1],
              [-0.16, 0.32, -0.08],
              [0.05, 0.45, -0.14],
              [-0.1, 0.12, 0.16],
              [0.18, 0.48, 0.12],
              [0, 0.78, 0],
            ].map(([vx, vy, vz], idx) => (
              <mesh key={idx} position={[vx, vy, vz]}>
                <sphereGeometry args={[0.095, 16, 16]} />
                <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.6} />
              </mesh>
            ))}
          </group>
        </group>
      )}

      {cellType === 'nutritive-muscular' && (
        <group>
          {/* Tall Columnar Gastrodermal Cell */}
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.4, 0.34, 1.45, 28]} />
            <meshPhysicalMaterial
              color="#f5d0fe"
              emissive="#a855f7"
              emissiveIntensity={0.22}
              transparent
              opacity={0.52}
            />
          </mesh>
          {/* Apical Flagellum beating in Gastrovascular Cavity */}
          <mesh ref={flagellaRef} position={[0, 1.08, 0]}>
            <cylinderGeometry args={[0.015, 0.03, 0.75, 10]} />
            <meshStandardMaterial color="#0d9488" emissive="#14b8a6" emissiveIntensity={0.5} />
          </mesh>
          {/* Food Vacuoles + Fused Lysosomes inside cytoplasm */}
          <mesh position={[0.12, 0.32, 0.1]}>
            <sphereGeometry args={[0.16, 18, 18]} />
            <meshStandardMaterial color="#f97316" emissive="#ea580c" emissiveIntensity={0.45} />
          </mesh>
          <mesh position={[-0.14, 0.08, -0.1]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#ec4899" emissive="#db2777" emissiveIntensity={0.55} />
          </mesh>
          {/* Nucleus */}
          <mesh position={[0, -0.28, 0]}>
            <sphereGeometry args={[0.18, 20, 20]} />
            <meshStandardMaterial color="#7c3aed" />
          </mesh>
          {/* Basal Circular Muscle Process */}
          <mesh position={[0, -0.68, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.12, 1.05, 10, 18]} />
            <meshStandardMaterial color="#db2777" emissive="#be185d" emissiveIntensity={0.35} />
          </mesh>
        </group>
      )}

      {cellType === 'interstitial' && (
        <group>
          {/* Cluster/Nest of 2 dividing small multipotent I-cells */}
          {[
            [-0.28, 0.05, 0],
            [0.28, -0.05, 0.08],
          ].map(([cx, cy, cz], idx) => (
            <group key={idx} position={[cx, cy, cz]}>
              <mesh>
                <sphereGeometry args={[0.36, 28, 28]} />
                <meshPhysicalMaterial
                  color="#ddd6fe"
                  emissive="#8b5cf6"
                  emissiveIntensity={0.32}
                  transparent
                  opacity={0.56}
                />
              </mesh>
              {/* Characteristic large nucleus relative to cytoplasm */}
              <mesh>
                <sphereGeometry args={[0.24, 24, 24]} />
                <meshStandardMaterial color="#6d28d9" emissive="#7c3aed" emissiveIntensity={0.55} />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {cellType === 'germ' && (
        <group>
          {/* Large Yolk-rich Oocyte (Egg) */}
          <mesh position={[-0.25, 0.05, 0]}>
            <sphereGeometry args={[0.62, 32, 32]} />
            <meshPhysicalMaterial
              color="#fbcfe8"
              emissive="#ec4899"
              emissiveIntensity={0.26}
              transparent
              opacity={0.68}
            />
          </mesh>
          <mesh position={[-0.25, 0.08, 0]}>
            <sphereGeometry args={[0.24, 24, 24]} />
            <meshStandardMaterial color="#9333ea" emissive="#7c3aed" emissiveIntensity={0.45} />
          </mesh>
          {/* Motile Spermatozoon approaching */}
          <group position={[0.68, 0.35, 0.15]} rotation={[0, 0, 0.72]}>
            <mesh>
              <coneGeometry args={[0.09, 0.24, 16]} />
              <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.5} />
            </mesh>
            <mesh ref={flagellaRef} position={[0, -0.45, 0]}>
              <cylinderGeometry args={[0.012, 0.025, 0.72, 10]} />
              <meshStandardMaterial color="#38bdf8" />
            </mesh>
          </group>
        </group>
      )}
    </group>
  );
};

export const CellMicroscope3DCanvas: React.FC<CellMicroscope3DCanvasProps> = ({
  cellType,
  magnification,
  fluorescenceStain,
}) => {
  const camDistance = magnification === 100 ? 4.4 : magnification === 400 ? 3.1 : 2.15;

  return (
    <CanvasStage
      key={`${magnification}`}
      cameraPosition={[0.6, 0.45, camDistance]}
      fov={38}
      backgroundColor={fluorescenceStain ? '#f5f3ff' : '#f4faff'}
    >
      <CellSpecimenMesh cellType={cellType} fluorescenceStain={fluorescenceStain} />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={1.4}
        maxDistance={5.8}
      />
    </CanvasStage>
  );
};
