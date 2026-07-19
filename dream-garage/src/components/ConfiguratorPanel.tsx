'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Car } from '@/types';

// Color options
const paintColors = [
  { name: 'Silver', value: '#C0C0C0' },
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Red', value: '#FF0000' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Green', value: '#008000' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Orange', value: '#FFA500' },
];

const wheelColors = [
  { name: 'Silver', value: '#C0C0C0' },
  { name: 'Black', value: '#000000' },
  { name: 'Gunmetal', value: '#666666' },
  { name: 'Gold', value: '#FFD700' },
  { name: 'White', value: '#FFFFFF' },
];

const caliperColors = [
  { name: 'Red', value: '#FF0000' },
  { name: 'Black', value: '#000000' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Green', value: '#008000' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Silver', value: '#C0C0C0' },
];

const interiorColors = [
  { name: 'Black', value: '#000000' },
  { name: 'Red', value: '#8B0000' },
  { name: 'Beige', value: '#F5F5DC' },
  { name: 'Gray', value: '#808080' },
  { name: 'White', value: '#FFFFFF' },
];

// Configurator Panel component
interface ConfiguratorPanelProps {
  car: Car;
}

export const ConfiguratorPanel = ({ car }: ConfiguratorPanelProps) => {
  const { updateCarConfig } = useStore();
  const [activeTab, setActiveTab] = useState<'paint' | 'wheels' | 'interior' | 'extras'>('paint');

  // Handle configuration changes
  const handleConfigChange = (key: keyof Car['config'], value: any) => {
    updateCarConfig(car.id, { [key]: value });
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
          <h2 className="text-xl font-bold text-white">Configurator</h2>
          <button className="p-2 rounded-lg bg-dark-800/80 border border-dark-600/50 hover:bg-dark-700/80 transition-colors">
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

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('paint')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'paint'
                ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                : 'text-dark-400 hover:text-white hover:bg-dark-800/80'
            }`}
          >
            Paint
          </button>
          <button
            onClick={() => setActiveTab('wheels')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'wheels'
                ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                : 'text-dark-400 hover:text-white hover:bg-dark-800/80'
            }`}
          >
            Wheels
          </button>
          <button
            onClick={() => setActiveTab('interior')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'interior'
                ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                : 'text-dark-400 hover:text-white hover:bg-dark-800/80'
            }`}
          >
            Interior
          </button>
          <button
            onClick={() => setActiveTab('extras')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'extras'
                ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                : 'text-dark-400 hover:text-white hover:bg-dark-800/80'
            }`}
          >
            Extras
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'paint' && (
            <div className="space-y-4">
              <div>
                <label className="label">Paint Color</label>
                <div className="color-picker">
                  {paintColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => handleConfigChange('paintColor', color.value)}
                      className={`color-swatch ${
                        car.config.paintColor === color.value ? 'color-swatch-active' : ''
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wheels' && (
            <div className="space-y-4">
              <div>
                <label className="label">Wheel Color</label>
                <div className="color-picker">
                  {wheelColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => handleConfigChange('wheelColor', color.value)}
                      className={`color-swatch ${
                        car.config.wheelColor === color.value ? 'color-swatch-active' : ''
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="label">Caliper Color</label>
                <div className="color-picker">
                  {caliperColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => handleConfigChange('caliperColor', color.value)}
                      className={`color-swatch ${
                        car.config.caliperColor === color.value ? 'color-swatch-active' : ''
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="label">Wheel Style</label>
                <select
                  value={car.config.wheelStyle}
                  onChange={(e) => handleConfigChange('wheelStyle', e.target.value)}
                  className="input"
                >
                  <option value="stock">Stock</option>
                  <option value="sport">Sport</option>
                  <option value="racing">Racing</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'interior' && (
            <div className="space-y-4">
              <div>
                <label className="label">Interior Color</label>
                <div className="color-picker">
                  {interiorColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => handleConfigChange('interiorColor', color.value)}
                      className={`color-swatch ${
                        car.config.interiorColor === color.value ? 'color-swatch-active' : ''
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="label">Window Tint</label>
                <select
                  value={car.config.windowTint}
                  onChange={(e) => handleConfigChange('windowTint', e.target.value as Car['config']['windowTint'])}
                  className="input"
                >
                  <option value="none">None</option>
                  <option value="light">Light</option>
                  <option value="medium">Medium</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'extras' && (
            <div className="space-y-4">
              <div>
                <label className="label">Ride Height</label>
                <select
                  value={car.config.rideHeight}
                  onChange={(e) => handleConfigChange('rideHeight', e.target.value as Car['config']['rideHeight'])}
                  className="input"
                >
                  <option value="stock">Stock</option>
                  <option value="lowered">Lowered</option>
                  <option value="raised">Raised</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <label className="label mb-0">Spoiler</label>
                <button
                  onClick={() => handleConfigChange('hasSpoiler', !car.config.hasSpoiler)}
                  className={`switch ${car.config.hasSpoiler ? 'switch-checked' : ''}`}
                >
                  <input
                    type="checkbox"
                    className="switch-input"
                    checked={car.config.hasSpoiler}
                    onChange={() => handleConfigChange('hasSpoiler', !car.config.hasSpoiler)}
                  />
                  <span className="switch-slider" />
                </button>
              </div>

              <div>
                <label className="label">License Plate</label>
                <input
                  type="text"
                  value={car.config.licensePlate}
                  onChange={(e) => handleConfigChange('licensePlate', e.target.value)}
                  className="input"
                  placeholder="Enter text"
                  maxLength={8}
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-8">
          <button className="flex-1 btn btn-outline">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset
          </button>
          <button className="flex-1 btn btn-primary">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Save
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ConfiguratorPanel;
