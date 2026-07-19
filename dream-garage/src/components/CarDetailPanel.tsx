'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Car } from '@/types';
import { formatCarSpecs, calculatePerformanceScore, calculatePowerToWeight } from '@/utils';

// Car Detail Panel component
interface CarDetailPanelProps {
  car: Car;
}

export const CarDetailPanel = ({ car }: CarDetailPanelProps) => {
  const {
    toggleFavorite,
    addToComparison,
    setCurrentView,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'features'>('overview');

  // Format specs
  const specs = formatCarSpecs(car.specs);
  const performanceScore = calculatePerformanceScore(car);
  const powerToWeight = calculatePowerToWeight(car);

  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    toggleFavorite(car.id);
  };

  // Handle add to comparison
  const handleAddToComparison = () => {
    addToComparison(car.id);
  };

  // Handle configure
  const handleConfigure = () => {
    setCurrentView('configurator');
  };

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
          <div>
            <h2 className="text-2xl font-bold text-white">{car.name}</h2>
            <p className="text-dark-400">{car.brand} {car.model}</p>
          </div>
          <button
            onClick={handleFavoriteToggle}
            className={`p-3 rounded-xl transition-colors ${
              car.isFavorite
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-dark-800/80 text-dark-400 border border-dark-600/50 hover:bg-dark-700/80'
            }`}
          >
            <svg
              className="w-6 h-6"
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

        {/* Performance Score */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-dark-400">Performance Score</span>
            <span className="text-2xl font-bold text-gradient">{performanceScore.toFixed(0)}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${performanceScore}%` }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                : 'text-dark-400 hover:text-white hover:bg-dark-800/80'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'specs'
                ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                : 'text-dark-400 hover:text-white hover:bg-dark-800/80'
            }`}
          >
            Specs
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'features'
                ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                : 'text-dark-400 hover:text-white hover:bg-dark-800/80'
            }`}
          >
            Features
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === 'overview' && (
            <>
              {/* Description */}
              <p className="text-dark-300">{car.description}</p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-700/50">
                <div>
                  <div className="text-dark-400 text-sm">Price</div>
                  <div className="font-semibold text-white">{specs.price}</div>
                </div>
                <div>
                  <div className="text-dark-400 text-sm">Year</div>
                  <div className="font-semibold text-white">{specs.year}</div>
                </div>
                <div>
                  <div className="text-dark-400 text-sm">Country</div>
                  <div className="font-semibold text-white">{car.country}</div>
                </div>
                <div>
                  <div className="text-dark-400 text-sm">Drive Type</div>
                  <div className="font-semibold text-white">{car.specs.driveType}</div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4">
                {car.tags.map((tag) => (
                  <span
                    key={tag}
                    className="badge badge-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-4">
              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="stat-card">
                  <div className="stat-value">{specs.horsepower}</div>
                  <div className="stat-label">Horsepower</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{specs.torque}</div>
                  <div className="stat-label">Torque</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{specs.topSpeed}</div>
                  <div className="stat-label">Top Speed</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{specs.acceleration}</div>
                  <div className="stat-label">0-100 km/h</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{specs.weight}</div>
                  <div className="stat-label">Weight</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{powerToWeight}</div>
                  <div className="stat-label">Power-to-Weight</div>
                </div>
              </div>

              {/* Engine Details */}
              <div className="pt-4 border-t border-dark-700/50">
                <div className="text-dark-400 text-sm mb-2">Engine</div>
                <div className="font-semibold text-white">{specs.engine}</div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Features</h3>
              <ul className="space-y-3">
                {car.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-dark-300"
                  >
                    <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-8">
          <button
            onClick={handleAddToComparison}
            className="flex-1 btn btn-outline"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            Compare
          </button>
          <Link
            href={`/configure`}
            onClick={handleConfigure}
            className="flex-1 btn btn-secondary"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Configure
          </Link>
        </div>

        {/* Share Button */}
        <div className="mt-4">
          <button className="w-full btn btn-glass">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
            Share
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CarDetailPanel;
