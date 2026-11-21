import React, { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-slate-50 p-8 text-center text-slate-600">
            <div>
              <p className="font-semibold text-slate-900">โหมดแสดงผล 3D WebGL ไม่พร้อมใช้งานชั่วคราว</p>
              <p className="mt-1 text-sm">กรุณาตรวจสอบว่าเบราว์เซอร์เปิดใช้งาน Hardware Acceleration / WebGL</p>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

interface CanvasStageProps {
  children: ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
  className?: string;
  backgroundColor?: string;
  eager?: boolean;
}

export const CanvasStage: React.FC<CanvasStageProps> = ({
  children,
  cameraPosition = [0, 0.7, 5.1],
  fov = 40,
  className = '',
  backgroundColor = '#f4f9ff',
  eager = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(
    () => eager || typeof IntersectionObserver === 'undefined'
  );
  const [hasEntered, setHasEntered] = useState(
    () => eager || typeof IntersectionObserver === 'undefined'
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasEntered(true);
        }
      },
      { rootMargin: '320px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <WebGLErrorBoundary>
      <div
        ref={containerRef}
        className={`relative h-full w-full ${className}`}
        style={{ backgroundColor }}
      >
        {hasEntered ? (
          <Canvas
            dpr={[1, 2]}
            frameloop={inView ? 'always' : 'never'}
            camera={{ position: cameraPosition, fov, near: 0.1, far: 100 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          >
            <color attach="background" args={[backgroundColor]} />
            <ambientLight intensity={0.85} color="#f8fafc" />
            <directionalLight position={[5, 8, 6]} intensity={1.35} color="#ffffff" />
            <directionalLight position={[-6, 3, -4]} intensity={0.75} color="#bae6fd" />
            <pointLight position={[0, -2.5, 3]} intensity={0.55} color="#99f6e4" />

            {/* Procedural museum studio reflections without external HDR fetches */}
            <Environment resolution={128} frames={1}>
              <Lightformer
                form="rect"
                intensity={2.2}
                color="#ffffff"
                scale={[8, 4, 1]}
                position={[0, 5, 4]}
                rotation={[Math.PI / 3, 0, 0]}
              />
              <Lightformer
                form="circle"
                intensity={1.6}
                color="#e0f2fe"
                scale={[5, 5, 1]}
                position={[-5, 2, 2]}
                rotation={[0, Math.PI / 2, 0]}
              />
              <Lightformer
                form="circle"
                intensity={1.2}
                color="#ccfbf1"
                scale={[4, 4, 1]}
                position={[5, 1, -2]}
                rotation={[0, -Math.PI / 2, 0]}
              />
            </Environment>

            {children}
          </Canvas>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs font-mono text-slate-400">
            กำลังเตรียมโมเดล 3 มิติ...
          </div>
        )}
      </div>
    </WebGLErrorBoundary>
  );
};
