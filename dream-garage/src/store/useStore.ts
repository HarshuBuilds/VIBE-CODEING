import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Car, UIState, CameraState, LightingState, SceneSettings, CarAnimation, Notification } from '@/types';
import { cars } from '@/data/cars';

// Default camera state
const defaultCamera: CameraState = {
  position: [0, 2, 8],
  target: [0, 0, 0],
  fov: 50,
  near: 0.1,
  far: 1000,
};

// Default lighting state
const defaultLighting: LightingState = {
  type: 'studio',
  intensity: 1.5,
  color: '#ffffff',
  hdri: '/assets/hdri/studio.hdr',
};

// Default scene settings
const defaultScene: SceneSettings = {
  showFloor: true,
  showEnvironment: true,
  showParticles: true,
  showReflections: true,
  showShadows: true,
  fogDensity: 0.02,
  fogColor: '#0a0a0f',
  bloomIntensity: 0.5,
  bloomThreshold: 0.8,
  depthOfField: false,
  motionBlur: false,
};

// Default car animations
const defaultAnimations: CarAnimation[] = [
  { type: 'doors', enabled: false, speed: 1, intensity: 1 },
  { type: 'headlights', enabled: false, speed: 1, intensity: 1 },
  { type: 'brakeLights', enabled: false, speed: 1, intensity: 1 },
  { type: 'steering', enabled: false, speed: 1, intensity: 1 },
  { type: 'wheels', enabled: false, speed: 1, intensity: 1 },
  { type: 'engine', enabled: false, speed: 1, intensity: 1 },
  { type: 'suspension', enabled: false, speed: 1, intensity: 1 },
  { type: 'exhaust', enabled: false, speed: 1, intensity: 1 },
];

// Initial UI state
const initialUIState: UIState = {
  currentView: 'landing',
  selectedCarId: null,
  comparisonCars: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  filterBrand: null,
  filterCountry: null,
  sortBy: 'name',
  sortOrder: 'asc',
  viewMode: 'grid',
  showStats: false,
  showConfigurator: false,
  autoRotate: true,
  fullscreen: false,
  lighting: defaultLighting,
  camera: defaultCamera,
  soundEnabled: true,
  musicEnabled: false,
  notifications: [],
};

// Store interface
export interface AppStore {
  // State
  cars: Car[];
  selectedCar: Car | null;
  ui: UIState;
  scene: SceneSettings;
  animations: CarAnimation[];
  favorites: string[];
  
  // Actions
  // Car actions
  setCars: (cars: Car[]) => void;
  selectCar: (carId: string | null) => void;
  updateCarConfig: (carId: string, config: Partial<Car['config']>) => void;
  toggleFavorite: (carId: string) => void;
  
  // UI actions
  setCurrentView: (view: UIState['currentView']) => void;
  setSearchQuery: (query: string) => void;
  setFilterBrand: (brand: string | null) => void;
  setFilterCountry: (country: string | null) => void;
  setSortBy: (sortBy: UIState['sortBy']) => void;
  setSortOrder: (order: UIState['sortOrder']) => void;
  setViewMode: (mode: UIState['viewMode']) => void;
  toggleStats: () => void;
  toggleConfigurator: () => void;
  toggleAutoRotate: () => void;
  toggleFullscreen: () => void;
  setLighting: (lighting: Partial<LightingState>) => void;
  setCamera: (camera: Partial<CameraState>) => void;
  toggleSound: () => void;
  toggleMusic: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Comparison actions
  addToComparison: (carId: string) => void;
  removeFromComparison: (carId: string) => void;
  clearComparison: () => void;
  
  // Scene actions
  setScene: (scene: Partial<SceneSettings>) => void;
  toggleSceneSetting: (key: keyof SceneSettings) => void;
  
  // Animation actions
  setAnimation: (type: CarAnimation['type'], settings: Partial<CarAnimation>) => void;
  toggleAnimation: (type: CarAnimation['type']) => void;
  
  // Notification actions
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Utility actions
  resetCamera: () => void;
  resetToDefault: () => void;
}

