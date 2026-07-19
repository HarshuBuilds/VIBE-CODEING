'use client';

import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Car } from '@/types';
import { useCameraControls, useEnvironment, useContactShadows } from '@/hooks/useThree';

// 3D Garage Scene
const GarageScene = ({ cars }: { cars: Car[] }) => {
  const { camera, gl } = useThree();
  const { ui: { camera: cameraState, autoRotate } } = useStore();
  const { contactShadows } = useContactShadows();
  const { environments, background, fog, ambientIntensity, directionalLight } = useEnvironment();

  const controlsRef = useRef<any>(null);
  const carGroupRef = useRef<THREE.Group>(null);

  // Position cars in a circle
  const carPositions = useRef<
    { position: [number, number, number]; rotation: [number, number, number] }[]
  >(
    cars.map((_, index) => {
      const angle = (index / cars.length) * Math.PI * 2;
      const radius = 8;
      return {
        position: [
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        rotation: [0, angle + Math.PI / 2, 0] as [number, number, number],
      };
    })
  ).current;

  // Animate cars
  useFrame((state) => {
    if (carGroupRef.current) {
      carGroupRef.current.rotation.y += 0.002;
    }

    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
      controlsRef.current.autoRotateSpeed = 0.5;
    }
  });

  return (
    <>
      {/* Scene setup */}
      <color attach="background" args={[background]} />
      {fog && <fog attach="fog" args={[fog.color, fog.near, fog.far]} />}
      
      <ambientLight intensity={ambientIntensity} />
      <directionalLight {...directionalLight} />
      
      <Environment files={environments.studio} />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#1a1a1f"
          metalness={0.3}
          roughness={0.1}
        />
      </mesh>

      {/* Reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.9, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#2a2a2f"
          metalness={0.9}
          roughness={0.05}
        />
      </mesh>

      {/* Car group */}
      <group ref={carGroupRef}>
        {cars.map((car, index) => (
          <group
            key={car.id}
            position={carPositions[index].position}
            rotation={carPositions[index].rotation}
          >
            {/* Placeholder car model */}
            <group>
              <mesh>
                <boxGeometry args={[2, 1, 4]} />
                <meshStandardMaterial
                  color="#333333"
                  metalness={0.8}
                  roughness={0.2}
                />
              </mesh>
              <mesh position={[0, 0.5, 2]}>
                <boxGeometry args={[1.5, 1, 0.5]} />
                <meshStandardMaterial color="#ff0000" />
              </mesh>
              <mesh position={[0, 0.5, -2]}>
                <boxGeometry args={[1.5, 1, 0.5]} />
                <meshStandardMaterial color="#ff0000" />
              </mesh>
            </group>

            {/* Car label */}
            <group position={[0, 2, 0]}>
              <mesh>
                <planeGeometry args={[4, 1]} />
                <meshBasicMaterial color="#0a0a0f" transparent opacity={0.8} />
              </mesh>
              {/* Text would be added here in a real implementation */}
            </group>
          </group>
        ))}
      </group>

      {/* Contact shadows */}
      {contactShadows}

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

      {/* Light helpers (for debugging) */}
      {/* <gridHelper args={[50, 50]} /> */}
      {/* <axesHelper args={[5]} /> */}
    </>
  );
};

// Garage 3D View component
interface Garage3DProps {
  cars: Car[];
}

export const Garage3D = ({ cars }: Garage3DProps) => {
  const { setCurrentView } = useStore();

  // Set view to 3d-garage
  useEffect(() => {
    setCurrentView('3d-garage');
  }, [setCurrentView]);

  if (cars.length === 0) {
    return (
      <div className="empty-state py-16">
        <div className="empty-icon">
          <svg className="w-12 h-12 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-white mt-4">No Cars Found</h2>
        <p className="text-dark-400 mt-2">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-[80vh] min-h-[600px] w-full"
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
        <GarageScene cars={cars} />
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">3D Garage</h2>
            <p className="text-dark-400">{cars.length} cars in view</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-dark-800/80 border border-dark-600/50 rounded-lg text-sm font-medium hover:bg-dark-700/80 transition-colors">
              Reset View
            </button>
            <button className="px-4 py-2 bg-dark-800/80 border border-dark-600/50 rounded-lg text-sm font-medium hover:bg-dark-700/80 transition-colors">
              Toggle Auto-Rotate
            </button>
          </div>
        </div>
      </div>

      {/* Car List Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="bg-dark-900/80 backdrop-blur-md border border-dark-700/50 rounded-xl p-4 max-h-[300px] overflow-y-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Cars in Garage</h3>
          <div className="space-y-3">
            {cars.map((car) => (
              <div
                key={car.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-800/80 transition-colors cursor-pointer"
              >
                <div className="w-10 h-6 bg-dark-700/80 rounded" />
                <div className="flex-1">
                  <div className="font-medium text-white">{car.name}</div>
                  <div className="text-sm text-dark-400">{car.brand}</div>
                </div>
                <div className="text-sm text-dark-400">{car.specs.horsepower} hp</div>
              </div>
            ))}
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

export default Garage3D;
