'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';

// Search Bar component
export const SearchBar = () => {
  const { ui: { searchQuery }, setSearchQuery } = useStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Sync with store
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localQuery);
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  // Handle clear
  const handleClear = () => {
    setLocalQuery('');
    setSearchQuery('');
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        
        <input
          type="text"
          value={localQuery}
          onChange={handleChange}
          placeholder="Search cars by name, brand, or tag..."
          className="input pl-12 pr-12"
        />

        {localQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg bg-dark-700/80 border border-dark-600/50 hover:bg-dark-600/80 transition-colors"
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
        )}
      </div>
    </form>
  );
};

export default SearchBar;
