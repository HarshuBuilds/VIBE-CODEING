import { Car } from '@/types';

// High-quality placeholder model paths (to be replaced with actual licensed models)
const ASSET_BASE = '/assets/models';
const TEXTURE_BASE = '/assets/textures';
const SOUND_BASE = '/assets/sounds';

// HDRI Environment Maps
const HDRI_BASE = '/assets/hdri';

export const cars: Car[] = [
  {
    id: 'toyota-supra-mk4',
    name: 'Toyota Supra MK4',
    brand: 'Toyota',
    model: 'Supra MK4 (A80)',
    description: 'The legendary JDM icon with the legendary 2JZ-GTE engine. A timeless masterpiece of automotive engineering.',
    specs: {
      horsepower: 320, // Stock JDM spec (USDM had 330hp)
      torque: 431, // Nm
      topSpeed: 250, // km/h (electronically limited)
      acceleration: 4.6, // 0-100 km/h in seconds
      engine: '3.0L 2JZ-GTE Twin-Turbo I6',
      driveType: 'RWD',
      weight: 1590, // kg
      price: 120000, // USD (current market value for well-maintained examples)
      year: 1993,
      country: 'Japan',
    },
    config: {
      paintColor: '#C0C0C0', // Silver
      wheelColor: '#666666', // Gunmetal
      caliperColor: '#FF0000', // Red
      interiorColor: '#000000', // Black
      windowTint: 'medium',
      rideHeight: 'stock',
      wheelStyle: 'stock',
      hasSpoiler: true,
      licensePlate: 'SUPRA',
    },
    modelPath: `${ASSET_BASE}/toyota-supra-mk4.glb`,
    thumbnailPath: `${TEXTURE_BASE}/toyota-supra-thumbnail.jpg`,
    hdriOptions: [
      `${HDRI_BASE}/day.hdr`,
      `${HDRI_BASE}/sunset.hdr`,
      `${HDRI_BASE}/night.hdr`,
      `${HDRI_BASE}/studio.hdr`,
      `${HDRI_BASE}/garage.hdr`,
    ],
    soundEffects: {
      engineStart: `${SOUND_BASE}/supra/engine-start.mp3`,
      engineIdle: `${SOUND_BASE}/supra/engine-idle.mp3`,
      engineRev: `${SOUND_BASE}/supra/engine-rev.mp3`,
      engineAcceleration: `${SOUND_BASE}/supra/engine-acceleration.mp3`,
      engineLimiter: `${SOUND_BASE}/supra/engine-limiter.mp3`,
      engineStop: `${SOUND_BASE}/supra/engine-stop.mp3`,
    },
    features: [
      'Twin-turbocharged inline-6 engine',
      '6-speed manual transmission',
      'Limited-slip differential',
      'Independent suspension',
      'Pop-up headlights',
      'Active rear spoiler',
      'Leather interior',
      'Digital climate control',
    ],
    tags: ['JDM', 'Sports Car', 'Tuner', 'Classic', 'Turbo', 'RWD'],
    isFavorite: false,
    createdAt: new Date('1993-01-01'),
  },
  {
    id: 'bmw-m4-competition',
    name: 'BMW M4 Competition',
    brand: 'BMW',
    model: 'M4 Competition',
    description: 'The ultimate driving machine. Precision engineering meets raw power in this track-ready performance coupe.',
    specs: {
      horsepower: 510, // xDrive Competition model
      torque: 650, // Nm
      topSpeed: 290, // km/h (with M Driver\'s Package)
      acceleration: 3.5, // 0-100 km/h in seconds
      engine: '3.0L S58 Twin-Turbo I6',
      driveType: 'RWD',
      weight: 1620, // kg
      price: 95000, // USD (2024 model)
      year: 2024,
      country: 'Germany',
    },
    config: {
      paintColor: '#0057B8', // BMW Individual Frozen Deep Grey Metallic
      wheelColor: '#000000', // Black
      caliperColor: '#0066CC', // Blue
      interiorColor: '#8B0000', // Merino Leather Red
      windowTint: 'dark',
      rideHeight: 'lowered',
      wheelStyle: 'M Competition',
      hasSpoiler: true,
      licensePlate: 'M4CSL',
    },
    modelPath: `${ASSET_BASE}/bmw-m4-competition.glb`,
    thumbnailPath: `${TEXTURE_BASE}/bmw-m4-thumbnail.jpg`,
    hdriOptions: [
      `${HDRI_BASE}/day.hdr`,
      `${HDRI_BASE}/sunset.hdr`,
      `${HDRI_BASE}/night.hdr`,
      `${HDRI_BASE}/studio.hdr`,
      `${HDRI_BASE}/garage.hdr`,
    ],
    soundEffects: {
      engineStart: `${SOUND_BASE}/m4/engine-start.mp3`,
      engineIdle: `${SOUND_BASE}/m4/engine-idle.mp3`,
      engineRev: `${SOUND_BASE}/m4/engine-rev.mp3`,
      engineAcceleration: `${SOUND_BASE}/m4/engine-acceleration.mp3`,
      engineLimiter: `${SOUND_BASE}/m4/engine-limiter.mp3`,
      engineStop: `${SOUND_BASE}/m4/engine-stop.mp3`,
    },
    features: [
      'M TwinPower Turbo technology',
      '8-speed M Steptronic transmission',
      'M xDrive all-wheel drive',
      'Adaptive M suspension',
      'M compound brakes',
      'Carbon fiber roof',
      'M carbon bucket seats',
      'Head-up display',
      'BMW Curved Display',
    ],
    tags: ['German', 'Sports Coupe', 'Luxury', 'Performance', 'Turbo', 'Track'],
    isFavorite: false,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'dodge-challenger-hellcat',
    name: 'Dodge Challenger SRT Hellcat',
    brand: 'Dodge',
    model: 'Challenger SRT Hellcat',
    description: 'American muscle at its finest. The supercharged HEMI V8 delivers earth-shattering power and a sound that commands respect.',
    specs: {
      horsepower: 717, // SAE certified
      torque: 881, // Nm
      topSpeed: 324, // km/h
      acceleration: 3.6, // 0-100 km/h in seconds
      engine: '6.2L Supercharged HEMI V8',
      driveType: 'RWD',
      weight: 2032, // kg
      price: 75000, // USD (2023 model)
      year: 2023,
      country: 'USA',
    },
    config: {
      paintColor: '#990000', // Hellraisin Red
      wheelColor: '#1A1A1A', // Black
      caliperColor: '#FF0000', // Red
      interiorColor: '#000000', // Black with Red stitching
      windowTint: 'dark',
      rideHeight: 'stock',
      wheelStyle: 'SRT',
      hasSpoiler: false,
      licensePlate: 'HELLCAT',
    },
    modelPath: `${ASSET_BASE}/dodge-challenger-hellcat.glb`,
    thumbnailPath: `${TEXTURE_BASE}/dodge-hellcat-thumbnail.jpg`,
    hdriOptions: [
      `${HDRI_BASE}/day.hdr`,
      `${HDRI_BASE}/sunset.hdr`,
      `${HDRI_BASE}/night.hdr`,
      `${HDRI_BASE}/studio.hdr`,
      `${HDRI_BASE}/garage.hdr`,
    ],
    soundEffects: {
      engineStart: `${SOUND_BASE}/hellcat/engine-start.mp3`,
      engineIdle: `${SOUND_BASE}/hellcat/engine-idle.mp3`,
      engineRev: `${SOUND_BASE}/hellcat/engine-rev.mp3`,
      engineAcceleration: `${SOUND_BASE}/hellcat/engine-acceleration.mp3`,
      engineLimiter: `${SOUND_BASE}/hellcat/engine-limiter.mp3`,
      engineStop: `${SOUND_BASE}/hellcat/engine-stop.mp3`,
    },
    features: [
      'Supercharged 6.2L HEMI SRT Hellcat V8 engine',
      '8-speed automatic transmission',
      'SRT Performance Pages',
      'Launch Control',
      'Line Lock',
      'Brembo high-performance brakes',
      'SRT Drive Modes',
      'Uconnect 4C NAV with 8.4-inch display',
      'Shaker Audio System',
    ],
    tags: ['American', 'Muscle Car', 'V8', 'Supercharged', 'Drag', 'RWD'],
    isFavorite: false,
    createdAt: new Date('2023-01-01'),
  },
  {
    id: 'dodge-challenger-demon-170',
    name: 'Dodge Challenger SRT Demon 170',
    brand: 'Dodge',
    model: 'Challenger SRT Demon 170',
    description: 'The most powerful muscle car ever produced. A drag strip dominator with mind-bending acceleration and demonic presence.',
    specs: {
      horsepower: 1025, // SAE certified on E85 fuel
      torque: 1304, // Nm on E85 fuel
      topSpeed: 317, // km/h (estimated)
      acceleration: 1.66, // 0-60 mph in seconds (1.99 with street tires)
      engine: '6.2L Supercharged HEMI V8',
      driveType: 'RWD',
      weight: 1968, // kg (with options)
      price: 110000, // USD (2023 model)
      year: 2023,
      country: 'USA',
    },
    config: {
      paintColor: '#000000', // Pitch Black
      wheelColor: '#333333', // Dark Gray
      caliperColor: '#FF00FF', // Demon Purple
      interiorColor: '#000000', // Black with Demon Red stitching
      windowTint: 'dark',
      rideHeight: 'stock',
      wheelStyle: 'Demon',
      hasSpoiler: false,
      licensePlate: 'DEMON170',
    },
    modelPath: `${ASSET_BASE}/dodge-challenger-demon-170.glb`,
    thumbnailPath: `${TEXTURE_BASE}/dodge-demon-thumbnail.jpg`,
    hdriOptions: [
      `${HDRI_BASE}/day.hdr`,
      `${HDRI_BASE}/sunset.hdr`,
      `${HDRI_BASE}/night.hdr`,
      `${HDRI_BASE}/studio.hdr`,
      `${HDRI_BASE}/garage.hdr`,
    ],
    soundEffects: {
      engineStart: `${SOUND_BASE}/demon/engine-start.mp3`,
      engineIdle: `${SOUND_BASE}/demon/engine-idle.mp3`,
      engineRev: `${SOUND_BASE}/demon/engine-rev.mp3`,
      engineAcceleration: `${SOUND_BASE}/demon/engine-acceleration.mp3`,
      engineLimiter: `${SOUND_BASE}/demon/engine-limiter.mp3`,
      engineStop: `${SOUND_BASE}/demon/engine-stop.mp3`,
    },
    features: [
      '1025 horsepower on E85 fuel',
      'SRT Demon 170 supercharged 6.2L HEMI V8',
      '8-speed HP90 automatic transmission',
      'Demon-specific suspension tuning',
      'Brembo brakes with Demon logo',
      'Drag Mode with Torque Reserve',
      'TransBrake for launch control',
      'SRT Power Chiller',
      'After-Run Chiller',
      'Demon-caliber wheels with drag radials',
    ],
    tags: ['American', 'Muscle Car', 'V8', 'Supercharged', 'Drag King', 'Limited Edition'],
    isFavorite: false,
    createdAt: new Date('2023-01-01'),
  },
  {
    id: 'ford-mustang-gt',
    name: 'Ford Mustang GT',
    brand: 'Ford',
    model: 'Mustang GT (S650)',
    description: 'The new generation of American pony car. Combining classic Mustang heritage with modern technology and performance.',
    specs: {
      horsepower: 480, // 5.0L Coyote V8
      torque: 567, // Nm
      topSpeed: 250, // km/h (electronically limited)
      acceleration: 3.9, // 0-100 km/h in seconds (with Drag Strip mode)
      engine: '5.0L Coyote V8',
      driveType: 'RWD',
      weight: 1720, // kg
      price: 55000, // USD (2024 model)
      year: 2024,
      country: 'USA',
    },
    config: {
      paintColor: '#003F7F', // Atlas Blue Metallic
      wheelColor: '#C0C0C0', // Silver
      caliperColor: '#FF0000', // Red
      interiorColor: '#000000', // Ebony Black
      windowTint: 'medium',
      rideHeight: 'stock',
      wheelStyle: 'GT Performance',
      hasSpoiler: true,
      licensePlate: 'STANGGT',
    },
    modelPath: `${ASSET_BASE}/ford-mustang-gt.glb`,
    thumbnailPath: `${TEXTURE_BASE}/ford-mustang-thumbnail.jpg`,
    hdriOptions: [
      `${HDRI_BASE}/day.hdr`,
      `${HDRI_BASE}/sunset.hdr`,
      `${HDRI_BASE}/night.hdr`,
      `${HDRI_BASE}/studio.hdr`,
      `${HDRI_BASE}/garage.hdr`,
    ],
    soundEffects: {
      engineStart: `${SOUND_BASE}/mustang/engine-start.mp3`,
      engineIdle: `${SOUND_BASE}/mustang/engine-idle.mp3`,
      engineRev: `${SOUND_BASE}/mustang/engine-rev.mp3`,
      engineAcceleration: `${SOUND_BASE}/mustang/engine-acceleration.mp3`,
      engineLimiter: `${SOUND_BASE}/mustang/engine-limiter.mp3`,
      engineStop: `${SOUND_BASE}/mustang/engine-stop.mp3`,
    },
    features: [
      '5.0L Coyote V8 engine',
      '10-speed SelectShift automatic transmission',
      'MagneRide damping system',
      'Brembo 6-piston front brakes',
      'Electronic limited-slip differential',
      'Selectable drive modes',
      'Digital instrument cluster',
      'SYNC 4 with 13.2-inch touchscreen',
      'B&O Sound System',
    ],
    tags: ['American', 'Pony Car', 'V8', 'Muscle', 'Modern Classic', 'Performance'],
    isFavorite: false,
    createdAt: new Date('2024-01-01'),
  },
];

