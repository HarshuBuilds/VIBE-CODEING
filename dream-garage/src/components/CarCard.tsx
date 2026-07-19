'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Car } from '@/types';
import { formatCarSpecs, calculatePerformanceScore } from '@/utils';

// Car Card component
interface CarCardProps {
  car: Car;
  index?: number;
  onClick?: (car: Car) => void;
}

export const CarCard = ({ car, index = 0, onClick }: CarCardProps) => {
  const {
    ui: { viewMode },
    selectCar,
    toggleFavorite,
    addToComparison,
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Animation values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 50 });

  // Rotate based on mouse position
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // Handle card click
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onClick) {
      onClick(car);
    } else {
      selectCar(car.id);
    }
  };

  // Handle favorite toggle
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(car.id);
  };

  // Handle add to comparison
  const handleAddToComparison = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToComparison(car.id);
  };

  // Format specs
  const specs = formatCarSpecs(car.specs);
  const performanceScore = calculatePerformanceScore(car);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="group relative cursor-pointer"
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        className="card-hover h-full overflow-hidden rounded-xl relative"
        style={{
          rotateX: viewMode === 'grid' ? rotateX : 0,
          rotateY: viewMode === 'grid' ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card Image/3D Preview */}
        <div className="relative aspect-car bg-dark-800/80 overflow-hidden">
          {/* Placeholder for 3D model or image */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark-700 to-dark-900" />
          
          {/* Car thumbnail or 3D preview */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-32 h-16 bg-dark-600/80 rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                className="w-full h-full p-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z"
                />
              </svg>
            </motion.div>
          </div>

          {/* Brand and Model */}
          <div className="absolute top-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-dark-400 uppercase tracking-wider">
                  {car.brand}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{car.name}</h3>
              </div>
              <button
                onClick={handleFavoriteToggle}
                className={`p-2 rounded-lg transition-colors ${
                  car.isFavorite
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-dark-700/80 text-dark-400 border border-dark-600/50 hover:bg-dark-600/80'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill={car.isFavorite ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Performance Score Badge */}
          <div className="absolute top-4 right-4">
            <span className="badge badge-success">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              {performanceScore.toFixed(0)}%
            </span>
          </div>

          {/* Quick Actions (on hover) */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={handleAddToComparison}
              className="btn btn-outline px-4 py-2 text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              Compare
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                selectCar(car.id);
              }}
              className="btn btn-primary px-4 py-2 text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              View Details
            </button>
          </motion.div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {car.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 bg-dark-700/80 text-dark-400 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-dark-400">Horsepower</div>
              <div className="font-semibold text-white">{specs.horsepower}</div>
            </div>
            <div>
              <div className="text-dark-400">0-100 km/h</div>
              <div className="font-semibold text-white">{specs.acceleration}</div>
            </div>
            <div>
              <div className="text-dark-400">Top Speed</div>
              <div className="font-semibold text-white">{specs.topSpeed}</div>
            </div>
            <div>
              <div className="text-dark-400">Engine</div>
              <div className="font-semibold text-white truncate">{specs.engine}</div>
            </div>
            <div>
              <div className="text-dark-400">Price</div>
              <div className="font-semibold text-white">{specs.price}</div>
            </div>
            <div>
              <div className="text-dark-400">Year</div>
              <div className="font-semibold text-white">{specs.year}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-6">
            <Link
              href={`/car/${car.id}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex-1 btn btn-outline text-sm"
            >
              View Details
            </Link>
            <button
              onClick={handleAddToComparison}
              className="btn btn-secondary text-sm"
            >
              Compare
            </button>
          </div>
        </div>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.1) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Car Card for Carousel view
interface CarouselCardProps {
  car: Car;
  onClick?: (car: Car) => void;
}

export const CarouselCard = ({ car, onClick }: CarouselCardProps) => {
  const { selectCar, toggleFavorite, addToComparison } = useStore();

  const handleClick = () => {
    if (onClick) {
      onClick(car);
    } else {
      selectCar(car.id);
    }
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(car.id);
  };

  const handleAddToComparison = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToComparison(car.id);
  };

  return (
    <div className="relative group cursor-pointer">
      <div
        onClick={handleClick}
        className="relative aspect-car bg-dark-800/80 rounded-2xl overflow-hidden border border-dark-700/50 hover:border-primary-500/30 transition-all"
      >
        {/* Placeholder for 3D model */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-700 to-dark-900" />
        
        {/* Car info overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-dark-400 uppercase tracking-wider">
                {car.brand}
              </span>
              <button
                onClick={handleFavoriteToggle}
                className={`p-2 rounded-lg transition-colors ${
                  car.isFavorite
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-dark-700/80 text-dark-400 hover:bg-dark-600/80'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill={car.isFavorite ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
            <h3 className="text-xl font-bold text-white mt-2">{car.name}</h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">
                {car.specs.horsepower} hp
              </div>
              <div className="text-sm text-dark-400">{car.specs.engine}</div>
            </div>
            <button
              onClick={handleAddToComparison}
              className="btn btn-outline px-4 py-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Compare
            </button>
          </div>
        </div>

        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.1) 0%, transparent 70%)',
          }}
        />
      </div>
    </div>
  );
};

export default CarCard;
