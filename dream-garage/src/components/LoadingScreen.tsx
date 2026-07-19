'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

// Loading Screen component
export const LoadingScreen = () => {
  const { ui: { isLoading } } = useStore();
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  // Simulate loading progress
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 500);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Hide loading screen when not loading
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShow(true);
      setProgress(0);
    }
  }, [isLoading]);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="loading-screen"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dark-1000" />

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">DREAM GARAGE</h1>
            <p className="text-dark-400 mt-1">Loading Premium Experience</p>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="loading-progress"
        >
          <motion.div
            className="loading-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-dark-400 mt-6 text-sm"
        >
          {progress < 100 ? 'Loading assets...' : 'Almost there...'}
        </motion.p>

        {/* Spinner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8"
        >
          <div className="spinner" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
