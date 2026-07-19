'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { getCarById } from '@/data/cars';
import { CarShowroom } from '@/components/CarShowroom';
import { CarDetailPanel } from '@/components/CarDetailPanel';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { ConfiguratorPanel } from '@/components/ConfiguratorPanel';
import { Toolbar } from '@/components/Toolbar';

// Car detail page component
export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const {
    ui: { showStats, showConfigurator },
    selectCar,
    setCurrentView,
  } = useStore();

  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Get car data
  useEffect(() => {
    const carId = params.id as string;
    const foundCar = getCarById(carId);
    
    if (foundCar) {
      selectCar(carId);
      setCar(foundCar);
      setCurrentView('showroom');
    } else {
      // Car not found, redirect to garage
      router.push('/garage');
    }
    
    setLoading(false);
  }, [params.id, selectCar, setCurrentView, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="error-state">
          <div className="error-icon">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="error-title">Car Not Found</h2>
          <p className="error-message">The car you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/garage')}
            className="btn btn-primary mt-6"
          >
            Back to Garage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-1000">
      {/* Toolbar */}
      <Toolbar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Car Showroom (3D View) */}
          <div className="lg:col-span-2">
            <CarShowroom car={car} />
          </div>

          {/* Side Panels */}
          <div className="space-y-6">
            {/* Car Details */}
            <CarDetailPanel car={car} />

            {/* Comparison Panel (if in comparison mode) */}
            {showStats && <ComparisonPanel car={car} />}

            {/* Configurator Panel */}
            {showConfigurator && <ConfiguratorPanel car={car} />}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
