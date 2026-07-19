'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Car } from '@/types';

// Garage View component (wrapper for different view modes)
interface GarageViewProps {
  cars: Car[];
}

export const GarageView = ({ cars }: GarageViewProps) => {
  const { ui: { viewMode } } = useStore();

  // Render based on view mode
  const renderView = () => {
    switch (viewMode) {
      case 'grid':
        return <div>Grid View</div>;
      case 'carousel':
        return <div>Carousel View</div>;
      case '3d-garage':
        return <div>3D Garage View</div>;
      default:
        return <div>Grid View</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {renderView()}
    </motion.div>
  );
};

export default GarageView;