// Helper functions
export const getCarById = (id: string): Car | undefined => {
  return cars.find((car) => car.id === id);
};

export const getCarsByBrand = (brand: string): Car[] => {
  return cars.filter((car) => car.brand.toLowerCase() === brand.toLowerCase());
};

export const getCarsByCountry = (country: string): Car[] => {
  return cars.filter((car) => car.country.toLowerCase() === country.toLowerCase());
};

export const getCarsByTag = (tag: string): Car[] => {
  return cars.filter((car) => car.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
};

export const searchCars = (query: string): Car[] => {
  const lowerQuery = query.toLowerCase();
  return cars.filter(
    (car) =>
      car.name.toLowerCase().includes(lowerQuery) ||
      car.brand.toLowerCase().includes(lowerQuery) ||
      car.model.toLowerCase().includes(lowerQuery) ||
      car.description.toLowerCase().includes(lowerQuery) ||
      car.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};

export const sortCars = (cars: Car[], sortBy: string, sortOrder: 'asc' | 'desc'): Car[] => {
  const sorted = [...cars];
  
  sorted.sort((a, b) => {
    let aValue: number | string;
    let bValue: number | string;
    
    switch (sortBy) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'horsepower':
        aValue = a.specs.horsepower;
        bValue = b.specs.horsepower;
        break;
      case 'price':
        aValue = a.specs.price;
        bValue = b.specs.price;
        break;
      case 'year':
        aValue = a.specs.year;
        bValue = b.specs.year;
        break;
      case 'acceleration':
        aValue = a.specs.acceleration;
        bValue = b.specs.acceleration;
        break;
      default:
        aValue = a.name;
        bValue = b.name;
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return sortOrder === 'asc' 
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });
  
  return sorted;
};

export const filterCars = (
  cars: Car[],
  brand: string | null,
  country: string | null,
  searchQuery: string
): Car[] => {
  let filtered = [...cars];
  
  if (brand) {
    filtered = filtered.filter((car) => car.brand.toLowerCase() === brand.toLowerCase());
  }
  
  if (country) {
    filtered = filtered.filter((car) => car.country.toLowerCase() === country.toLowerCase());
  }
  
  if (searchQuery) {
    filtered = searchCars(searchQuery);
  }
  
  return filtered;
};

// Comparison utilities
export const compareCars = (carA: Car, carB: Car) => {
  return {
    powerDifference: carA.specs.horsepower - carB.specs.horsepower,
    torqueDifference: carA.specs.torque - carB.specs.torque,
    accelerationDifference: carB.specs.acceleration - carA.specs.acceleration,
    weightDifference: carA.specs.weight - carB.specs.weight,
    priceDifference: carA.specs.price - carB.specs.price,
    yearDifference: carA.specs.year - carB.specs.year,
    powerToWeightA: (carA.specs.horsepower / carA.specs.weight).toFixed(2),
    powerToWeightB: (carB.specs.horsepower / carB.specs.weight).toFixed(2),
  };
};

// Performance metrics
export const calculatePerformanceScore = (car: Car): number => {
  // Weighted score based on various performance factors
  const hpScore = car.specs.horsepower / 1000;
  const torqueScore = car.specs.torque / 1000;
  const accelerationScore = (10 - car.specs.acceleration) / 10;
  const topSpeedScore = car.specs.topSpeed / 400;
  const powerToWeight = car.specs.horsepower / car.specs.weight;
  
  // Weight factors
  const hpWeight = 0.3;
  const torqueWeight = 0.25;
  const accelerationWeight = 0.25;
  const topSpeedWeight = 0.1;
  const ptwWeight = 0.1;
  
  const score = 
    (hpScore * hpWeight) +
    (torqueScore * torqueWeight) +
    (accelerationScore * accelerationWeight) +
    (topSpeedScore * topSpeedWeight) +
    (powerToWeight * ptwWeight);
  
  return Math.min(Math.max(score * 100, 0), 100); // Scale to 0-100
};

// Export all cars
export default cars;
