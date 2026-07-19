'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { creator } from '@/data/creator';

// Creator Badge component - Floating badge that appears on all pages
export const CreatorBadge = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Toggle visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setHasInteracted(true);
  };

  // Auto-hide after 10 seconds if not interacted
  useEffect(() => {
    if (!hasInteracted) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [hasInteracted]);

  if (!isVisible) {
    return (
      <button
        onClick={toggleVisibility}
        className="fixed bottom-6 right-6 z-[var(--z-fixed)] w-12 h-12 bg-primary-600/20 border border-primary-800/30 rounded-full flex items-center justify-center hover:bg-primary-600/30 transition-colors shadow-lg"
        title="Show Creator Info"
      >
        <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-[var(--z-fixed)] max-w-xs"
        >
          <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            whileDrag={{ scale: 1.05 }}
            className="bg-dark-900/95 backdrop-blur-md border border-dark-700/50 rounded-2xl p-4 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={toggleVisibility}
              className="absolute -top-2 -right-2 w-6 h-6 bg-dark-800/80 border border-dark-600/50 rounded-full flex items-center justify-center hover:bg-dark-700/80 transition-colors"
              title="Hide"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Avatar */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                {creator.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{creator.name.split(' ')[0]}</p>
                <p className="text-dark-400 text-xs">Creator</p>
              </div>
            </div>

            {/* Message */}
            <p className="text-dark-300 text-sm mb-3">
              Welcome to my Dream Garage! Explore the world's most iconic cars in stunning 3D.
            </p>

            {/* Action buttons */}
            <div className="flex gap-2">
              <a
                href={creator.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn btn-primary px-3 py-2 text-xs"
              >
                Portfolio
              </a>
              <button
                onClick={toggleVisibility}
                className="btn btn-outline px-3 py-2 text-xs"
              >
                Later
              </button>
            </div>

            {/* Tip */}
            <p className="text-dark-500 text-xs mt-2">
              Drag me anywhere!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreatorBadge;
