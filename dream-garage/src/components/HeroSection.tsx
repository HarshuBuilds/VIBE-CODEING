'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { cars } from '@/data/cars';
import { useStore } from '@/store/useStore';
import { creator } from '@/data/creator';

// Floating particles component
const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 50;

  const particlesPosition = Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 20,
    y: (Math.random() - 0.5) * 10,
    z: (Math.random() - 0.5) * 20,
  }));

  const particles = useRef<THREE.BufferGeometry>(null);

  useFrame((state) => {
    if (!particles.current) return;

    const positions = particles.current.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.01;
      positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.01;
      positions[i * 3 + 2] += Math.cos(state.clock.elapsedTime * 0.4 + i) * 0.01;
    }

    particles.current.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry ref={particles}>
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array(particlesPosition.flatMap((p) => [p.x, p.y, p.z]))}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Rotating car model (placeholder)
const CarModel = ({ index }: { index: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { autoRotate } = useStore();

  useFrame((state) => {
    if (groupRef.current) {
      if (autoRotate) {
        groupRef.current.rotation.y += 0.005;
      }
    }
  });

  // Placeholder geometry (will be replaced with actual GLB models)
  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
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
  );
};

// Hero 3D Scene
const HeroScene = () => {
  const { autoRotate } = useStore();
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  // Cycle through cars
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarIndex((prev) => (prev + 1) % cars.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} />
      
      <Environment files="/assets/hdri/studio.hdr" />
      
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

      {/* Car model */}
      <CarModel index={currentCarIndex} />
      
      {/* Particles */}
      <Particles />

      {/* Orbit controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
      />

      {/* Contact shadows */}
      <ContactShadows
        position={[0, -1.9, 0]}
        opacity={0.6}
        scale={20}
        blur={2}
        far={4}
        resolution={1024}
        color="#000000"
      />
    </>
  );
};

// Hero Section component
interface HeroSectionProps {
  onEnterGarage?: () => void;
}

export const HeroSection = ({ onEnterGarage }: HeroSectionProps) => {
  const router = useRouter();
  const { setCurrentView } = useStore();

  const handleEnterGarage = () => {
    setCurrentView('garage');
    if (onEnterGarage) {
      onEnterGarage();
    } else {
      router.push('/garage');
    }
  };

  return (
    <section className="hero relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-1000/80 via-dark-900/60 to-dark-1000/80 z-0" />

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 2, 12], fov: 50, near: 0.1, far: 1000 }}
          gl={{ 
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
          style={{ background: 'transparent' }}
        >
          <HeroScene />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block mb-6"
          >
            <span className="badge badge-primary">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Premium Experience
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hero-title text-gradient text-shadow-lg"
          >
            MY DREAM GARAGE
          </motion.h1>

          {/* Creator Attribution */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-lg text-primary-400 font-medium mt-2"
          >
            Created by {creator.name}
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-subtitle"
          >
            Performance. Engineering. Legacy.
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-dark-400 mt-4 max-w-2xl mx-auto"
          >
            Explore the world's most iconic cars in stunning 3D. Configure, compare, and admire the finest automotive masterpieces.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <button
              onClick={handleEnterGarage}
              className="btn btn-primary px-8 py-4 text-lg font-semibold hover-scale press-scale"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              Enter Garage
            </button>
            <a
              href={creator.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass px-8 py-4 text-lg font-semibold hover-scale"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Visit My Portfolio
            </a>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-8 mt-16"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-white">{cars.length}</div>
              <div className="text-sm text-dark-400 mt-1">Dream Cars</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">
                {Math.max(...cars.map((c) => c.specs.horsepower))}
              </div>
              <div className="text-sm text-dark-400 mt-1">Max Horsepower</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">
                {cars.reduce((sum, c) => sum + c.specs.horsepower, 0)}
              </div>
              <div className="text-sm text-dark-400 mt-1">Total Horsepower</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-white/60 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
