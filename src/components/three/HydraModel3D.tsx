import React, { useMemo, useRef, useState } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

export interface HydraModel3DProps {
  xrayMode?: boolean;
  cutawayMode?: boolean;
  selectedPart?: string | null;
  onSelectPart?: (partId: string) => void;
  showBud?: boolean;
  mouthOpenAmount?: number; // 0 = closed, 1 = wide open
  tentacleCurl?: number; // 0 = relaxed outward, 1 = curled toward mouth
  curlTargetTentacle?: number; // index of tentacle most bent toward prey
  preyPositionInCavity?: number | null; // null or y from 1.4 down to 0.0
  enzymeGlow?: number; // 0..1 inside gastrovascular cavity
  absorptionGlow?: number; // 0..1 pink/purple glow on gastrodermis
  scale?: number;
  position?: [number, number, number];
}

// Smooth body radius profile along Y axis (-1.28 basal disc to +1.28 neck)
function bodyRadiusProfile(y: number): number {
  if (y < -1.12) {
    // Flared basal disc
    const t = (-1.12 - y) / 0.16;
    return 0.24 + t * t * 0.22;
  }
  if (y < -0.5) {
    // Peduncle / lower stalk
    const t = (y + 1.12) / 0.62;
    return 0.24 + Math.sin(t * Math.PI * 0.5) * 0.05;
  }
  if (y < 0.7) {
    // Mid gastric column swelling gently
    const t = (y + 0.5) / 1.2;
    return 0.29 + Math.sin(t * Math.PI) * 0.085;
  }
  // Upper neck tapering slightly to hypostome base
  const t = (y - 0.7) / 0.58;
  return 0.29 - t * 0.04;
}

function createLatheProfile(offset: number, startY = -1.28, endY = 1.28, steps = 36): THREE.Vector2[] {
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const y = startY + t * (endY - startY);
    const r = Math.max(0.03, bodyRadiusProfile(y) + offset);
    pts.push(new THREE.Vector2(r, y));
  }
  return pts;
}

function createHypostomeProfile(offset: number, mouthOpen: number): THREE.Vector2[] {
  const pts: THREE.Vector2[] = [];
  const steps = 16;
  const openRadius = 0.025 + mouthOpen * 0.17;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const y = 1.25 + t * 0.31;
    const baseR = 0.25 * (1 - t * 0.88) + Math.sin(t * Math.PI) * 0.04;
    const r = Math.max(openRadius * t + 0.01, baseR + offset + mouthOpen * t * 0.12);
    pts.push(new THREE.Vector2(r, y));
  }
  return pts;
}

interface TentacleProps {
  index: number;
  total: number;
  xrayMode: boolean;
  selectedPart?: string | null;
  onSelectPart?: (partId: string) => void;
  curlFactor: number;
  isPrimaryHunter: boolean;
  onHoverChange: (hovered: boolean) => void;
}

const SEGMENTS = 14;

