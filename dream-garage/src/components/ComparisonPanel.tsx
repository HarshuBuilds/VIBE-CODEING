'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Car } from '@/types';
import { formatCarSpecs, calculatePerformanceScore, calculatePowerToWeight, compareCars } from '@/utils';

// Comparison Panel component
interface ComparisonPanelProps {
  car: Car;
}

export const ComparisonPanel = ({ car }: ComparisonPanelProps) => {
  const { comparisonCars, removeFromComparison, clearComparison } = useStore();
  const [selectedCar, setSelectedCar] = useState<string | null>(null);

  // Get comparison cars
  const comparisonCarIds = comparisonCars.filter((id) => id !== car.id);
  const comparisonCar = comparisonCarIds.length > 0 ? comparisonCarIds.map((id) => {
    // In a real implementation, we would get the car from the store
    return { id, name: 'Comparison Car' };
  })[0] : null;

  // Format specs
  const specs = formatCarSpecs(car.specs);
  const performanceScore = calculatePerformanceScore(car);
  const powerToWeight = calculatePowerToWeight(car);

  // Handle select car for comparison
  const handleSelectCar = (carId: string) => {
    setSelectedCar(carId);
  };

  // Handle remove from comparison
  const handleRemove = (carId: string) => {
    removeFromComparison(carId);
  };

  if (comparisonCarIds.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-[calc(var(--header-height)+2rem)]"
      >
        <div className="bg-dark-900/80 backdrop-blur-md border border-dark-700/50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Compare</h2>
          <p className="text-dark-400 mb-6">Select another car to compare with {car.name}.</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-dark-400">Selected Car</span>
              <span className="font-semibold text-white">{car.name}</span>
            </div>
            
            <div className="divider" />
            
            <p className="text-dark-400 text-center">No car selected for comparison</p>
            
            <button
              onClick={() => {
                // Open garage to select a car
                window.location.href = '/garage';
              }}
              className="w-full btn btn-primary"
            >
              Select Car to Compare
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-[calc(var(--header-height)+2rem)]"
    >
      <div className="bg-dark-900/80 backdrop-blur-md border border-dark-700/50 rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Compare</h2>
          <button
            onClick={clearComparison}
            className="p-2 rounded-lg bg-dark-800/80 border border-dark-600/50 hover:bg-dark-700/80 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Comparison Cars */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-dark-400">Car 1</span>
            <span className="font-semibold text-white">{car.name}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-dark-400">Car 2</span>
            <select
              value={selectedCar || ''}
              onChange={(e) => handleSelectCar(e.target.value)}
              className="input text-sm"
            >
              <option value="">Select a car</option>
              {comparisonCarIds.map((id) => (
                <option key={id} value={id}>Car {comparisonCarIds.indexOf(id) + 2}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="divider" />

        {/* Quick Stats */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Quick Stats</h3>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-dark-400">Horsepower</div>
              <div className="font-semibold text-white">{specs.horsepower}</div>
            </div>
            <div>
              <div className="text-dark-400">vs</div>
              <div className="font-semibold text-white">- hp</div>
            </div>
            <div>
              <div className="text-dark-400">0-100 km/h</div>
              <div className="font-semibold text-white">{specs.acceleration}</div>
            </div>
            <div>
              <div className="text-dark-400">vs</div>
              <div className="font-semibold text-white">- s</div>
            </div>
            <div>
              <div className="text-dark-400">Top Speed</div>
              <div className="font-semibold text-white">{specs.topSpeed}</div>
            </div>
            <div>
              <div className="text-dark-400">vs</div>
              <div className="font-semibold text-white">- km/h</div>
            </div>
          </div>
        </div>

        <div className="divider" />

        {/* Performance Score */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-dark-400">Performance Score</span>
            <span className="text-xl font-bold text-gradient">{performanceScore.toFixed(0)}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${performanceScore}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6">
          <button
            onClick={() => handleRemove(car.id)}
            className="flex-1 btn btn-outline"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Remove
          </button>
          <button className="flex-1 btn btn-primary">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            View Full Comparison
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ComparisonPanel;
