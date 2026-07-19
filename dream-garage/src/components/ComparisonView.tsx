'use client';

import { useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Car } from '@/types';
import { useEnvironment, useContactShadows } from '@/hooks/useThree';
import { formatCarSpecs, compareCars } from '@/utils';

// Comparison Scene
const ComparisonScene = ({ cars }: { cars: Car[] }) => {
  const { camera, gl } = useThree();
  const {
    ui: { camera: cameraState, autoRotate, lighting },
    scene: { showFloor, showEnvironment, showShadows, showReflections },
  } = useStore();

  const { contactShadows } = useContactShadows();
  const { environments, background, fog, ambientIntensity, directionalLight } = useEnvironment();

  const controlsRef = useRef<any>(null);

  // Position cars side by side
  const carPositions = [
    { position: [-3, 0, 0] as [number, number, number], rotation: [0, Math.PI / 4, 0] as [number, number, number] },
    { position: [3, 0, 0] as [number, number, number], rotation: [0, -Math.PI / 4, 0] as [number, number, number] },
  ];

  // Animate cars
  useFrame((state) => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
      controlsRef.current.autoRotateSpeed = 0.3;
    }
  });

  return (
    <>
      {/* Scene setup */}
      <color attach="background" args={[background]} />
      {fog && showFloor && <fog attach="fog" args={[fog.color, fog.near, fog.far]} />}
      
      <ambientLight intensity={ambientIntensity} />
      <directionalLight {...directionalLight} />
      
      {showEnvironment && (
        <Environment files={environments[lighting.type as keyof typeof environments]} />
      )}

      {/* Floor */}
      {showFloor && (
        <>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial
              color="#1a1a1f"
              metalness={0.3}
              roughness={0.1}
            />
          </mesh>
          
          {/* Reflective floor */}
          {showReflections && (
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.9, 0]}>
              <planeGeometry args={[30, 30]} />
              <meshStandardMaterial
                color="#2a2a2f"
                metalness={0.9}
                roughness={0.05}
              />
            </mesh>
          )}
        </>
      )}

      {/* Cars */}
      {cars.map((car, index) => (
        <group
          key={car.id}
          position={carPositions[index].position}
          rotation={carPositions[index].rotation}
        >
          {/* Car model */}
          <group>
            {/* Body */}
            <mesh>
              <boxGeometry args={[4, 1.5, 8]} />
              <meshStandardMaterial
                color={car.config.paintColor}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>

            {/* Roof */}
            <mesh position={[0, 1.75, 0]}>
              <boxGeometry args={[3.5, 0.5, 6]} />
              <meshStandardMaterial
                color={car.config.paintColor}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>

            {/* Front */}
            <mesh position={[0, 1, 4.5]}>
              <boxGeometry args={[3.5, 1, 0.5]} />
              <meshStandardMaterial
                color={car.config.paintColor}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>

            {/* Rear */}
            <mesh position={[0, 1, -4.5]}>
              <boxGeometry args={[3.5, 1, 0.5]} />
              <meshStandardMaterial
                color={car.config.paintColor}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>

            {/* Wheels */}
            <mesh position={[-1.5, 0.5, 3]}>
              <cylinderGeometry args={[0.5, 0.5, 0.8, 32]} />
              <meshStandardMaterial
                color={car.config.wheelColor}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            <mesh position={[1.5, 0.5, 3]}>
              <cylinderGeometry args={[0.5, 0.5, 0.8, 32]} />
              <meshStandardMaterial
                color={car.config.wheelColor}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            <mesh position={[-1.5, 0.5, -3]}>
              <cylinderGeometry args={[0.5, 0.5, 0.8, 32]} />
              <meshStandardMaterial
                color={car.config.wheelColor}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            <mesh position={[1.5, 0.5, -3]}>
              <cylinderGeometry args={[0.5, 0.5, 0.8, 32]} />
              <meshStandardMaterial
                color={car.config.wheelColor}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>

            {/* Headlights */}
            <mesh position={[-1.2, 1.2, 4.7]}>
              <boxGeometry args={[0.4, 0.4, 0.2]} />
              <meshBasicMaterial color="#ffffcc" />
            </mesh>
            <mesh position={[1.2, 1.2, 4.7]}>
              <boxGeometry args={[0.4, 0.4, 0.2]} />
              <meshBasicMaterial color="#ffffcc" />
            </mesh>

            {/* Brake lights */}
            <mesh position={[-1.2, 1.2, -4.7]}>
              <boxGeometry args={[0.4, 0.4, 0.2]} />
              <meshBasicMaterial color="#ff0000" />
            </mesh>
            <mesh position={[1.2, 1.2, -4.7]}>
              <boxGeometry args={[0.4, 0.4, 0.2]} />
              <meshBasicMaterial color="#ff0000" />
            </mesh>
          </group>

          {/* Car label */}
          <group position={[0, 3, 0]}>
            <mesh>
              <planeGeometry args={[6, 1.5]} />
              <meshBasicMaterial color="#0a0a0f" transparent opacity={0.8} />
            </mesh>
          </group>
        </group>
      ))}

      {/* Contact shadows */}
      {showShadows && contactShadows}

      {/* Orbit controls */}
      <OrbitControls
        ref={controlsRef}
        args={[camera, gl.domElement]}
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={30}
        maxPolarAngle={Math.PI / 2 + 0.1}
        minPolarAngle={Math.PI / 4}
      />
    </>
  );
};

