import { useRef, useEffect, useCallback, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import * as THREE from 'three';
import { useStore, useUI, useScene, useAnimationActions } from '@/store/useStore';
import { Car } from '@/types';

// Custom hook for managing 3D camera controls
export const useCameraControls = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef<any>(null);
  const { autoRotate, fullscreen } = useUI();
  const { setCamera } = useStore();

  // Initialize controls
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
      controlsRef.current.autoRotateSpeed = 0.5;
    }
  }, [autoRotate]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (controlsRef.current) {
        controlsRef.current.update();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset camera to default position
  const resetCamera = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    setCamera({
      position: [0, 2, 8],
      target: [0, 0, 0],
    });
  }, [setCamera]);

  // Smooth camera transition to car
  const focusOnCar = useCallback((position: [number, number, number], duration = 1) => {
    if (controlsRef.current) {
      const controls = controlsRef.current;
      const startPosition = controls.target.clone();
      const endPosition = new THREE.Vector3(...position);

      let progress = 0;
      const startTime = Date.now();

      const animate = () => {
        progress = Math.min((Date.now() - startTime) / (duration * 1000), 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        
        controls.target.lerpVectors(startPosition, endPosition, easedProgress);
        controls.update();

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, []);

  return {
    controlsRef,
    resetCamera,
    focusOnCar,
  };
};

// Custom hook for car animations
export const useCarAnimations = (car: Car | null) => {
  const groupRef = useRef<THREE.Group>(null);
  const { animations } = useStore();
  const { toggleAnimation } = useAnimationActions();

  // Door animation
  const animateDoors = useCallback((open: boolean) => {
    if (!groupRef.current) return;

    const doorLeft = groupRef.current.getObjectByName('door_left') as THREE.Mesh;
    const doorRight = groupRef.current.getObjectByName('door_right') as THREE.Mesh;

    if (doorLeft && doorRight) {
      const targetRotation = open ? Math.PI / 2 : 0;
      const duration = 1;
      let progress = 0;
      const startTime = Date.now();

      const animate = () => {
        progress = Math.min((Date.now() - startTime) / (duration * 1000), 1);
        const easedProgress = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        doorLeft.rotation.y = THREE.MathUtils.lerp(doorLeft.rotation.y, targetRotation, easedProgress);
        doorRight.rotation.y = THREE.MathUtils.lerp(doorRight.rotation.y, -targetRotation, easedProgress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, []);

  // Wheel rotation animation
  const animateWheels = useCallback((speed: number) => {
    if (!groupRef.current) return;

    const wheels = [
      groupRef.current.getObjectByName('wheel_front_left'),
      groupRef.current.getObjectByName('wheel_front_right'),
      groupRef.current.getObjectByName('wheel_rear_left'),
      groupRef.current.getObjectByName('wheel_rear_right'),
    ];

    wheels.forEach((wheel) => {
      if (wheel) {
        wheel.rotation.z += speed * 0.1;
      }
    });
  }, []);

  // Headlight animation
  const animateHeadlights = useCallback((on: boolean) => {
    if (!groupRef.current) return;

    const headlights = [
      groupRef.current.getObjectByName('headlight_left'),
      groupRef.current.getObjectByName('headlight_right'),
    ];

    headlights.forEach((light) => {
      if (light) {
        (light as THREE.Mesh).material = new THREE.MeshBasicMaterial({
          color: on ? 0xffffcc : 0x333333,
          emissive: on ? 0xffffcc : 0x000000,
          emissiveIntensity: on ? 0.5 : 0,
        });
      }
    });
  }, []);

  // Brake light animation
  const animateBrakeLights = useCallback((on: boolean) => {
    if (!groupRef.current) return;

    const brakeLights = [
      groupRef.current.getObjectByName('brake_light_left'),
      groupRef.current.getObjectByName('brake_light_right'),
    ];

    brakeLights.forEach((light) => {
      if (light) {
        (light as THREE.Mesh).material = new THREE.MeshBasicMaterial({
          color: on ? 0xff0000 : 0x330000,
          emissive: on ? 0xff0000 : 0x000000,
          emissiveIntensity: on ? 0.8 : 0,
        });
      }
    });
  }, []);

  // Suspension bounce animation
  const animateSuspension = useCallback((intensity: number = 0.1) => {
    if (!groupRef.current) return;

    const body = groupRef.current.getObjectByName('body') as THREE.Mesh;
    if (body) {
      body.position.y = Math.sin(Date.now() * 0.005) * intensity;
    }
  }, []);

  // Exhaust smoke effect
  const createExhaustSmoke = useCallback(() => {
    if (!groupRef.current) return;

    const exhausts = [
      groupRef.current.getObjectByName('exhaust_left'),
      groupRef.current.getObjectByName('exhaust_right'),
    ];

    exhausts.forEach((exhaust) => {
      if (exhaust) {
        // Create particle system for smoke
        const particleGeometry = new THREE.BufferGeometry();
        const particles = 20;
        const positions = new Float32Array(particles * 3);
        const sizes = new Float32Array(particles);

        for (let i = 0; i < particles; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 0.1;
          positions[i * 3 + 1] = Math.random() * 0.2;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
          sizes[i] = Math.random() * 0.05 + 0.02;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const particleMaterial = new THREE.PointsMaterial({
          color: 0x666666,
          size: 0.05,
          transparent: true,
          opacity: 0.6,
          sizeAttenuation: true,
        });

        const smoke = new THREE.Points(particleGeometry, particleMaterial);
        smoke.position.copy(exhaust.position);
        groupRef.current.add(smoke);

        // Animate particles
        const animate = () => {
          const positions = particleGeometry.attributes.position.array as Float32Array;
          for (let i = 0; i < particles; i++) {
            positions[i * 3 + 1] += 0.01;
            if (positions[i * 3 + 1] > 0.5) {
              positions[i * 3 + 1] = 0;
              positions[i * 3] = (Math.random() - 0.5) * 0.1;
              positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
            }
          }
          particleGeometry.attributes.position.needsUpdate = true;
          requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      }
    });
  }, []);

  return {
    groupRef,
    animateDoors,
    animateWheels,
    animateHeadlights,
    animateBrakeLights,
    animateSuspension,
    createExhaustSmoke,
  };
};

// Custom hook for environment and lighting
export const useEnvironment = () => {
  const { lighting, scene } = useStore();
  const { gl } = useThree();

  // HDRI environments
  const environments = useMemo(() => ({
    day: '/assets/hdri/day.hdr',
    sunset: '/assets/hdri/sunset.hdr',
    night: '/assets/hdri/night.hdr',
    studio: '/assets/hdri/studio.hdr',
    garage: '/assets/hdri/garage.hdr',
    rainy: '/assets/hdri/rainy.hdr',
  }), []);

  // Scene background based on lighting type
  const background = useMemo(() => {
    switch (lighting.type) {
      case 'day':
        return new THREE.Color(0x87CEEB);
      case 'sunset':
        return new THREE.Color(0xFF8C00);
      case 'night':
        return new THREE.Color(0x0a0a0f);
      case 'studio':
        return new THREE.Color(0x1a1a1f);
      case 'garage':
        return new THREE.Color(0x1a1a1f);
      case 'rainy':
        return new THREE.Color(0x4682B4);
      default:
        return new THREE.Color(0x0a0a0f);
    }
  }, [lighting.type]);

  // Fog settings based on scene
  const fog = useMemo(() => {
    if (!scene.showFloor) return null;
    
    return new THREE.Fog(
      scene.fogColor,
      scene.fogDensity > 0 ? 1 / scene.fogDensity : 100
    );
  }, [scene.fogColor, scene.fogDensity, scene.showFloor]);

  // Ambient light intensity based on lighting type
  const ambientIntensity = useMemo(() => {
    switch (lighting.type) {
      case 'day':
        return 0.5;
      case 'sunset':
        return 0.4;
      case 'night':
        return 0.1;
      case 'studio':
        return 0.3;
      case 'garage':
        return 0.2;
      case 'rainy':
        return 0.3;
      default:
        return 0.3;
    }
  }, [lighting.type]);

  // Directional light settings
  const directionalLight = useMemo(() => ({
    position: [5, 10, 7] as [number, number, number],
    intensity: lighting.intensity,
    color: lighting.color,
    castShadow: scene.showShadows,
    shadow: {
      mapSize: [2048, 2048],
      camera: {
        near: 0.5,
        far: 50,
        left: -20,
        right: 20,
        top: 20,
        bottom: -20,
      },
    },
  }), [lighting.intensity, lighting.color, scene.showShadows]);

  return {
    environments,
    background,
    fog,
    ambientIntensity,
    directionalLight,
  };
};

// Custom hook for shadows
export const useShadows = () => {
  const { scene } = useStore();

  const shadows = useMemo(() => {
    if (!scene.showShadows) return null;

    return (
      <AccumulativeShadows
        frames={100}
        alphaTest={0.85}
        opacity={0.8}
        scale={20}
      >
        <RandomizedLight
          amount={4}
          radius={10}
          intensity={1}
          ambient={0.25}
          position={[5, 5, -10]}
        />
      </AccumulativeShadows>
    );
  }, [scene.showShadows]);

  return { shadows };
};

// Custom hook for contact shadows (simpler alternative)
export const useContactShadows = () => {
  const { scene } = useStore();

  const contactShadows = useMemo(() => {
    if (!scene.showShadows) return null;

    return (
      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.6}
        scale={20}
        blur={2}
        far={4}
        resolution={1024}
        color="#000000"
      />
    );
  }, [scene.showShadows]);

  return { contactShadows };
};

// Custom hook for performance optimization
export const usePerformance = () => {
  const { gl, scene, camera } = useThree();
  const { performance } = useStore();

  // Optimize renderer settings
  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.2;
    gl.outputColorSpace = THREE.SRGBColorSpace;

    // Cleanup
    return () => {
      gl.dispose();
    };
  }, [gl]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      gl.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [camera, gl]);

  // Performance monitoring
  const monitorPerformance = useCallback(() => {
    const info = gl.info;
    console.log('Renderer Info:', {
      memory: info.memory,
      programs: info.programs,
      geometries: info.geometries,
      textures: info.textures,
    });
  }, [gl]);

  return { monitorPerformance };
};

// Custom hook for loading 3D models
export const useModelLoader = () => {
  const { gl } = useThree();
  const { setLoading, setError } = useStore();

  const loadModel = useCallback(async (path: string) => {
    setLoading(true);
    setError(null);

    try {
      // In a real implementation, we would use useLoader from @react-three/fiber
      // For now, we'll simulate the loading process
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Return a mock model
      return {
        scene: new THREE.Group(),
        animations: [],
      };
    } catch (error) {
      setError(`Failed to load model: ${error}`);
      console.error('Model loading error:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, gl]);

  return { loadModel };
};

// Custom hook for touch controls
export const useTouchControls = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef<any>(null);

  // Touch event handlers
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!controlsRef.current) return;
    
    if (e.touches.length === 1) {
      // Single touch - rotate
      controlsRef.current.touchStart(e.touches[0]);
    } else if (e.touches.length === 2) {
      // Two touches - zoom/pan
      controlsRef.current.touchStart2(e.touches[0], e.touches[1]);
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!controlsRef.current) return;
    
    if (e.touches.length === 1) {
      controlsRef.current.touchMove(e.touches[0]);
    } else if (e.touches.length === 2) {
      controlsRef.current.touchMove2(e.touches[0], e.touches[1]);
    }
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!controlsRef.current) return;
    controlsRef.current.touchEnd();
  }, []);

  // Register touch events
  useEffect(() => {
    const canvas = gl.domElement;
    
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [gl.domElement, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return { controlsRef };
};

// Custom hook for keyboard shortcuts
export const useKeyboardShortcuts = () => {
  const {
    toggleAutoRotate,
    resetCamera,
    toggleStats,
    toggleConfigurator,
    toggleSound,
    toggleMusic,
  } = useStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'r':
        case 'R':
          resetCamera();
          break;
        case 'a':
        case 'A':
          toggleAutoRotate();
          break;
        case 's':
        case 'S':
          toggleStats();
          break;
        case 'c':
        case 'C':
          toggleConfigurator();
          break;
        case 'm':
        case 'M':
          toggleSound();
          break;
        case 'n':
        case 'N':
          toggleMusic();
          break;
        case 'Escape':
          // Close modals, etc.
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    resetCamera,
    toggleAutoRotate,
    toggleStats,
    toggleConfigurator,
    toggleSound,
    toggleMusic,
  ]);
};

export default {
  useCameraControls,
  useCarAnimations,
  useEnvironment,
  useShadows,
  useContactShadows,
  usePerformance,
  useModelLoader,
  useTouchControls,
  useKeyboardShortcuts,
};
