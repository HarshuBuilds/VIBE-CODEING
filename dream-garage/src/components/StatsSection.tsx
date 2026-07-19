'use client';

import { motion } from 'framer-motion';
import { cars, getCarsByBrand } from '@/data/cars';
import { calculatePerformanceScore } from '@/utils';

// Stats Section component
export const StatsSection = () => {
  // Calculate stats
  const totalHorsepower = cars.reduce((sum, car) => sum + car.specs.horsepower, 0);
  const maxHorsepower = Math.max(...cars.map((car) => car.specs.horsepower));
  const minHorsepower = Math.min(...cars.map((car) => car.specs.horsepower));
  const avgHorsepower = totalHorsepower / cars.length;

  const totalTorque = cars.reduce((sum, car) => sum + car.specs.torque, 0);
  const maxTorque = Math.max(...cars.map((car) => car.specs.torque));

  const fastestAcceleration = Math.min(...cars.map((car) => car.specs.acceleration));
  const slowestAcceleration = Math.max(...cars.map((car) => car.specs.acceleration));

  const totalPrice = cars.reduce((sum, car) => sum + car.specs.price, 0);
  const mostExpensive = Math.max(...cars.map((car) => car.specs.price));
  const leastExpensive = Math.min(...cars.map((car) => car.specs.price));

  const brands = [...new Set(cars.map((car) => car.brand))];
  const countries = [...new Set(cars.map((car) => car.country))];

  // Performance scores
  const performanceScores = cars.map((car) => calculatePerformanceScore(car));
  const avgPerformance = performanceScores.reduce((sum, score) => sum + score, 0) / performanceScores.length;

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
          <span className="badge badge-primary mb-4">Statistics</span>
          <h2 className="section-title">By the Numbers</h2>
          <p className="section-subtitle">
            Explore the impressive statistics of our dream car collection.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {/* Total Cars */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="stat-card"
          >
            <div className="stat-value">{cars.length}</div>
            <div className="stat-label">Total Cars</div>
          </motion.div>

          {/* Total Horsepower */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="stat-card"
          >
            <div className="stat-value">{totalHorsepower.toLocaleString()}</div>
            <div className="stat-label">Total Horsepower</div>
          </motion.div>

          {/* Max Horsepower */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="stat-card"
          >
            <div className="stat-value">{maxHorsepower}</div>
            <div className="stat-label">Max Horsepower</div>
          </motion.div>

          {/* Avg Horsepower */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="stat-card"
          >
            <div className="stat-value">{avgHorsepower.toFixed(0)}</div>
            <div className="stat-label">Avg Horsepower</div>
          </motion.div>

          {/* Fastest Acceleration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="stat-card"
          >
            <div className="stat-value">{fastestAcceleration.toFixed(1)}s</div>
            <div className="stat-label">Fastest 0-100</div>
          </motion.div>

          {/* Total Price */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="stat-card"
          >
            <div className="stat-value">${totalPrice.toLocaleString()}</div>
            <div className="stat-label">Total Value</div>
          </motion.div>

          {/* Most Expensive */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="stat-card"
          >
            <div className="stat-value">${mostExpensive.toLocaleString()}</div>
            <div className="stat-label">Most Expensive</div>
          </motion.div>

          {/* Brands */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="stat-card"
          >
            <div className="stat-value">{brands.length}</div>
            <div className="stat-label">Brands</div>
          </motion.div>

          {/* Countries */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="stat-card"
          >
            <div className="stat-value">{countries.length}</div>
            <div className="stat-label">Countries</div>
          </motion.div>

          {/* Max Torque */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="stat-card"
          >
            <div className="stat-value">{maxTorque} Nm</div>
            <div className="stat-label">Max Torque</div>
          </motion.div>

          {/* Avg Performance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="stat-card"
          >
            <div className="stat-value">{avgPerformance.toFixed(0)}%</div>
            <div className="stat-label">Avg Performance</div>
          </motion.div>
        </div>

        {/* Brand Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 bg-dark-900/80 backdrop-blur-md border border-dark-700/50 rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Brand Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {brands.map((brand) => {
              const brandCars = getCarsByBrand(brand);
              const percentage = (brandCars.length / cars.length) * 100;
              
              return (
                <div key={brand} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">{brand}</span>
                    <span className="text-dark-400">{brandCars.length} cars ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
