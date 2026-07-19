'use client';

import { motion } from 'framer-motion';
import { CarCard } from './CarCard';
import { Car } from '@/types';

// Car Grid component
interface CarGridProps {
  cars: Car[];
}

export const CarGrid = ({ cars }: CarGridProps) => {
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
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {cars.map((car, index) => (
        <CarCard key={car.id} car={car} index={index} />
      ))}
    </motion.div>
  );
};

export default CarGrid;
