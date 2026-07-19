import { Car, CarSpecs } from '@/types';

// Format utilities
export const formatNumber = (num: number, decimals = 0): string => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatHorsepower = (hp: number): string => {
  return `${formatNumber(hp)} hp`;
};

export const formatTorque = (nm: number): string => {
  // Convert Nm to lb-ft for US audience
  const lbFt = nm * 0.737562;
  return `${formatNumber(nm)} Nm (${formatNumber(lbFt, 1)} lb-ft)`;
};

export const formatTopSpeed = (kmh: number): string => {
  // Convert km/h to mph
  const mph = kmh * 0.621371;
  return `${formatNumber(kmh)} km/h (${formatNumber(mph, 1)} mph)`;
};

export const formatAcceleration = (seconds: number): string => {
  return `0-100 km/h in ${seconds.toFixed(1)}s`;
};

export const formatWeight = (kg: number): string => {
  // Convert kg to lbs
  const lbs = kg * 2.20462;
  return `${formatNumber(kg)} kg (${formatNumber(lbs, 1)} lbs)`;
};

export const formatEngine = (engine: string): string => {
  return engine;
};

export const formatYear = (year: number): string => {
  return year.toString();
};

// Car spec formatting
export const formatCarSpecs = (specs: CarSpecs) => ({
  horsepower: formatHorsepower(specs.horsepower),
  torque: formatTorque(specs.torque),
  topSpeed: formatTopSpeed(specs.topSpeed),
  acceleration: formatAcceleration(specs.acceleration),
  engine: formatEngine(specs.engine),
  driveType: specs.driveType,
  weight: formatWeight(specs.weight),
  price: formatCurrency(specs.price),
  year: formatYear(specs.year),
  country: specs.country,
});

// Power to weight ratio
export const calculatePowerToWeight = (car: Car): string => {
  const ratio = car.specs.horsepower / car.specs.weight;
  return `${ratio.toFixed(2)} hp/kg`;
};

// Performance score
export const calculatePerformanceScore = (car: Car): number => {
  // Normalize values (0-1)
  const hpNorm = car.specs.horsepower / 1200;
  const torqueNorm = car.specs.torque / 1500;
  const accelNorm = 1 - (car.specs.acceleration / 10);
  const topSpeedNorm = car.specs.topSpeed / 400;
  const ptwNorm = (car.specs.horsepower / car.specs.weight) / 1;

  // Weighted average
  const score = (
    hpNorm * 0.3 +
    torqueNorm * 0.25 +
    accelNorm * 0.25 +
    topSpeedNorm * 0.1 +
    ptwNorm * 0.1
  ) * 100;

  return Math.min(Math.max(score, 0), 100);
};

