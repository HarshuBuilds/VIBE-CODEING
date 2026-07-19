// Car Types

export interface CarSpecs {
  horsepower: number;
  torque: number; // Nm
  topSpeed: number; // km/h
  acceleration: number; // 0-100 km/h in seconds
  engine: string;
  driveType: 'AWD' | 'RWD' | 'FWD' | '4WD';
  weight: number; // kg
  price: number; // USD
  year: number;
  country: string;
}

export interface CarConfig {
  paintColor: string;
  wheelColor: string;
  caliperColor: string;
  interiorColor: string;
  windowTint: 'none' | 'light' | 'medium' | 'dark';
  rideHeight: 'stock' | 'lowered' | 'raised';
  wheelStyle: string;
  hasSpoiler: boolean;
  licensePlate: string;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  description: string;
  specs: CarSpecs;
  config: CarConfig;
  modelPath: string;
  thumbnailPath: string;
  hdriOptions: string[];
  soundEffects: {
    engineStart: string;
    engineIdle: string;
    engineRev: string;
    engineAcceleration: string;
    engineLimiter: string;
    engineStop: string;
  };
  features: string[];
  tags: string[];
  isFavorite: boolean;
  createdAt: Date;
}

// UI State Types
export interface CameraState {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  near: number;
  far: number;
}

export interface LightingState {
  type: 'day' | 'sunset' | 'night' | 'studio' | 'garage' | 'rainy';
  intensity: number;
  color: string;
  hdri: string;
}

export interface UIState {
  currentView: 'landing' | 'garage' | 'showroom' | 'comparison' | 'configurator';
  selectedCarId: string | null;
  comparisonCars: string[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  filterBrand: string | null;
  filterCountry: string | null;
  sortBy: 'name' | 'horsepower' | 'price' | 'year' | 'acceleration';
  sortOrder: 'asc' | 'desc';
  viewMode: 'grid' | 'carousel' | '3d-garage';
  showStats: boolean;
  showConfigurator: boolean;
  autoRotate: boolean;
  fullscreen: boolean;
  lighting: LightingState;
  camera: CameraState;
  soundEnabled: boolean;
  musicEnabled: boolean;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  duration: number;
  createdAt: Date;
}

// 3D Scene Types
export interface SceneSettings {
  showFloor: boolean;
  showEnvironment: boolean;
  showParticles: boolean;
  showReflections: boolean;
  showShadows: boolean;
  fogDensity: number;
  fogColor: string;
  bloomIntensity: number;
  bloomThreshold: number;
  depthOfField: boolean;
  motionBlur: boolean;
}

export interface CarAnimation {
  type: 'doors' | 'headlights' | 'brakeLights' | 'steering' | 'wheels' | 'engine' | 'suspension' | 'exhaust';
  enabled: boolean;
  speed: number;
  intensity: number;
}

export interface InteractionState {
  isDragging: boolean;
  isZooming: boolean;
  isPanning: boolean;
  touchStart: { x: number; y: number } | null;
  touchCurrent: { x: number; y: number } | null;
}

// API Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface CarListResponse {
  cars: Car[];
  total: number;
  page: number;
  limit: number;
}

export interface CarDetailResponse {
  car: Car;
  relatedCars: Car[];
}

// Configuration Types
export interface AppConfig {
  appName: string;
  version: string;
  apiBaseUrl: string;
  assetBaseUrl: string;
  defaultCamera: CameraState;
  defaultLighting: LightingState;
  defaultScene: SceneSettings;
  performance: {
    maxTextureSize: number;
    maxModels: number;
    lodEnabled: boolean;
    dracoCompression: boolean;
  };
  analytics: {
    enabled: boolean;
    trackingId: string;
  };
}

// Event Types
export interface CarEvent {
  type: 'select' | 'view' | 'configure' | 'compare' | 'favorite' | 'share';
  carId: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface UserPreferences {
  theme: 'dark' | 'light' | 'system';
  soundEnabled: boolean;
  musicEnabled: boolean;
  notificationsEnabled: boolean;
  language: string;
  currency: string;
}

// Utility Types
export type ValueOf<T> = T[keyof T];

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequireBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type Nullable<T> = T | null;

export type Undefinable<T> = T | undefined;

export type Maybe<T> = T | null | undefined;

// Car Collection Constants
export const CAR_BRANDS = ['Toyota', 'BMW', 'Dodge', 'Ford'] as const;
export type CarBrand = typeof CAR_BRANDS[number];

export const CAR_COUNTRIES = ['Japan', 'Germany', 'USA'] as const;
export type CarCountry = typeof CAR_COUNTRIES[number];

export const CAR_DRIVE_TYPES = ['AWD', 'RWD', 'FWD', '4WD'] as const;
export type CarDriveType = typeof CAR_DRIVE_TYPES[number];

export const HDRI_TYPES = ['day', 'sunset', 'night', 'studio', 'garage', 'rainy'] as const;
export type HdriType = typeof HDRI_TYPES[number];

export const VIEW_MODES = ['grid', 'carousel', '3d-garage'] as const;
export type ViewMode = typeof VIEW_MODES[number];

export const SORT_OPTIONS = ['name', 'horsepower', 'price', 'year', 'acceleration'] as const;
export type SortOption = typeof SORT_OPTIONS[number];
