'use client';

import { useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Car } from '@/types';
import { useEnvironment, useContactShadows, useCarAnimations } from '@/hooks/useThree';
import { formatCarSpecs } from '@/utils';
import { ConfiguratorPanel } from './ConfiguratorPanel';

// Configurator Scene
const ConfiguratorScene = ({ car }: { car: Car }) => {
  const { camera, gl } = useThree();
  const {
    ui: { camera: cameraState, autoRotate, lighting },
    scene: { showFloor, showEnvironment, showShadows, showReflections },
  } = useStore();

  const { contactShadows } = useContactShadows();
  const { environments, background, fog, ambientIntensity, directionalLight } = useEnvironment();
  const { groupRef } = useCarAnimations(car);

  const controlsRef = useRef<any>(null);
  const carRef = useRef<THREE.Group>(null);

  // Animate car
  useFrame((state) => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
      controlsRef.current.autoRotateSpeed = 0.5;
    }

    // Slight car bounce
    if (carRef.current) {
      carRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.01;
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

      {/* Car group */}
      <group ref={carRef} position={[0, 0, 0]}>
        <group ref={groupRef}>
          {/* Car model with configurable parts */}
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
            <mesh position={[-1.5, 0.5, 3]} name="wheel_front_left">
              <cylinderGeometry args={[0.5, 0.5, 0.8, 32]} />
              <meshStandardMaterial
                color={car.config.wheelColor}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            <mesh position={[1.5, 0.5, 3]} name="wheel_front_right">
              <cylinderGeometry args={[0.5, 0.5, 0.8, 32]} />
              <meshStandardMaterial
                color={car.config.wheelColor}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            <mesh position={[-1.5, 0.5, -3]} name="wheel_rear_left">
              <cylinderGeometry args={[0.5, 0.5, 0.8, 32]} />
              <meshStandardMaterial
                color={car.config.wheelColor}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            <mesh position={[1.5, 0.5, -3]} name="wheel_rear_right">
              <cylinderGeometry args={[0.5, 0.5, 0.8, 32]} />
              <meshStandardMaterial
                color={car.config.wheelColor}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>

            {/* Caliper accents */}
            <mesh position={[-1.5, 0.5, 3.4]}>
              <boxGeometry args={[0.1, 0.3, 0.1]} />
              <meshStandardMaterial color={car.config.caliperColor} />
            </mesh>
            <mesh position={[1.5, 0.5, 3.4]}>
              <boxGeometry args={[0.1, 0.3, 0.1]} />
              <meshStandardMaterial color={car.config.caliperColor} />
            </mesh>
            <mesh position={[-1.5, 0.5, -3.4]}>
              <boxGeometry args={[0.1, 0.3, 0.1]} />
              <meshStandardMaterial color={car.config.caliperColor} />
            </mesh>
            <mesh position={[1.5, 0.5, -3.4]}>
              <boxGeometry args={[0.1, 0.3, 0.1]} />
              <meshStandardMaterial color={car.config.caliperColor} />
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

            {/* Doors */}
            <mesh position={[-1.8, 1, 0]}>
              <boxGeometry args={[0.2, 1.5, 3]} />
              <meshStandardMaterial
                color={car.config.paintColor}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[1.8, 1, 0]}>
              <boxGeometry args={[0.2, 1.5, 3]} />
              <meshStandardMaterial
                color={car.config.paintColor}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>

            {/* Spoiler */}
            {car.config.hasSpoiler && (
              <mesh position={[0, 2, -4.5]}>
                <boxGeometry args={[2, 0.2, 0.5]} />
                <meshStandardMaterial
                  color={car.config.paintColor}
                  metalness={0.8}
                  roughness={0.2}
                />
              </mesh>
            )}

            {/* Windows with tint */}
            <mesh position={[0, 1.5, 0]}>
              <boxGeometry args={[3.3, 0.8, 2]} />
              <meshStandardMaterial
                color={car.config.windowTint === 'none' ? '#88ccee' : 
                      car.config.windowTint === 'light' ? '#6699bb' :
                      car.config.windowTint === 'medium' ? '#446688' : '#223344'}
                transparent
                opacity={0.6}
              />
            </mesh>
          </group>
        </group>
      </group>

      {/* Contact shadows */}
      {showShadows && contactShadows}

      {/* Orbit controls */}
      <OrbitControls
        ref={controlsRef}
        args={[camera, gl.domElement]}
        enableDamping
        dampingFactor={0.05}
        minDistance={3}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2 + 0.1}
        minPolarAngle={Math.PI / 4}
      />
    </>
  );
};

// Configurator component
interface ConfiguratorProps {
  car: Car;
}

export const Configurator = ({ car }: ConfiguratorProps) => {
  const { setCurrentView, selectCar } = useStore();
  const [activeTab, setActiveTab] = useState<'paint' | 'wheels' | 'interior' | 'extras'>('paint');

  // Set view to configurator
  useEffect(() => {
    setCurrentView('configurator');
    selectCar(car.id);
  }, [setCurrentView, selectCar, car.id]);

  // Format specs
  const specs = formatCarSpecs(car.specs);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Configure {car.name}</h1>
            <p className="text-dark-400 mt-2">
              Customize your dream car with various options and see the changes in real-time.
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3D Canvas */}
        <div className="lg:col-span-2">
          <div className="relative h-[70vh] min-h-[500px] w-full">
            <Canvas
              camera={{ position: [0, 2, 8], fov: 50, near: 0.1, far: 1000 }}
              gl={{ 
                antialias: true,
                alpha: false,
                powerPreference: 'high-performance',
              }}
              style={{ background: 'transparent' }}
            >
              <ConfiguratorScene car={car} />
              <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
            </Canvas>

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
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-[calc(var(--header-height)+2rem)]">
            {/* Car Info Card */}
            <div className="bg-dark-900/80 backdrop-blur-md border border-dark-700/50 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-10 bg-dark-700/80 rounded-lg" />
                <div>
                  <h3 className="text-lg font-bold text-white">{car.name}</h3>
                  <p className="text-dark-400">{car.brand} {car.model}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-dark-400">Horsepower</div>
                  <div className="font-semibold text-white">{specs.horsepower}</div>
                </div>
                <div>
                  <div className="text-dark-400">Price</div>
                  <div className="font-semibold text-white">{specs.price}</div>
                </div>
                <div>
                  <div className="text-dark-400">Year</div>
                  <div className="font-semibold text-white">{specs.year}</div>
                </div>
                <div>
                  <div className="text-dark-400">Engine</div>
                  <div className="font-semibold text-white truncate">{specs.engine}</div>
                </div>
              </div>
            </div>

            {/* Configuration Options */}
            <ConfiguratorPanel car={car} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Configurator;
