'use client';

import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { StoreProvider } from '@/store/StoreProvider';

// Three.js Canvas Provider
export const ThreeCanvasProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 50, near: 0.1, far: 1000 }}
      gl={{ 
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
    >
      {children}
    </Canvas>
  );
};

// Main Providers Component
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      {children}
    </StoreProvider>
  );
};

export default Providers;