// Helper to generate notification ID
const generateNotificationId = (): string => {
  return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Create the store
export const useStore = create<AppStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        cars: [...cars],
        selectedCar: null,
        ui: { ...initialUIState },
        scene: { ...defaultScene },
        animations: [...defaultAnimations],
        favorites: [],
        
        // Car actions
        setCars: (cars) => set({ cars }),
        
        selectCar: (carId) => {
          const car = get().cars.find((c) => c.id === carId) || null;
          set({
            selectedCar: car,
            ui: { ...get().ui, selectedCarId: carId },
          });
        },
        
        updateCarConfig: (carId, config) => {
          set({
            cars: get().cars.map((car) =>
              car.id === carId ? { ...car, config: { ...car.config, ...config } } : car
            ),
          });
          
          // Update selected car if it's the one being configured
          if (get().selectedCar?.id === carId) {
            set({
              selectedCar: {
                ...get().selectedCar!,
                config: { ...get().selectedCar!.config, ...config },
              },
            });
          }
        },
        
        toggleFavorite: (carId) => {
          const favorites = get().favorites;
          const newFavorites = favorites.includes(carId)
            ? favorites.filter((id) => id !== carId)
            : [...favorites, carId];
          
          set({ favorites: newFavorites });
          
          // Update the car's isFavorite status
          set({
            cars: get().cars.map((car) =>
              car.id === carId ? { ...car, isFavorite: !car.isFavorite } : car
            ),
          });
          
          // Update selected car if it's the one being favorited
          if (get().selectedCar?.id === carId) {
            set({
              selectedCar: {
                ...get().selectedCar!,
                isFavorite: !get().selectedCar!.isFavorite,
              },
            });
          }
        },
        
        // UI actions
        setCurrentView: (view) => {
          set({
            ui: { ...get().ui, currentView: view },
          });
        },
        
        setSearchQuery: (query) => {
          set({
            ui: { ...get().ui, searchQuery: query },
          });
        },
        
        setFilterBrand: (brand) => {
          set({
            ui: { ...get().ui, filterBrand: brand },
          });
        },
        
        setFilterCountry: (country) => {
          set({
            ui: { ...get().ui, filterCountry: country },
          });
        },
        
        setSortBy: (sortBy) => {
          set({
            ui: { ...get().ui, sortBy },
          });
        },
        
        setSortOrder: (order) => {
          set({
            ui: { ...get().ui, sortOrder: order },
          });
        },
        
        setViewMode: (mode) => {
          set({
            ui: { ...get().ui, viewMode: mode },
          });
        },
        
        toggleStats: () => {
          set({
            ui: { ...get().ui, showStats: !get().ui.showStats },
          });
        },
        
        toggleConfigurator: () => {
          set({
            ui: { ...get().ui, showConfigurator: !get().ui.showConfigurator },
          });
        },
        
        toggleAutoRotate: () => {
          set({
            ui: { ...get().ui, autoRotate: !get().ui.autoRotate },
          });
        },
        
        toggleFullscreen: () => {
          set({
            ui: { ...get().ui, fullscreen: !get().ui.fullscreen },
          });
        },
        
        setLighting: (lighting) => {
          set({
            ui: { ...get().ui, lighting: { ...get().ui.lighting, ...lighting } },
          });
        },
        
        setCamera: (camera) => {
          set({
            ui: { ...get().ui, camera: { ...get().ui.camera, ...camera } },
          });
        },
        
        toggleSound: () => {
          set({
            ui: { ...get().ui, soundEnabled: !get().ui.soundEnabled },
          });
        },
        
        toggleMusic: () => {
          set({
            ui: { ...get().ui, musicEnabled: !get().ui.musicEnabled },
          });
        },
        
        setLoading: (isLoading) => {
          set({
            ui: { ...get().ui, isLoading },
          });
        },
        
        setError: (error) => {
          set({
            ui: { ...get().ui, error },
          });
        },
        
        // Comparison actions
        addToComparison: (carId) => {
          const comparisonCars = get().ui.comparisonCars;
          if (comparisonCars.length >= 2) {
            // Can only compare 2 cars at a time
            get().addNotification({
              type: 'warning',
              message: 'You can only compare 2 cars at a time',
              duration: 3000,
            });
            return;
          }
          
          if (comparisonCars.includes(carId)) {
            // Already in comparison
            return;
          }
          
          set({
            ui: {
              ...get().ui,
              comparisonCars: [...comparisonCars, carId],
            },
          });
          
          get().addNotification({
            type: 'success',
            message: `Added to comparison`,
            duration: 2000,
          });
        },
        
        removeFromComparison: (carId) => {
          set({
            ui: {
              ...get().ui,
              comparisonCars: get().ui.comparisonCars.filter((id) => id !== carId),
            },
          });
        },
        
        clearComparison: () => {
          set({
            ui: {
              ...get().ui,
              comparisonCars: [],
            },
          });
        },
        
        // Scene actions
        setScene: (scene) => {
          set({
            scene: { ...get().scene, ...scene },
          });
        },
        
        toggleSceneSetting: (key) => {
          set({
            scene: {
              ...get().scene,
              [key]: !get().scene[key as keyof SceneSettings],
            },
          });
        },
        
        // Animation actions
        setAnimation: (type, settings) => {
          set({
            animations: get().animations.map((anim) =>
              anim.type === type ? { ...anim, ...settings } : anim
            ),
          });
        },
        
        toggleAnimation: (type) => {
          set({
            animations: get().animations.map((anim) =>
              anim.type === type ? { ...anim, enabled: !anim.enabled } : anim
            ),
          });
        },
        
        // Notification actions
        addNotification: (notification) => {
          const id = generateNotificationId();
          const newNotification: Notification = {
            ...notification,
            id,
            createdAt: new Date(),
          };
          
          set({
            ui: {
              ...get().ui,
              notifications: [...get().ui.notifications, newNotification],
            },
          });
          
          // Auto-remove after duration
          if (notification.duration > 0) {
            setTimeout(() => {
              get().removeNotification(id);
            }, notification.duration);
          }
        },
        
        removeNotification: (id) => {
          set({
            ui: {
              ...get().ui,
              notifications: get().ui.notifications.filter((n) => n.id !== id),
            },
          });
        },
        
        clearNotifications: () => {
          set({
            ui: {
              ...get().ui,
              notifications: [],
            },
          });
        },
        
        // Utility actions
        resetCamera: () => {
          set({
            ui: {
              ...get().ui,
              camera: { ...defaultCamera },
            },
          });
        },
        
        resetToDefault: () => {
          set({
            ui: { ...initialUIState },
            scene: { ...defaultScene },
            animations: [...defaultAnimations],
          });
        },
      }),
      {
        name: 'dream-garage-storage',
        partialize: (state) => ({
          // Only persist these parts of the state
          ui: {
            ...state.ui,
            // Don't persist notifications
            notifications: [],
          },
          scene: state.scene,
          favorites: state.favorites,
        }),
      }
    ),
    { name: 'DreamGarageStore' }
  )
);

