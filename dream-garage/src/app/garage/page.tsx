'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { cars, filterCars, sortCars } from '@/data/cars';
import { GarageView } from '@/components/GarageView';
import { CarGrid } from '@/components/CarGrid';
import { CarCarousel } from '@/components/CarCarousel';
import { Garage3D } from '@/components/Garage3D';
import { Toolbar } from '@/components/Toolbar';
import { SearchBar } from '@/components/SearchBar';
import { FilterPanel } from '@/components/FilterPanel';
import { SortOptions } from '@/components/SortOptions';

// Garage page component
export default function GaragePage() {
  const {
    ui: { viewMode, searchQuery, filterBrand, filterCountry, sortBy, sortOrder },
    setViewMode,
  } = useStore();

  // Get filtered and sorted cars
  const [filteredCars, setFilteredCars] = useState<typeof cars>([]);

  useEffect(() => {
    const filtered = filterCars(cars, filterBrand, filterCountry, searchQuery);
    const sorted = sortCars(filtered, sortBy, sortOrder);
    setFilteredCars(sorted);
  }, [filterBrand, filterCountry, searchQuery, sortBy, sortOrder]);

  // View mode components
  const renderView = () => {
    switch (viewMode) {
      case 'grid':
        return <CarGrid cars={filteredCars} />;
      case 'carousel':
        return <CarCarousel cars={filteredCars} />;
      case '3d-garage':
        return <Garage3D cars={filteredCars} />;
      default:
        return <CarGrid cars={filteredCars} />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-1000">
      {/* Toolbar */}
      <Toolbar />

      {/* Search and Filter Bar */}
      <div className="sticky top-[var(--header-height)] z-[var(--z-sticky)] bg-dark-900/80 backdrop-blur-md border-b border-dark-700/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1">
              <SearchBar />
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                    : 'bg-dark-800/80 text-dark-300 border border-dark-600/50 hover:bg-dark-700/80'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('carousel')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'carousel'
                    ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                    : 'bg-dark-800/80 text-dark-300 border border-dark-600/50 hover:bg-dark-700/80'
                }`}
              >
                Carousel
              </button>
              <button
                onClick={() => setViewMode('3d-garage')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === '3d-garage'
                    ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                    : 'bg-dark-800/80 text-dark-300 border border-dark-600/50 hover:bg-dark-700/80'
                }`}
              >
                3D Garage
              </button>
            </div>

            {/* Filter Toggle (Mobile) */}
            <button className="md:hidden p-2 rounded-lg bg-dark-800/80 border border-dark-600/50 hover:bg-dark-700/80 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Filter and Sort Options */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <FilterPanel />
            <SortOptions />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-dark-400">
            Showing <span className="text-white font-semibold">{filteredCars.length}</span> of{' '}
            <span className="text-white font-semibold">{cars.length}</span> cars
          </p>
        </div>

        {/* View Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