const AnimatedTentacle: React.FC<TentacleProps> = ({
  index,
  total,
  xrayMode,
  selectedPart,
  onSelectPart,
  curlFactor,
  isPrimaryHunter,
  onHoverChange,
}) => {
  const segmentRefs = useRef<(THREE.Mesh | null)[]>([]);
  const innerCanalRefs = useRef<(THREE.Mesh | null)[]>([]);
  const cnidocyteRefs = useRef<(THREE.Mesh | null)[]>([]);
  const nematocystRefs = useRef<(THREE.Mesh | null)[]>([]);

  const baseAngle = (index / total) * Math.PI * 2 + 0.28;
  const radiusAtRoot = 0.22;
  const rootY = 1.32;
  const tentacleLength = 1.85;

  const isTentacleSelected = selectedPart === 'tentacles';
  const isCnidocyteSelected = selectedPart === 'cnidocytes';
  const isNematocystSelected = selectedPart === 'nematocysts';

  // Pre-allocated vectors to avoid per-frame garbage collection
  const pPrev = useMemo(() => new THREE.Vector3(), []);
  const pCurr = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const upVec = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  const quat = useMemo(() => new THREE.Quaternion(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const phase = index * 1.15;

    const effectiveCurl = isPrimaryHunter ? curlFactor : curlFactor * 0.42;

    for (let s = 0; s < SEGMENTS; s++) {
      const f0 = s / SEGMENTS;
      const f1 = (s + 1) / SEGMENTS;

      const computePoint = (f: number, out: THREE.Vector3) => {
        const radialReach =
          radiusAtRoot +
          f * (1.25 - effectiveCurl * 1.05) +
          Math.sin(f * Math.PI * 0.8) * (0.28 * (1 - effectiveCurl));
        const swayAzimuth =
          baseAngle +
          Math.sin(t * 0.85 + phase - f * 2.2) * (0.14 * (1 - effectiveCurl * 0.6)) * f;
        const archY =
          rootY +
          Math.sin(f * Math.PI * 0.92) * (0.62 + effectiveCurl * 0.35) -
          f * f * (0.58 - effectiveCurl * 0.55) +
          Math.cos(t * 1.1 + phase - f * 2.5) * 0.11 * f;

        // Pull toward center mouth apex when curling
        const centerPull = effectiveCurl * f * 0.65;
        const x = Math.cos(swayAzimuth) * Math.max(0.06, radialReach * (1 - centerPull * 0.72));
        const z = Math.sin(swayAzimuth) * Math.max(0.06, radialReach * (1 - centerPull * 0.72));
        const y = archY + (f > 0.45 ? -effectiveCurl * (f - 0.45) * 0.38 : 0);
        out.set(x, y, z);
      };

      computePoint(f0, pPrev);
      computePoint(f1, pCurr);

      const segMesh = segmentRefs.current[s];
      const innerMesh = innerCanalRefs.current[s];
      if (segMesh) {
        segMesh.position.copy(pPrev).lerp(pCurr, 0.5);
        dir.copy(pCurr).sub(pPrev);
        const len = Math.max(0.01, dir.length());
        dir.normalize();
        quat.setFromUnitVectors(upVec, dir);
        segMesh.quaternion.copy(quat);
        segMesh.scale.set(1, len / (tentacleLength / SEGMENTS), 1);
      }

      if (innerMesh) {
        innerMesh.position.copy(pPrev).lerp(pCurr, 0.5);
        innerMesh.quaternion.copy(quat);
        innerMesh.scale.set(1, dir.length() > 0 ? pCurr.distanceTo(pPrev) / (tentacleLength / SEGMENTS) : 1, 1);
      }

      // Position cnidocyte battery nodules on outer face of segments 3..12
      if (s >= 3 && s <= 12) {
        const cnidoIdx = s - 3;
        const cnidoMesh = cnidocyteRefs.current[cnidoIdx];
        const nemaMesh = nematocystRefs.current[cnidoIdx];
        if (cnidoMesh) {
          const bumpAngle = baseAngle + (s % 2 === 0 ? 0.6 : -0.6);
          const offsetR = 0.044 * (1 - f0 * 0.55);
          cnidoMesh.position.set(
            pCurr.x + Math.cos(bumpAngle) * offsetR,
            pCurr.y + 0.012,
            pCurr.z + Math.sin(bumpAngle) * offsetR
          );
          if (nemaMesh) {
            nemaMesh.position.copy(cnidoMesh.position);
          }
        }
      }
    }
  });

  const handleClick = (partId: string) => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelectPart?.(partId);
  };

  return (
    <group>
      {Array.from({ length: SEGMENTS }).map((_, s) => {
        const f = s / SEGMENTS;
        const rTop = 0.052 * (1 - f * 0.68);
        const rBot = 0.056 * (1 - f * 0.64);
        const segH = tentacleLength / SEGMENTS;
        return (
          <React.Fragment key={s}>
            {/* Outer Epidermal Tentacle Wall */}
            <mesh
              ref={(el) => {
                segmentRefs.current[s] = el;
              }}
              onClick={handleClick('tentacles')}
              onPointerOver={(e) => {
                e.stopPropagation();
                onHoverChange(true);
              }}
              onPointerOut={() => onHoverChange(false)}
            >
              <cylinderGeometry args={[rTop, rBot, segH * 1.15, 14]} />
              <meshPhysicalMaterial
                color={
                  isTentacleSelected
                    ? '#0ea5e9'
                    : xrayMode
                    ? '#38bdf8'
                    : '#7dd3fc'
                }
                emissive={isTentacleSelected ? '#0284c7' : xrayMode ? '#0369a1' : '#0c4a6e'}
                emissiveIntensity={isTentacleSelected ? 0.55 : xrayMode ? 0.35 : 0.06}
                transparent
                opacity={xrayMode ? 0.28 : 0.72}
                roughness={0.22}
                transmission={xrayMode ? 0 : 0.35}
                depthWrite={!xrayMode}
              />
            </mesh>

            {/* Inner Tentacle Lumen / Gastrodermis extension */}
            <mesh
              ref={(el) => {
                innerCanalRefs.current[s] = el;
              }}
              onClick={handleClick('gastrovascular-cavity')}
            >
              <cylinderGeometry args={[rTop * 0.45, rBot * 0.45, segH * 1.12, 10]} />
              <meshStandardMaterial
                color={xrayMode ? '#c084fc' : '#f472b6'}
                emissive={xrayMode ? '#7c3aed' : '#db2777'}
                emissiveIntensity={xrayMode ? 0.6 : 0.18}
                transparent
                opacity={xrayMode ? 0.65 : 0.48}
                roughness={0.4}
              />
            </mesh>
          </React.Fragment>
        );
      })}

      {/* Cnidocyte Battery Nodules & Internal Nematocysts */}
      {Array.from({ length: 10 }).map((_, idx) => (
        <React.Fragment key={`cnid-${idx}`}>
          <mesh
            ref={(el) => {
              cnidocyteRefs.current[idx] = el;
            }}
            onClick={handleClick('cnidocytes')}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHoverChange(true);
            }}
            onPointerOut={() => onHoverChange(false)}
          >
            <sphereGeometry args={[isCnidocyteSelected ? 0.036 : 0.025, 12, 12]} />
            <meshStandardMaterial
              color={isCnidocyteSelected ? '#f97316' : xrayMode ? '#fb923c' : '#fdba74'}
              emissive={isCnidocyteSelected ? '#ea580c' : '#c2410c'}
              emissiveIntensity={isCnidocyteSelected ? 0.95 : xrayMode ? 0.5 : 0.22}
              transparent
              opacity={xrayMode ? 0.85 : 0.82}
              roughness={0.3}
            />
          </mesh>

          <mesh
            ref={(el) => {
              nematocystRefs.current[idx] = el;
            }}
            onClick={handleClick('nematocysts')}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHoverChange(true);
            }}
            onPointerOut={() => onHoverChange(false)}
          >
            <sphereGeometry args={[isNematocystSelected ? 0.024 : 0.013, 10, 10]} />
            <meshStandardMaterial
              color="#dc2626"
              emissive="#ef4444"
              emissiveIntensity={isNematocystSelected ? 1.4 : 0.55}
            />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  );
};

