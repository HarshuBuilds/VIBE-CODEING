'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { cars } from '@/data/cars';

// Header component
export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    ui: { currentView, selectedCarId },
    setCurrentView,
    selectCar,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Garage', path: '/garage' },
    { name: 'Compare', path: '/compare' },
    { name: 'Configure', path: selectedCarId ? `/configure` : '#' },
  ];

  // Get current car name for title
  const currentCar = selectedCarId ? cars.find((c) => c.id === selectedCarId) : null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[var(--z-fixed)] transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-900/95 backdrop-blur-md border-b border-dark-700/50'
          : 'bg-dark-900/80 backdrop-blur-sm border-b border-dark-700/30'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[var(--header-height)]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="logo-icon">
              <svg
                className="w-6 h-6 text-white group-hover:text-primary-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                DREAM GARAGE
              </span>
              {currentCar && (
                <span className="text-xs text-dark-400 hidden sm:block">
                  {currentCar.name}
                </span>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
              const isDisabled = item.path === '#';

              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={(e) => {
                    if (isDisabled) e.preventDefault();
                    if (item.name === 'Configure' && !selectedCarId) {
                      e.preventDefault();
                      router.push('/garage');
                    }
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                      : 'text-dark-300 hover:text-white hover:bg-dark-800/80'
                  } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => router.push('/garage')}
              className="btn btn-outline px-4 py-2 text-sm"
            >
              Browse Cars
            </button>
            <button
              onClick={() => {
                if (selectedCarId) {
                  router.push(`/car/${selectedCarId}`);
                } else {
                  router.push('/garage');
                }
              }}
              className="btn btn-primary px-4 py-2 text-sm"
            >
              {selectedCarId ? 'View Car' : 'Select Car'}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-dark-800/80 border border-dark-600/50 hover:bg-dark-700/80 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 border-t border-dark-700/50">
                {navItems.map((item) => {
                  const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
                  const isDisabled = item.path === '#';

                  return (
                    <Link
                      key={item.name}
                      href={item.path}
                      onClick={(e) => {
                        if (isDisabled) e.preventDefault();
                        if (item.name === 'Configure' && !selectedCarId) {
                          e.preventDefault();
                          router.push('/garage');
                        }
                        setIsMobileMenuOpen(false);
                      }}
                      className={`block px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary-600/20 text-primary-400'
                          : 'text-dark-300 hover:text-white hover:bg-dark-800/80'
                      } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                <div className="px-4 py-3 mt-4 border-t border-dark-700/50">
                  <button
                    onClick={() => {
                      router.push('/garage');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full btn btn-outline text-sm"
                  >
                    Browse Cars
                  </button>
                </div>

                <div className="px-4 py-3">
                  <button
                    onClick={() => {
                      if (selectedCarId) {
                        router.push(`/car/${selectedCarId}`);
                      } else {
                        router.push('/garage');
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full btn btn-primary text-sm"
                  >
                    {selectedCarId ? 'View Car' : 'Select Car'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
