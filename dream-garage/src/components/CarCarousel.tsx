'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CarouselCard } from './CarCard';
import { Car } from '@/types';

// Car Carousel component
interface CarCarouselProps {
  cars: Car[];
}

export const CarCarousel = ({ cars }: CarCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Number of visible items based on screen size
  const getVisibleItems = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1280) return 4;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const visibleItems = getVisibleItems();

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && cars.length > visibleItems) {
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % cars.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, cars.length, visibleItems]);

  // Handle next
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % cars.length);
    if (isAutoPlaying && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % cars.length);
      }, 5000);
    }
  };

  // Handle previous
  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + cars.length) % cars.length);
    if (isAutoPlaying && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % cars.length);
      }, 5000);
    }
  };

  // Toggle auto-play
  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Get visible cars
  const getVisibleCars = () => {
    const startIndex = currentIndex;
    const endIndex = Math.min(startIndex + visibleItems, cars.length);
    
    if (startIndex + visibleItems > cars.length) {
      // Wrap around to the beginning
      const firstPart = cars.slice(startIndex);
      const secondPart = cars.slice(0, visibleItems - firstPart.length);
      return [...firstPart, ...secondPart];
    }
    
    return cars.slice(startIndex, endIndex);
  };

  const visibleCars = getVisibleCars();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Reset to first item on resize
      setCurrentIndex(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (cars.length === 0) {
    return (
      <div className="empty-state py-16">
        <div className="empty-icon">
          <svg className="w-12 h-12 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-white mt-4">No Cars Found</h2>
        <p className="text-dark-400 mt-2">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-6"
          initial={false}
          animate={{
            x: `-${currentIndex * (100 / visibleItems)}%`,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ width: `${(cars.length / visibleItems) * 100}%` }}
        >
          {cars.map((car) => (
            <motion.div
              key={car.id}
              className="flex-shrink-0"
              style={{ width: `${100 / visibleItems}%` }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2">
                <CarouselCard car={car} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      {cars.length > visibleItems && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 p-3 rounded-full bg-dark-800/80 border border-dark-600/50 hover:bg-dark-700/80 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 p-3 rounded-full bg-dark-800/80 border border-dark-600/50 hover:bg-dark-700/80 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Auto-play toggle */}
      <button
        onClick={toggleAutoPlay}
        className="absolute bottom-4 right-4 p-2 rounded-lg bg-dark-800/80 border border-dark-600/50 hover:bg-dark-700/80 transition-colors"
      >
        {isAutoPlaying ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </button>

      {/* Pagination Dots */}
      {cars.length > visibleItems && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(cars.length / visibleItems) }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex / visibleItems ? 1 : -1);
                setCurrentIndex(index * visibleItems);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                Math.floor(currentIndex / visibleItems) === index
                  ? 'bg-primary-500 w-6'
                  : 'bg-dark-600/50 hover:bg-dark-500/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarCarousel;