// Color utilities
export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${[r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('')}`;
};

export const lightenColor = (hex: string, percent: number): string => {
  const { r, g, b } = hexToRgb(hex);
  const amount = Math.round(2.55 * percent);
  const newR = Math.min(r + amount, 255);
  const newG = Math.min(g + amount, 255);
  const newB = Math.min(b + amount, 255);
  return rgbToHex(newR, newG, newB);
};

export const darkenColor = (hex: string, percent: number): string => {
  const { r, g, b } = hexToRgb(hex);
  const amount = Math.round(2.55 * percent);
  const newR = Math.max(r - amount, 0);
  const newG = Math.max(g - amount, 0);
  const newB = Math.max(b - amount, 0);
  return rgbToHex(newR, newG, newB);
};

// String utilities
export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeWords = (str: string): string => {
  return str.split(' ').map(capitalize).join(' ');
};

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const unslugify = (str: string): string => {
  return str.replace(/-/g, ' ');
};

// Array utilities
export const chunk = <T>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

export const shuffle = <T>(arr: T[]): T[] => {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Date utilities
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatRelativeDate = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return interval === 1 ? `${interval} ${unit} ago` : `${interval} ${unit}s ago`;
    }
  }

  return 'just now';
};

// Storage utilities
export const localStorageAvailable = (): boolean => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (!localStorageAvailable()) return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export const setToStorage = <T>(key: string, value: T): void => {
  if (!localStorageAvailable()) return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
};

// URL utilities
export const getQueryParam = (param: string): string | null => {
  if (typeof window === 'undefined') return null;
  
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
};

export const setQueryParam = (param: string, value: string): void => {
  if (typeof window === 'undefined') return;
  
  const params = new URLSearchParams(window.location.search);
  params.set(param, value);
  window.history.pushState({}, '', `?${params.toString()}`);
};

export const removeQueryParam = (param: string): void => {
  if (typeof window === 'undefined') return;
  
  const params = new URLSearchParams(window.location.search);
  params.delete(param);
  window.history.pushState({}, '', `?${params.toString()}`);
};

// Image utilities
export const getImageUrl = (path: string): string => {
  if (path.startsWith('http')) return path;
  return path;
};

export const preloadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
};

// Comparison utilities
export const compareCars = (carA: Car, carB: Car) => {
  return {
    horsepower: {
      a: carA.specs.horsepower,
      b: carB.specs.horsepower,
      difference: carA.specs.horsepower - carB.specs.horsepower,
      percentage: ((carA.specs.horsepower - carB.specs.horsepower) / carB.specs.horsepower) * 100,
    },
    torque: {
      a: carA.specs.torque,
      b: carB.specs.torque,
      difference: carA.specs.torque - carB.specs.torque,
      percentage: ((carA.specs.torque - carB.specs.torque) / carB.specs.torque) * 100,
    },
    acceleration: {
      a: carA.specs.acceleration,
      b: carB.specs.acceleration,
      difference: carB.specs.acceleration - carA.specs.acceleration,
      percentage: ((carB.specs.acceleration - carA.specs.acceleration) / carB.specs.acceleration) * 100,
    },
    topSpeed: {
      a: carA.specs.topSpeed,
      b: carB.specs.topSpeed,
      difference: carA.specs.topSpeed - carB.specs.topSpeed,
      percentage: ((carA.specs.topSpeed - carB.specs.topSpeed) / carB.specs.topSpeed) * 100,
    },
    weight: {
      a: carA.specs.weight,
      b: carB.specs.weight,
      difference: carA.specs.weight - carB.specs.weight,
      percentage: ((carA.specs.weight - carB.specs.weight) / carB.specs.weight) * 100,
    },
    price: {
      a: carA.specs.price,
      b: carB.specs.price,
      difference: carA.specs.price - carB.specs.price,
      percentage: ((carA.specs.price - carB.specs.price) / carB.specs.price) * 100,
    },
    powerToWeight: {
      a: carA.specs.horsepower / carA.specs.weight,
      b: carB.specs.horsepower / carB.specs.weight,
      difference: (carA.specs.horsepower / carA.specs.weight) - (carB.specs.horsepower / carB.specs.weight),
      percentage: ((
        (carA.specs.horsepower / carA.specs.weight) - 
        (carB.specs.horsepower / carB.specs.weight)
      ) / (carB.specs.horsepower / carB.specs.weight)) * 100,
    },
  };
};

// Chart data utilities
export const getChartData = (cars: Car[]) => {
  const horsepowerData = cars.map((car) => ({
    name: car.name,
    value: car.specs.horsepower,
  }));

  const torqueData = cars.map((car) => ({
    name: car.name,
    value: car.specs.torque,
  }));

  const accelerationData = cars.map((car) => ({
    name: car.name,
    value: car.specs.acceleration,
  }));

  const priceData = cars.map((car) => ({
    name: car.name,
    value: car.specs.price,
  }));

  const powerToWeightData = cars.map((car) => ({
    name: car.name,
    value: car.specs.horsepower / car.specs.weight,
  }));

  return {
    horsepower: horsepowerData,
    torque: torqueData,
    acceleration: accelerationData,
    price: priceData,
    powerToWeight: powerToWeightData,
  };
};

// Random utilities
export const randomId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const randomInRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const randomIntInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Debounce utility
export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  wait: number
): ((...args: Parameters<F>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

// Throttle utility
export const throttle = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  limit: number
): ((...args: Parameters<F>) => void) => {
  let inThrottle = false;

  return (...args: Parameters<F>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Sleep utility
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Check if element is in viewport
export const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Scroll to element with offset
export const scrollToElement = (element: HTMLElement, offset = 0): void => {
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
};

// Copy to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  }
};

// Download file
export const downloadFile = (url: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Generate share link
export const generateShareLink = (carId: string): string => {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}/car/${carId}`;
};

// Format time (MM:SS)
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// Check if mobile device
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Check if touch device
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Get device type
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// Export all utilities
export default {
  // Format utilities
  formatNumber,
  formatCurrency,
  formatHorsepower,
  formatTorque,
  formatTopSpeed,
  formatAcceleration,
  formatWeight,
  formatEngine,
  formatYear,
  formatCarSpecs,
  calculatePowerToWeight,
  calculatePerformanceScore,
  
  // Color utilities
  hexToRgb,
  rgbToHex,
  lightenColor,
  darkenColor,
  
  // String utilities
  truncate,
  capitalize,
  capitalizeWords,
  slugify,
  unslugify,
  
  // Array utilities
  chunk,
  shuffle,
  
  // Date utilities
  formatDate,
  formatRelativeDate,
  
  // Storage utilities
  localStorageAvailable,
  getFromStorage,
  setToStorage,
  
  // URL utilities
  getQueryParam,
  setQueryParam,
  removeQueryParam,
  
  // Image utilities
  getImageUrl,
  preloadImage,
  
  // Comparison utilities
  compareCars,
  
  // Chart utilities
  getChartData,
  
  // Random utilities
  randomId,
  randomInRange,
  randomIntInRange,
  
  // Function utilities
  debounce,
  throttle,
  sleep,
  
  // DOM utilities
  isInViewport,
  scrollToElement,
  
  // Clipboard utilities
  copyToClipboard,
  
  // File utilities
  downloadFile,
  
  // Share utilities
  generateShareLink,
  
  // Time utilities
  formatTime,
  formatFileSize,
  
  // Device utilities
  isMobile,
  isTouchDevice,
  getDeviceType,
};