// Selector hooks for better performance
export const useCars = () => useStore((state) => state.cars);
export const useSelectedCar = () => useStore((state) => state.selectedCar);
export const useUI = () => useStore((state) => state.ui);
export const useScene = () => useStore((state) => state.scene);
export const useAnimations = () => useStore((state) => state.animations);
export const useFavorites = () => useStore((state) => state.favorites);

// Action hooks
export const useCarActions = () => ({
  setCars: useStore((state) => state.setCars),
  selectCar: useStore((state) => state.selectCar),
  updateCarConfig: useStore((state) => state.updateCarConfig),
  toggleFavorite: useStore((state) => state.toggleFavorite),
});

export const useUIActions = () => ({
  setCurrentView: useStore((state) => state.setCurrentView),
  setSearchQuery: useStore((state) => state.setSearchQuery),
  setFilterBrand: useStore((state) => state.setFilterBrand),
  setFilterCountry: useStore((state) => state.setFilterCountry),
  setSortBy: useStore((state) => state.setSortBy),
  setSortOrder: useStore((state) => state.setSortOrder),
  setViewMode: useStore((state) => state.setViewMode),
  toggleStats: useStore((state) => state.toggleStats),
  toggleConfigurator: useStore((state) => state.toggleConfigurator),
  toggleAutoRotate: useStore((state) => state.toggleAutoRotate),
  toggleFullscreen: useStore((state) => state.toggleFullscreen),
  setLighting: useStore((state) => state.setLighting),
  setCamera: useStore((state) => state.setCamera),
  toggleSound: useStore((state) => state.toggleSound),
  toggleMusic: useStore((state) => state.toggleMusic),
  setLoading: useStore((state) => state.setLoading),
  setError: useStore((state) => state.setError),
});

export const useComparisonActions = () => ({
  addToComparison: useStore((state) => state.addToComparison),
  removeFromComparison: useStore((state) => state.removeFromComparison),
  clearComparison: useStore((state) => state.clearComparison),
});

export const useSceneActions = () => ({
  setScene: useStore((state) => state.setScene),
  toggleSceneSetting: useStore((state) => state.toggleSceneSetting),
});

export const useAnimationActions = () => ({
  setAnimation: useStore((state) => state.setAnimation),
  toggleAnimation: useStore((state) => state.toggleAnimation),
});

export const useNotificationActions = () => ({
  addNotification: useStore((state) => state.addNotification),
  removeNotification: useStore((state) => state.removeNotification),
  clearNotifications: useStore((state) => state.clearNotifications),
});

export const useUtilityActions = () => ({
  resetCamera: useStore((state) => state.resetCamera),
  resetToDefault: useStore((state) => state.resetToDefault),
});

// Combined hooks for convenience
export const useAppStore = () => {
  const state = useStore();
  return {
    ...state,
    cars: state.cars,
    selectedCar: state.selectedCar,
    ui: state.ui,
    scene: state.scene,
    animations: state.animations,
    favorites: state.favorites,
  };
};

export default useStore;
