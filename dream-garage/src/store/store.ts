import { configureStore } from '@reduxjs/toolkit';
import { useStore as useZustandStore } from './useStore';

// Redux store configuration (for compatibility if needed)
export const makeStore = () => {
  return configureStore({
    reducer: {},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

// Type for the Redux store
export type AppStore = ReturnType<typeof makeStore>;

// Type for the RootState
export type RootState = ReturnType<AppStore['getState']>;

// Type for the AppDispatch
export type AppDispatch = AppStore['dispatch'];

// Export the Zustand store as the primary store
export { useZustandStore as useStore };

export default makeStore;
