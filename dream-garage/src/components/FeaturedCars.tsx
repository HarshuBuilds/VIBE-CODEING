'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cars } from '@/data/cars';
import { CarCard } from './CarCard';

// Featured Cars component
export const FeaturedCars = () => {
  const router = useRouter();
  const [featuredCars, setFeaturedCars] = useState<any[]>([]);

  // Get featured cars (top 4 by horsepower)
  useEffect(() => {
    const sortedCars = [...cars].sort((a, b) => b.specs.horsepower - a.specs.horsepower);
    setFeaturedCars(sortedCars.slice(0, 4));
  }, []);

  // Handle view all
  const handleViewAll = () => {
    router.push('/garage');
  };

  return (
    <section className="section bg-dark-1000/80">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <span className="badge badge-primary mb-4">Featured</span>
          <h2 className="section-title">Premium Collection</h2>
          <p className="section-subtitle">
            The most powerful and iconic cars in our garage.
          </p>
        </motion.div>

        {/* Cars Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredCars.map((car, index) => (
            <CarCard key={car.id} car={car} index={index} />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button onClick={handleViewAll} className="btn btn-outline px-8 py-3">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            View All Cars
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCars;
