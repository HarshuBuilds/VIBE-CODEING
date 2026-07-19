'use client';

import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Car } from '@/types';
import { useCameraControls, useEnvironment, useContactShadows, useCarAnimations } from '@/hooks/useThree';
import { formatCarSpecs } from '@/utils';

// Car Showroom Scene
const CarShowroomScene = ({ car }: { car: Car }) => {
  const { camera, gl } = useThree();
  const {
    ui: { camera: cameraState, autoRotate, lighting },
    scene: { showFloor, showEnvironment, showShadows, showReflections },
  } = useStore();

  const { contactShadows } = useContactShadows();
  const { environments, background, fog, ambientIntensity, directionalLight } = useEnvironment();
  const { groupRef, animateDoors, animateWheels, animateHeadlights, animateBrakeLights } = useCarAnimations(car);

  const controlsRef = useRef<any>(null);
  const carRef = useRef<THREE.Group>(null);

  // Animation states
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [headlightsOn, setHeadlightsOn] = useState(false);
  const [brakeLightsOn, setBrakeLightsOn] = useState(false);
  const [wheelsMoving, setWheelsMoving] = useState(false);

  // Toggle animations
  useEffect(() => {
    animateDoors(doorsOpen);
    animateHeadlights(headlightsOn);
    animateBrakeLights(brakeLightsOn);
  }, [doorsOpen, headlightsOn, brakeLightsOn, animateDoors, animateHeadlights, animateBrakeLights]);

  // Animate wheels
  useFrame((state) => {
    if (wheelsMoving) {
      animateWheels(0.1);
    }

    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
      controlsRef.current.autoRotateSpeed = 0.5;
    }

    // Slight car bounce
    if (carRef.current) {
      carRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.01;
    }
  });

  // Reset camera to focus on car
  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

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
          {/* Placeholder car model with customizable parts */}
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
            <mesh
              position={[-1.5, 0.5, 3]}
              name="wheel_front_left"
            >
              <cylinderGeometry args={[0.5, 0.5, 0.8, 32]} />
              <meshStandardMaterial
                color={car.config.wheelColor}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            <mesh
              position={[1.5, 0.5, 3]}
              name="wheel_front_right"
            >
              <cylinderGeometry args={[0.5, 0.5, 0.8, 32]} />
              <meshStandardMaterial
                color={car.config.wheelColor}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            <mesh
              position={[-1.5, 0.5, -3]}
              name="wheel_rear_left"
            >
              <cylinderGeometry args={[0.5, 0.5, 0.8, 32]} />
              <meshStandardMaterial
                color={car.config.wheelColor}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            <mesh
              position={[1.5, 0.5, -3]}
              name="wheel_rear_right"
            >
              <cylinderGeometry args={[0.5, 0.5, 0.8, 32]} />
              <meshStandardMaterial
                color={car.config.wheelColor}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>

            {/* Headlights */}
            <mesh
              position={[-1.2, 1.2, 4.7]}
              name="headlight_left"
            >
              <boxGeometry args={[0.4, 0.4, 0.2]} />
              <meshBasicMaterial
                color={headlightsOn ? '#ffffcc' : '#333333'}
              />
            </mesh>
            <mesh
              position={[1.2, 1.2, 4.7]}
              name="headlight_right"
            >
              <boxGeometry args={[0.4, 0.4, 0.2]} />
              <meshBasicMaterial
                color={headlightsOn ? '#ffffcc' : '#333333'}
              />
            </mesh>

            {/* Brake lights */}
            <mesh
              position={[-1.2, 1.2, -4.7]}
              name="brake_light_left"
            >
              <boxGeometry args={[0.4, 0.4, 0.2]} />
              <meshBasicMaterial
                color={brakeLightsOn ? '#ff0000' : '#330000'}
              />
            </mesh>
            <mesh
              position={[1.2, 1.2, -4.7]}
              name="brake_light_right"
            >
              <boxGeometry args={[0.4, 0.4, 0.2]} />
              <meshBasicMaterial
                color={brakeLightsOn ? '#ff0000' : '#330000'}
              />
            </mesh>

            {/* Doors */}
            <mesh
              position={[-1.8, 1, 0]}
              name="door_left"
            >
              <boxGeometry args={[0.2, 1.5, 3]} />
              <meshStandardMaterial
                color={car.config.paintColor}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            <mesh
              position={[1.8, 1, 0]}
              name="door_right"
            >
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

      {/* Light helpers (for debugging) */}
      {/* <gridHelper args={[20, 20]} /> */}
      {/* <axesHelper args={[5]} /> */}
    </>
  );
};

