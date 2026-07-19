'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { SORT_OPTIONS } from '@/types';

// Sort Options component
export const SortOptions = () => {
  const {
    ui: { sortBy, sortOrder },
    setSortBy,
    setSortOrder,
  } = useStore();

  const [isOpen, setIsOpen] = useState(false);

  // Handle sort by change
  const handleSortByChange = (option: string) => {
    setSortBy(option as any);
    setIsOpen(false);
  };

  // Handle sort order change
  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="relative">
      {/* Sort Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-dark-800/80 border border-dark-600/50 rounded-lg text-sm font-medium hover:bg-dark-700/80 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4h13M3 8h9m-9 4h6M4 20h4M4 16h4M12 20v-4M12 12v-4"
          />
        </svg>
        Sort: {sortBy}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={sortOrder === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
          />
        </svg>
      </button>

      {/* Sort Options Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-dark-900/95 backdrop-blur-md border border-dark-700/50 rounded-xl p-4 z-50 min-w-[200px]">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Sort By</h3>
            
            {SORT_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => handleSortByChange(option)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === option
                    ? 'bg-primary-600/20 text-primary-400'
                    : 'text-dark-400 hover:text-white hover:bg-dark-800/80'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}

            <div className="divider" />

            <h3 className="text-sm font-semibold text-white">Order</h3>
            
            <button
              onClick={handleSortOrderChange}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortOrder === 'asc'
                  ? 'bg-primary-600/20 text-primary-400'
                  : 'text-dark-400 hover:text-white hover:bg-dark-800/80'
              }`}
            >
              Ascending (A-Z, 0-9)
            </button>
            <button
              onClick={handleSortOrderChange}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortOrder === 'desc'
                  ? 'bg-primary-600/20 text-primary-400'
                  : 'text-dark-400 hover:text-white hover:bg-dark-800/80'
              }`}
            >
              Descending (Z-A, 9-0)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortOptions;
