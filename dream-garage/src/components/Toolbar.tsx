'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { cars } from '@/data/cars';

// Toolbar component
export const Toolbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    ui: { currentView, selectedCarId, comparisonCars, soundEnabled, musicEnabled },
    setCurrentView,
    selectCar,
    toggleSound,
    toggleMusic,
    clearComparison,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get current car
  const currentCar = selectedCarId ? cars.find((c) => c.id === selectedCarId) : null;

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/', icon: 'home' },
    { name: 'Garage', path: '/garage', icon: 'garage' },
    { name: 'Compare', path: '/compare', icon: 'compare', badge: comparisonCars.length },
    { name: 'Configure', path: selectedCarId ? '/configure' : '#', icon: 'configure', disabled: !selectedCarId },
  ];

  // Handle navigation
  const handleNavigate = (path: string) => {
    if (path === '#') return;
    
    if (path === '/configure' && !selectedCarId) {
      router.push('/garage');
      return;
    }
    
    router.push(path);
  };

  // Handle back navigation
  const handleBack = () => {
    switch (currentView) {
      case 'showroom':
        router.push('/garage');
        break;
      case 'comparison':
        router.push('/garage');
        break;
      case 'configurator':
        router.push(`/car/${selectedCarId}`);
        break;
      default:
        router.push('/');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-[var(--header-height)] z-[var(--z-sticky)] ${
        isScrolled
          ? 'bg-dark-900/95 backdrop-blur-md border-b border-dark-700/50'
          : 'bg-dark-900/80 backdrop-blur-sm border-b border-dark-700/30'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          {currentView !== 'landing' && currentView !== 'garage' && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 bg-dark-800/80 border border-dark-600/50 rounded-lg text-sm font-medium hover:bg-dark-700/80 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
          )}

          {/* Navigation */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
              const isDisabled = item.disabled;

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigate(item.path)}
                  disabled={isDisabled}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                      : 'text-dark-400 hover:text-white hover:bg-dark-800/80'
                  } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {item.icon === 'home' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  )}
                  {item.icon === 'garage' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z"
                      />
                    </svg>
                  )}
                  {item.icon === 'compare' && (
                    <div className="relative">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                      {item.badge && item.badge > 0 && (
                        <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary-500 rounded-full text-xs text-white flex items-center justify-center font-medium">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                  {item.icon === 'configure' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  )}
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Current Car Info */}
          {currentCar && currentView !== 'landing' && (
            <div className="hidden md:flex items-center gap-4 px-4 py-2 bg-dark-800/80 border border-dark-600/50 rounded-xl">
              <div className="w-8 h-5 bg-dark-700/80 rounded" />
              <div>
                <div className="font-medium text-white">{currentCar.name}</div>
                <div className="text-xs text-dark-400">{currentCar.brand}</div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-3 rounded-xl transition-colors ${
                soundEnabled
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-dark-800/80 text-dark-400 border border-dark-600/50 hover:bg-dark-700/80'
              }`}
              title="Toggle Sound"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {soundEnabled ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.636 5.636a9 9 0 0112.728 0M8.464 15.536a5 5 0 010-7.072"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H17z"
                  />
                )}
              </svg>
            </button>

            {/* Music Toggle */}
            <button
              onClick={toggleMusic}
              className={`p-3 rounded-xl transition-colors ${
                musicEnabled
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-dark-800/80 text-dark-400 border border-dark-600/50 hover:bg-dark-700/80'
              }`}
              title="Toggle Music"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {musicEnabled ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.636 5.636a9 9 0 0112.728 0M8.464 15.536a5 5 0 010-7.072"
                  />
                )}
              </svg>
            </button>

            {/* Settings */}
            <button className="p-3 rounded-xl bg-dark-800/80 border border-dark-600/50 hover:bg-dark-700/80 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Toolbar;