// Car Showroom component
interface CarShowroomProps {
  car: Car;
}

export const CarShowroom = ({ car }: CarShowroomProps) => {
  const { setCurrentView, selectCar } = useStore();
  const [activeTab, setActiveTab] = useState<'view' | 'animate' | 'lighting'>('view');

  // Set view to showroom
  useEffect(() => {
    setCurrentView('showroom');
    selectCar(car.id);
  }, [setCurrentView, selectCar, car.id]);

  // Format specs
  const specs = formatCarSpecs(car.specs);

  // Animation controls
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [headlightsOn, setHeadlightsOn] = useState(false);
  const [brakeLightsOn, setBrakeLightsOn] = useState(false);
  const [wheelsMoving, setWheelsMoving] = useState(false);

  // Toggle animations
  const toggleDoors = () => setDoorsOpen(!doorsOpen);
  const toggleHeadlights = () => setHeadlightsOn(!headlightsOn);
  const toggleBrakeLights = () => setBrakeLightsOn(!brakeLightsOn);
  const toggleWheels = () => setWheelsMoving(!wheelsMoving);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-[70vh] min-h-[500px] w-full"
    >
      {/* Canvas */}
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50, near: 0.1, far: 1000 }}
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <CarShowroomScene
          car={car}
        />
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{car.name}</h2>
            <p className="text-dark-400">{car.brand} {car.model}</p>
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

      {/* Control Panel */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="bg-dark-900/80 backdrop-blur-md border border-dark-700/50 rounded-xl p-4">
          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('view')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'view'
                  ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                  : 'text-dark-400 hover:text-white hover:bg-dark-800/80'
              }`}
            >
              View
            </button>
            <button
              onClick={() => setActiveTab('animate')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'animate'
                  ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                  : 'text-dark-400 hover:text-white hover:bg-dark-800/80'
              }`}
            >
              Animate
            </button>
            <button
              onClick={() => setActiveTab('lighting')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'lighting'
                  ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                  : 'text-dark-400 hover:text-white hover:bg-dark-800/80'
              }`}
            >
              Lighting
            </button>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'view' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 gap-2"
              >
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-dark-800/80 border border-dark-600/50 rounded-lg text-sm font-medium hover:bg-dark-700/80 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  Reset Camera
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-dark-800/80 border border-dark-600/50 rounded-lg text-sm font-medium hover:bg-dark-700/80 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Toggle Auto-Rotate
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-dark-800/80 border border-dark-600/50 rounded-lg text-sm font-medium hover:bg-dark-700/80 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Zoom In
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-dark-800/80 border border-dark-600/50 rounded-lg text-sm font-medium hover:bg-dark-700/80 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Zoom Out
                </button>
              </motion.div>
            )}

            {activeTab === 'animate' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 gap-2"
              >
                <button
                  onClick={toggleDoors}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    doorsOpen
                      ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                      : 'bg-dark-800/80 text-dark-400 border border-dark-600/50 hover:bg-dark-700/80'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {doorsOpen ? 'Close Doors' : 'Open Doors'}
                </button>
                <button
                  onClick={toggleHeadlights}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    headlightsOn
                      ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                      : 'bg-dark-800/80 text-dark-400 border border-dark-600/50 hover:bg-dark-700/80'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  {headlightsOn ? 'Turn Off' : 'Turn On'}
                </button>
                <button
                  onClick={toggleBrakeLights}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    brakeLightsOn
                      ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                      : 'bg-dark-800/80 text-dark-400 border border-dark-600/50 hover:bg-dark-700/80'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {brakeLightsOn ? 'Brakes Off' : 'Brakes On'}
                </button>
                <button
                  onClick={toggleWheels}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    wheelsMoving
                      ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                      : 'bg-dark-800/80 text-dark-400 border border-dark-600/50 hover:bg-dark-700/80'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  {wheelsMoving ? 'Stop Wheels' : 'Spin Wheels'}
                </button>
              </motion.div>
            )}

            {activeTab === 'lighting' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-3 gap-2"
              >
                {['day', 'sunset', 'night', 'studio', 'garage', 'rainy'].map((type) => (
                  <button
                    key={type}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-dark-800/80 border border-dark-600/50 rounded-lg text-sm font-medium hover:bg-dark-700/80 transition-colors capitalize"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    {type}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
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

export default CarShowroom;
