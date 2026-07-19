'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { useStore as useZustandStore } from './useStore';

// Redux store provider (for compatibility if needed)
export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

// Zustand store provider (our main store)
export const ZustandProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize the store
  useZustandStore();
  return <>{children}</>;
};

// Combined provider
export const CombinedProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <ZustandProvider>{children}</ZustandProvider>
    </StoreProvider>
  );
};

export default StoreProvider;