export const HydraModel3D: React.FC<HydraModel3DProps> = ({
  xrayMode = false,
  cutawayMode = false,
  selectedPart = null,
  onSelectPart,
  showBud = true,
  mouthOpenAmount = 0.08,
  tentacleCurl = 0,
  curlTargetTentacle = 0,
  preyPositionInCavity = null,
  enzymeGlow = 0,
  absorptionGlow = 0,
  scale = 1,
  position = [0, 0, 0],
}) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const nerveNetRef = useRef<THREE.Group>(null);
  const budGroupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  React.useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered]);

  const thetaStart = cutawayMode ? 0.72 : 0;
  const thetaLength = cutawayMode ? Math.PI * 1.38 : Math.PI * 2;

  const geometries = useMemo(() => {
    const epPts = createLatheProfile(0);
    const mesoPts = createLatheProfile(-0.028);
    const gastroPts = createLatheProfile(-0.062);
    const cavityPts = createLatheProfile(-0.102, -1.08, 1.24, 28);
    const hypPts = createHypostomeProfile(0, mouthOpenAmount);
    const hypInnerPts = createHypostomeProfile(-0.045, mouthOpenAmount);

    return {
      epidermis: new THREE.LatheGeometry(epPts, 48, thetaStart, thetaLength),
      mesoglea: new THREE.LatheGeometry(mesoPts, 44, thetaStart, thetaLength),
      gastrodermis: new THREE.LatheGeometry(gastroPts, 44, thetaStart, thetaLength),
      cavity: new THREE.LatheGeometry(cavityPts, 32, thetaStart, thetaLength),
      hypostome: new THREE.LatheGeometry(hypPts, 36, 0, Math.PI * 2),
      hypInner: new THREE.LatheGeometry(hypInnerPts, 28, 0, Math.PI * 2),
      basalDisc: new THREE.LatheGeometry(
        [
          new THREE.Vector2(0.02, -1.295),
          new THREE.Vector2(0.47, -1.295),
          new THREE.Vector2(0.45, -1.22),
          new THREE.Vector2(0.26, -1.12),
        ],
        40,
        0,
        Math.PI * 2
      ),
    };
  }, [thetaStart, thetaLength, mouthOpenAmount]);

  React.useEffect(() => {
    return () => {
      Object.values(geometries).forEach((g) => g.dispose());
    };
  }, [geometries]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (rootGroupRef.current) {
      // Gentle living hydrostatic pulse and sway
      const breath = 1 + Math.sin(t * 1.15) * 0.014;
      const elong = 1 - Math.sin(t * 1.15) * 0.012;
      rootGroupRef.current.scale.set(scale * breath, scale * elong, scale * breath);
      rootGroupRef.current.rotation.z = Math.sin(t * 0.55) * 0.022;
    }
    if (budGroupRef.current) {
      budGroupRef.current.rotation.z = -0.78 + Math.sin(t * 1.3 + 0.8) * 0.045;
    }
  });

  const handleClick = (partId: string) => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelectPart?.(partId);
  };

  const isSelected = (partId: string) => selectedPart === partId;

  return (
    <group position={position}>
      {/* Freshwater Pebble Substrate under Basal Disc */}
      <mesh position={[0, -1.42, 0]} receiveShadow>
        <cylinderGeometry args={[0.92, 1.08, 0.24, 36]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.85} metalness={0.05} />
      </mesh>
      <mesh position={[0, -1.32, 0]}>
        <cylinderGeometry args={[0.68, 0.88, 0.08, 32]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.7} />
      </mesh>

      <group ref={rootGroupRef}>
        {/* 1. EPIDERMIS (Outer Layer) */}
        <mesh
          geometry={geometries.epidermis}
          onClick={handleClick(isSelected('body-column') ? 'epidermis' : 'epidermis')}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          <meshPhysicalMaterial
            color={
              isSelected('epidermis') || isSelected('body-column')
                ? '#0ea5e9'
                : xrayMode
                ? '#38bdf8'
                : '#bae6fd'
            }
            emissive={
              isSelected('epidermis') || isSelected('body-column')
                ? '#0284c7'
                : xrayMode
                ? '#0369a1'
                : '#0c4a6e'
            }
            emissiveIntensity={
              isSelected('epidermis') || isSelected('body-column') ? 0.5 : xrayMode ? 0.3 : 0.04
            }
            transparent
            opacity={xrayMode ? 0.16 : cutawayMode ? 0.56 : 0.36}
            roughness={0.14}
            metalness={0.04}
            transmission={xrayMode ? 0 : 0.45}
            ior={1.36}
            thickness={0.4}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        {/* X-Ray Wireframe Overlay for Radiographic Blueprint */}
        {xrayMode && (
          <mesh geometry={geometries.epidermis}>
            <meshBasicMaterial color="#0284c7" wireframe transparent opacity={0.22} />
          </mesh>
        )}

        {/* Body Column invisible helper collar for direct Body Column click when cutaway is off */}
        {isSelected('body-column') && (
          <mesh geometry={geometries.epidermis}>
            <meshBasicMaterial color="#1e3a8a" wireframe transparent opacity={0.32} />
          </mesh>
        )}

        {/* 2. MESOGLEA (Middle Gelatinous Matrix) */}
        <mesh
          geometry={geometries.mesoglea}
          onClick={handleClick('mesoglea')}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          <meshPhysicalMaterial
            color={isSelected('mesoglea') ? '#14b8a6' : '#5eead4'}
            emissive={isSelected('mesoglea') ? '#0d9488' : '#0f766e'}
            emissiveIntensity={isSelected('mesoglea') ? 0.85 : 0.12}
            transparent
            opacity={isSelected('mesoglea') ? 0.72 : cutawayMode ? 0.55 : xrayMode ? 0.32 : 0.26}
            roughness={0.12}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        {/* 3. GASTRODERMIS (Inner Digestive Tissue Layer) */}
        <mesh
          geometry={geometries.gastrodermis}
          onClick={handleClick('gastrodermis')}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          <meshPhysicalMaterial
            color={
              isSelected('gastrodermis')
                ? '#ec4899'
                : absorptionGlow > 0.1
                ? '#a855f7'
                : '#f472b6'
            }
            emissive={
              isSelected('gastrodermis')
                ? '#db2777'
                : absorptionGlow > 0.1
                ? '#9333ea'
                : '#be185d'
            }
            emissiveIntensity={
              isSelected('gastrodermis') ? 0.75 : 0.14 + absorptionGlow * 0.75
            }
            transparent
            opacity={cutawayMode ? 0.85 : xrayMode ? 0.45 : 0.52}
            roughness={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* 4. GASTROVASCULAR CAVITY (Hollow Digestive & Hydrostatic Lumen) */}
        <mesh
          geometry={geometries.cavity}
          onClick={handleClick('gastrovascular-cavity')}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial
            color={
              isSelected('gastrovascular-cavity')
                ? '#9333ea'
                : enzymeGlow > 0.1
                ? '#14b8a6'
                : '#c084fc'
            }
            emissive={
              isSelected('gastrovascular-cavity')
                ? '#7c3aed'
                : enzymeGlow > 0.1
                ? '#0d9488'
                : '#6d28d9'
            }
            emissiveIntensity={
              isSelected('gastrovascular-cavity') ? 0.85 : 0.22 + enzymeGlow * 0.65
            }
            transparent
            opacity={
              isSelected('gastrovascular-cavity')
                ? 0.58
                : cutawayMode
                ? 0.28
                : xrayMode
                ? 0.38
                : 0.24
            }
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        {/* Subtle Nerve Net Strands visible in X-Ray / Cutaway */}
        {(xrayMode || cutawayMode) && (
          <group ref={nerveNetRef}>
            {[-0.8, -0.35, 0.1, 0.55, 0.98].map((y, idx) => (
              <mesh key={`ring-${idx}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[bodyRadiusProfile(y) - 0.025, 0.006, 8, 32]} />
                <meshBasicMaterial color="#7c3aed" transparent opacity={xrayMode ? 0.72 : 0.35} />
              </mesh>
            ))}
          </group>
        )}

        {/* 5. HYPOSTOME & MOUTH */}
        <mesh
          geometry={geometries.hypostome}
          onClick={handleClick('hypostome')}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          <meshPhysicalMaterial
            color={isSelected('hypostome') ? '#0284c7' : '#7dd3fc'}
            emissive={isSelected('hypostome') ? '#0284c7' : '#0369a1'}
            emissiveIntensity={isSelected('hypostome') ? 0.65 : 0.1}
            transparent
            opacity={xrayMode ? 0.35 : 0.74}
            roughness={0.22}
          />
        </mesh>

        {/* Mouth Sphincter Ring */}
        <mesh
          position={[0, 1.56, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          onClick={handleClick('mouth')}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          <torusGeometry args={[0.042 + mouthOpenAmount * 0.16, 0.028, 16, 32]} />
          <meshStandardMaterial
            color={isSelected('mouth') ? '#0ea5e9' : '#ec4899'}
            emissive={isSelected('mouth') ? '#0284c7' : '#be185d'}
            emissiveIntensity={isSelected('mouth') ? 0.95 : 0.35}
          />
        </mesh>

        {/* Dark Interior Mouth Aperture Void */}
        <mesh
          position={[0, 1.545, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          onClick={handleClick('mouth')}
        >
          <circleGeometry args={[0.032 + mouthOpenAmount * 0.145, 24]} />
          <meshBasicMaterial color="#4c1d95" transparent opacity={0.85} />
        </mesh>

        {/* 6. BASAL DISC */}
        <mesh
          geometry={geometries.basalDisc}
          onClick={handleClick('basal-disc')}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          <meshPhysicalMaterial
            color={isSelected('basal-disc') ? '#0f766e' : '#38bdf8'}
            emissive={isSelected('basal-disc') ? '#0d9488' : '#0c4a6e'}
            emissiveIntensity={isSelected('basal-disc') ? 0.75 : 0.1}
            transparent
            opacity={xrayMode ? 0.42 : 0.78}
            roughness={0.28}
          />
        </mesh>

        {/* 7. SIX ANIMATED TENTACLES */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <AnimatedTentacle
            key={i}
            index={i}
            total={6}
            xrayMode={xrayMode}
            selectedPart={selectedPart}
            onSelectPart={onSelectPart}
            curlFactor={tentacleCurl}
            isPrimaryHunter={i === curlTargetTentacle}
            onHoverChange={setHovered}
          />
        ))}

        {/* 8. ASEXUAL BUD (Lower Body Column) */}
        {showBud && (
          <group
            ref={budGroupRef}
            position={[0.21, -0.44, 0.08]}
            rotation={[0, 0.32, -0.82]}
            onClick={handleClick('bud')}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(true);
            }}
            onPointerOut={() => setHovered(false)}
          >
            {/* Bud Outer Epidermis */}
            <mesh position={[0, 0.25, 0]}>
              <cylinderGeometry args={[0.085, 0.11, 0.55, 20]} />
              <meshPhysicalMaterial
                color={isSelected('bud') ? '#ec4899' : '#bae6fd'}
                emissive={isSelected('bud') ? '#db2777' : '#0284c7'}
                emissiveIntensity={isSelected('bud') ? 0.65 : 0.1}
                transparent
                opacity={xrayMode ? 0.35 : 0.65}
                roughness={0.2}
              />
            </mesh>
            {/* Bud Inner Gastrodermis */}
            <mesh position={[0, 0.24, 0]}>
              <cylinderGeometry args={[0.048, 0.068, 0.5, 16]} />
              <meshStandardMaterial
                color="#f472b6"
                emissive="#be185d"
                emissiveIntensity={isSelected('bud') ? 0.6 : 0.2}
                transparent
                opacity={0.7}
              />
            </mesh>
            {/* Bud Hypostome */}
            <mesh position={[0, 0.56, 0]}>
              <coneGeometry args={[0.085, 0.12, 16]} />
              <meshPhysicalMaterial
                color={isSelected('bud') ? '#f43f5e' : '#7dd3fc'}
                transparent
                opacity={0.75}
              />
            </mesh>
            {/* Bud Mini Tentacles */}
            {[0, 1, 2, 3, 4].map((bi) => {
              const ba = (bi / 5) * Math.PI * 2;
              return (
                <mesh
                  key={`bt-${bi}`}
                  position={[Math.cos(ba) * 0.14, 0.64, Math.sin(ba) * 0.14]}
                  rotation={[Math.sin(ba) * 0.65, 0, -Math.cos(ba) * 0.65]}
                >
                  <cylinderGeometry args={[0.012, 0.022, 0.3, 8]} />
                  <meshStandardMaterial
                    color={isSelected('bud') ? '#fb7185' : '#7dd3fc'}
                    transparent
                    opacity={0.8}
                  />
                </mesh>
              );
            })}
          </group>
        )}

        {/* 9. DIGESTED PREY / ENZYME PARTICLES INSIDE CAVITY (for Feeding Lab) */}
        {preyPositionInCavity !== null && (
          <group position={[0, preyPositionInCavity, 0]}>
            <mesh>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial
                color={enzymeGlow > 0.4 ? '#fb923c' : '#f97316'}
                emissive="#ea580c"
                emissiveIntensity={0.45}
                transparent
                opacity={Math.max(0.25, 0.9 - enzymeGlow * 0.55)}
              />
            </mesh>
            {/* Released enzyme / nutrient fragments */}
            {enzymeGlow > 0.15 &&
              [0, 1, 2, 3, 4, 5].map((pi) => {
                const a = (pi / 6) * Math.PI * 2;
                return (
                  <mesh
                    key={`frag-${pi}`}
                    position={[
                      Math.cos(a) * (0.09 + enzymeGlow * 0.08),
                      Math.sin(a * 2) * 0.15,
                      Math.sin(a) * (0.09 + enzymeGlow * 0.08),
                    ]}
                  >
                    <sphereGeometry args={[0.024, 8, 8]} />
                    <meshStandardMaterial
                      color={absorptionGlow > 0.3 ? '#a855f7' : '#14b8a6'}
                      emissive={absorptionGlow > 0.3 ? '#9333ea' : '#0d9488'}
                      emissiveIntensity={0.9}
                    />
                  </mesh>
                );
              })}
          </group>
        )}
      </group>
    </group>
  );
};
