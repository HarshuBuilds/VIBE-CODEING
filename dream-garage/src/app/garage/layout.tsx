'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

export default function GarageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setCurrentView } = useStore();

  // Set current view to garage
  useEffect(() => {
    setCurrentView('garage');
  }, [setCurrentView]);

  return <>{children}</>;
}
