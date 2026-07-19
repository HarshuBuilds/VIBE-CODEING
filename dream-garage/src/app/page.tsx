'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedCars } from '@/components/FeaturedCars';
import { AboutSection } from '@/components/AboutSection';
import { StatsSection } from '@/components/StatsSection';
import { Footer } from '@/components/Footer';

// Landing page component
export default function HomePage() {
  const router = useRouter();
  const { setCurrentView, setLoading } = useStore();

  // Set current view to landing
  useEffect(() => {
    setCurrentView('landing');
    setLoading(false);
  }, [setCurrentView, setLoading]);

  // Handle Enter Garage button click
  const handleEnterGarage = () => {
    setCurrentView('garage');
    router.push('/garage');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection onEnterGarage={handleEnterGarage} />

      {/* Featured Cars Section */}
      <FeaturedCars />

      {/* About Section */}
      <AboutSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
