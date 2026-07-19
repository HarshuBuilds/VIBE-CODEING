'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Car } from '@/types';
import { formatCarSpecs, calculatePowerToWeight, calculatePerformanceScore } from '@/utils';

// Custom Tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-900/95 backdrop-blur-md border border-dark-700/50 rounded-xl p-4">
        <p className="text-white font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-dark-300">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Comparison Charts component
interface ComparisonChartsProps {
  cars: Car[];
}

export const ComparisonCharts = ({ cars }: ComparisonChartsProps) => {
  const [activeChart, setActiveChart] = useState<'horsepower' | 'torque' | 'acceleration' | 'price' | 'performance'>('horsepower');

  if (cars.length < 2) {
    return (
      <div className="empty-state py-8">
        <p className="text-dark-400">Select 2 cars to compare performance.</p>
      </div>
    );
  }

  // Prepare chart data
  const chartData = [
    {
      name: cars[0].name,
      horsepower: cars[0].specs.horsepower,
      torque: cars[0].specs.torque,
      acceleration: cars[0].specs.acceleration,
      price: cars[0].specs.price,
      performance: calculatePerformanceScore(cars[0]),
      powerToWeight: parseFloat(calculatePowerToWeight(cars[0])),
    },
    {
      name: cars[1].name,
      horsepower: cars[1].specs.horsepower,
      torque: cars[1].specs.torque,
      acceleration: cars[1].specs.acceleration,
      price: cars[1].specs.price,
      performance: calculatePerformanceScore(cars[1]),
      powerToWeight: parseFloat(calculatePowerToWeight(cars[1])),
    },
  ];

  // Format specs for display
  const specs0 = formatCarSpecs(cars[0].specs);
  const specs1 = formatCarSpecs(cars[1].specs);

  // Calculate differences
  const hpDiff = cars[0].specs.horsepower - cars[1].specs.horsepower;
  const torqueDiff = cars[0].specs.torque - cars[1].specs.torque;
  const accelDiff = cars[1].specs.acceleration - cars[0].specs.acceleration;
  const priceDiff = cars[0].specs.price - cars[1].specs.price;
  const ptwDiff = 
    (cars[0].specs.horsepower / cars[0].specs.weight) - 
    (cars[1].specs.horsepower / cars[1].specs.weight);

  // Render the selected chart
  const renderChart = () => {
    switch (activeChart) {
      case 'horsepower':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#393941" />
              <XAxis 
                dataKey="name" 
                stroke="#91919f" 
                fontSize={12}
              />
              <YAxis 
                stroke="#91919f" 
                fontSize={12}
                tickFormatter={(value) => `${value} hp`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#91919f' }} />
              <Bar 
                dataKey="horsepower" 
                fill="#ef4444" 
                name="Horsepower"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'torque':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#393941" />
              <XAxis 
                dataKey="name" 
                stroke="#91919f" 
                fontSize={12}
              />
              <YAxis 
                stroke="#91919f" 
                fontSize={12}
                tickFormatter={(value) => `${value} Nm`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#91919f' }} />
              <Bar 
                dataKey="torque" 
                fill="#3b82f6" 
                name="Torque"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'acceleration':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#393941" />
              <XAxis 
                dataKey="name" 
                stroke="#91919f" 
                fontSize={12}
              />
              <YAxis 
                stroke="#91919f" 
                fontSize={12}
                tickFormatter={(value) => `${value.toFixed(1)}s`}
                reversed
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#91919f' }} />
              <Bar 
                dataKey="acceleration" 
                fill="#10b981" 
                name="0-100 km/h"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'price':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#393941" />
              <XAxis 
                dataKey="name" 
                stroke="#91919f" 
                fontSize={12}
              />
              <YAxis 
                stroke="#91919f" 
                fontSize={12}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip 
                content={<CustomTooltip />} 
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
              />
              <Legend wrapperStyle={{ color: '#91919f' }} />
              <Bar 
                dataKey="price" 
                fill="#f59e0b" 
                name="Price"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'performance':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#393941" />
              <XAxis 
                dataKey="name" 
                stroke="#91919f" 
                fontSize={12}
              />
              <YAxis 
                stroke="#91919f" 
                fontSize={12}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#91919f' }} />
              <Line 
                type="monotone" 
                dataKey="performance" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                name="Performance Score"
                activeDot={{ r: 8, fill: '#8b5cf6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Chart Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveChart('horsepower')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeChart === 'horsepower'
              ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
              : 'text-dark-400 hover:text-white hover:bg-dark-800/80'
          }`}
        >
          Horsepower
        </button>
        <button
          onClick={() => setActiveChart('torque')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeChart === 'torque'
              ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
              : 'text-dark-400 hover:text-white hover:bg-dark-800/80'
          }`}
        >
          Torque
        </button>
        <button
          onClick={() => setActiveChart('acceleration')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeChart === 'acceleration'
              ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
              : 'text-dark-400 hover:text-white hover:bg-dark-800/80'
          }`}
        >
          Acceleration
        </button>
        <button
          onClick={() => setActiveChart('price')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeChart === 'price'
              ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
              : 'text-dark-400 hover:text-white hover:bg-dark-800/80'
          }`}
        >
          Price
        </button>
        <button
          onClick={() => setActiveChart('performance')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeChart === 'performance'
              ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
              : 'text-dark-400 hover:text-white hover:bg-dark-800/80'
          }`}
        >
          Performance Score
        </button>
      </div>

      {/* Chart */}
      <div className="bg-dark-800/80 rounded-xl p-4">
        {renderChart()}
      </div>

      {/* Detailed Comparison Table */}
      <div className="bg-dark-800/80 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Detailed Comparison</h3>
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div />
          <div className="text-center font-semibold text-white">{cars[0].name}</div>
          <div className="text-center font-semibold text-white">{cars[1].name}</div>
        </div>

        <div className="divider" />

        {/* Performance Metrics */}
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-dark-400">Horsepower</div>
            <div className="text-center text-white">{specs0.horsepower}</div>
            <div className="text-center text-white">{specs1.horsepower}</div>
          </div>
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-dark-400">Torque</div>
            <div className="text-center text-white">{specs0.torque}</div>
            <div className="text-center text-white">{specs1.torque}</div>
          </div>
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-dark-400">0-100 km/h</div>
            <div className="text-center text-white">{specs0.acceleration}</div>
            <div className="text-center text-white">{specs1.acceleration}</div>
          </div>
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-dark-400">Top Speed</div>
            <div className="text-center text-white">{specs0.topSpeed}</div>
            <div className="text-center text-white">{specs1.topSpeed}</div>
          </div>
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-dark-400">Weight</div>
            <div className="text-center text-white">{specs0.weight}</div>
            <div className="text-center text-white">{specs1.weight}</div>
          </div>
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-dark-400">Power-to-Weight</div>
            <div className="text-center text-white">{calculatePowerToWeight(cars[0])}</div>
            <div className="text-center text-white">{calculatePowerToWeight(cars[1])}</div>
          </div>
        </div>

        <div className="divider" />

        {/* Engine and Price */}
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-dark-400">Engine</div>
            <div className="text-center text-white">{specs0.engine}</div>
            <div className="text-center text-white">{specs1.engine}</div>
          </div>
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-dark-400">Drive Type</div>
            <div className="text-center text-white">{cars[0].specs.driveType}</div>
            <div className="text-center text-white">{cars[1].specs.driveType}</div>
          </div>
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-dark-400">Price</div>
            <div className="text-center text-white">{specs0.price}</div>
            <div className="text-center text-white">{specs1.price}</div>
          </div>
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-dark-400">Year</div>
            <div className="text-center text-white">{specs0.year}</div>
            <div className="text-center text-white">{specs1.year}</div>
          </div>
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-dark-400">Country</div>
            <div className="text-center text-white">{cars[0].country}</div>
            <div className="text-center text-white">{cars[1].country}</div>
          </div>
        </div>

        <div className="divider" />

        {/* Performance Summary */}
        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-dark-400">Performance Score</div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gradient">
              {calculatePerformanceScore(cars[0]).toFixed(0)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gradient">
              {calculatePerformanceScore(cars[1]).toFixed(0)}%
            </div>
          </div>
        </div>
      </div>

      {/* Winner Summary */}
      <div className="bg-dark-800/80 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Who Wins?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-dark-700/80 rounded-xl p-4">
            <h4 className="font-semibold text-white mb-3">{cars[0].name} Wins In:</h4>
            <ul className="space-y-2 text-sm">
              {hpDiff > 0 && <li className="text-emerald-400">✓ Horsepower (+{hpDiff})</li>}
              {torqueDiff > 0 && <li className="text-emerald-400">✓ Torque (+{torqueDiff})</li>}
              {accelDiff > 0 && <li className="text-emerald-400">✓ Acceleration (faster by {accelDiff.toFixed(1)}s)</li>}
              {priceDiff < 0 && <li className="text-emerald-400">✓ Price (cheaper by ${Math.abs(priceDiff).toLocaleString()})</li>}
              {ptwDiff > 0 && <li className="text-emerald-400">✓ Power-to-Weight</li>}
              {hpDiff <= 0 && torqueDiff <= 0 && accelDiff <= 0 && priceDiff >= 0 && ptwDiff <= 0 && (
                <li className="text-dark-400">No category wins</li>
              )}
            </ul>
          </div>
          
          <div className="bg-dark-700/80 rounded-xl p-4">
            <h4 className="font-semibold text-white mb-3">{cars[1].name} Wins In:</h4>
            <ul className="space-y-2 text-sm">
              {hpDiff < 0 && <li className="text-emerald-400">✓ Horsepower (+{Math.abs(hpDiff)})</li>}
              {torqueDiff < 0 && <li className="text-emerald-400">✓ Torque (+{Math.abs(torqueDiff)})</li>}
              {accelDiff < 0 && <li className="text-emerald-400">✓ Acceleration (faster by {Math.abs(accelDiff).toFixed(1)}s)</li>}
              {priceDiff > 0 && <li className="text-emerald-400">✓ Price (cheaper by ${priceDiff.toLocaleString()})</li>}
              {ptwDiff < 0 && <li className="text-emerald-400">✓ Power-to-Weight</li>}
              {hpDiff >= 0 && torqueDiff >= 0 && accelDiff >= 0 && priceDiff <= 0 && ptwDiff >= 0 && (
                <li className="text-dark-400">No category wins</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ComparisonCharts;