// Comparison View component
interface ComparisonViewProps {
  cars: Car[];
  comparisonData?: any;
}

export const ComparisonView = ({ cars, comparisonData }: ComparisonViewProps) => {
  const { setCurrentView } = useStore();

  // Set view to comparison
  useEffect(() => {
    setCurrentView('comparison');
  }, [setCurrentView]);

  // Format specs
  const specs = cars.map((car) => formatCarSpecs(car.specs));

  if (cars.length < 2) {
    return (
      <div className="empty-state py-16">
        <div className="empty-icon">
          <svg className="w-12 h-12 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-white mt-4">Select 2 Cars to Compare</h2>
        <p className="text-dark-400 mt-2">Please select 2 cars from the garage to compare.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-[70vh] min-h-[500px] w-full"
    >
      {/* Canvas */}
      <Canvas
        camera={{ position: [0, 4, 15], fov: 50, near: 0.1, far: 1000 }}
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <ComparisonScene cars={cars} />
        <PerspectiveCamera makeDefault position={[0, 4, 15]} fov={50} />
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">3D Comparison</h2>
            <p className="text-dark-400">
              {cars[0]?.name} vs {cars[1]?.name}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-dark-800/80 border border-dark-600/50 rounded-lg text-sm font-medium hover:bg-dark-700/80 transition-colors">
              Reset View
            </button>
            <button className="px-4 py-2 bg-dark-800/80 border border-dark-600/50 rounded-lg text-sm font-medium hover:bg-dark-700/80 transition-colors">
              Fullscreen
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Stats Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="bg-dark-900/80 backdrop-blur-md border border-dark-700/50 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Comparison</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-dark-400">Horsepower</div>
              <div className="font-semibold text-white">{specs[0].horsepower}</div>
              <div className="text-dark-400">vs</div>
              <div className="font-semibold text-white">{specs[1].horsepower}</div>
            </div>
            <div className="text-center">
              <div className="text-dark-400">0-100 km/h</div>
              <div className="font-semibold text-white">{specs[0].acceleration}</div>
              <div className="text-dark-400">vs</div>
              <div className="font-semibold text-white">{specs[1].acceleration}</div>
            </div>
            <div className="text-center">
              <div className="text-dark-400">Top Speed</div>
              <div className="font-semibold text-white">{specs[0].topSpeed}</div>
              <div className="text-dark-400">vs</div>
              <div className="font-semibold text-white">{specs[1].topSpeed}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-dark-900/80 backdrop-blur-md border border-dark-700/50 rounded-xl p-4 text-sm text-dark-400">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white">Controls:</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <kbd className="kbd">Left Click</kbd>
              <span>Rotate</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="kbd">Right Click</kbd>
              <span>Pan</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="kbd">Scroll</kbd>
              <span>Zoom</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="kbd">A</kbd>
              <span>Auto-Rotate</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ComparisonView;
