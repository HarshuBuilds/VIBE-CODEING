'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { getCarById, compareCars } from '@/data/cars';
import { Toolbar } from '@/components/Toolbar';
import { ComparisonView } from '@/components/ComparisonView';
import { ComparisonCharts } from '@/components/ComparisonCharts';

// Comparison page component
export default function ComparePage() {
  const router = useRouter();
  const {
    ui: { comparisonCars },
    setCurrentView,
    clearComparison,
  } = useStore();

  const [cars, setCars] = useState<any[]>([]);
  const [comparisonData, setComparisonData] = useState<any>(null);

  // Get comparison cars
  useEffect(() => {
    if (comparisonCars.length === 0) {
      router.push('/garage');
      return;
    }

    setCurrentView('comparison');
    
    const foundCars = comparisonCars.map((id) => getCarById(id)).filter(Boolean);
    setCars(foundCars);
    
    if (foundCars.length === 2) {
      setComparisonData(compareCars(foundCars[0], foundCars[1]));
    }
  }, [comparisonCars, router, setCurrentView]);

  // Clear comparison and go back
  const handleClear = () => {
    clearComparison();
    router.push('/garage');
  };

  if (comparisonCars.length < 2) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="empty-state">
          <div className="empty-icon">
            <svg className="w-8 h-8 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Select Cars to Compare</h2>
          <p className="text-dark-400 mb-6">Please select 2 cars from the garage to compare.</p>
          <button onClick={() => router.push('/garage')} className="btn btn-primary">
            Go to Garage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-1000">
      {/* Toolbar */}
      <Toolbar />

      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold">Compare Cars</h1>
            <p className="text-dark-400 mt-2">
              Compare {cars[0]?.name} and {cars[1]?.name}
            </p>
          </div>
          <button onClick={handleClear} className="btn btn-secondary">
            Clear Comparison
          </button>
        </motion.div>

        {/* Comparison View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ComparisonView cars={cars} comparisonData={comparisonData} />
        </div>

        {/* Comparison Charts */}
        <div className="bg-dark-900/80 backdrop-blur-sm border border-dark-700/50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Performance Charts</h2>
          <ComparisonCharts cars={cars} />
        </div>
      </div>
    </div>
  );
}
