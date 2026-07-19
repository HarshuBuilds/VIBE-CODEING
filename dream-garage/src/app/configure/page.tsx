'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { getCarById } from '@/data/cars';
import { Toolbar } from '@/components/Toolbar';
import { Configurator } from '@/components/Configurator';

// Configurator page component
export default function ConfigurePage() {
  const router = useRouter();
  const {
    ui: { selectedCarId },
    selectCar,
    setCurrentView,
  } = useStore();

  const [car, setCar] = useState<any>(null);

  // Get selected car
  useEffect(() => {
    if (!selectedCarId) {
      router.push('/garage');
      return;
    }

    const foundCar = getCarById(selectedCarId);
    if (foundCar) {
      selectCar(selectedCarId);
      setCar(foundCar);
      setCurrentView('configurator');
    } else {
      router.push('/garage');
    }
  }, [selectedCarId, selectCar, setCurrentView, router]);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner" />
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
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold">Configure {car.name}</h1>
            <p className="text-dark-400 mt-2">
              Customize your dream car with various options and see the changes in real-time.
            </p>
          </div>

          {/* Configurator Component */}
          <Configurator car={car} />
        </motion.div>
      </div>
    </div>
  );
}
