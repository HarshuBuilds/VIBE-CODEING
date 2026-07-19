'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { CAR_BRANDS, CAR_COUNTRIES } from '@/types';

// Filter Panel component
export const FilterPanel = () => {
  const {
    ui: { filterBrand, filterCountry },
    setFilterBrand,
    setFilterCountry,
  } = useStore();

  const [isOpen, setIsOpen] = useState(false);

  // Handle brand filter
  const handleBrandChange = (brand: string | null) => {
    setFilterBrand(brand);
  };

  // Handle country filter
  const handleCountryChange = (country: string | null) => {
    setFilterCountry(country);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilterBrand(null);
    setFilterCountry(null);
  };

  // Check if any filter is active
  const hasActiveFilters = filterBrand !== null || filterCountry !== null;

  return (
    <div className="relative">
      {/* Filter Button (Mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex items-center gap-2 px-4 py-2 bg-dark-800/80 border border-dark-600/50 rounded-lg text-sm font-medium hover:bg-dark-700/80 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        Filters
        {hasActiveFilters && (
          <span className="w-2 h-2 bg-primary-500 rounded-full" />
        )}
      </button>

      {/* Filter Panel (Desktop) */}
      <div className="hidden md:flex items-center gap-4">
        {/* Brand Filter */}
        <select
          value={filterBrand || ''}
          onChange={(e) => handleBrandChange(e.target.value || null)}
          className="input text-sm"
        >
          <option value="">All Brands</option>
          {CAR_BRANDS.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>

        {/* Country Filter */}
        <select
          value={filterCountry || ''}
          onChange={(e) => handleCountryChange(e.target.value || null)}
          className="input text-sm"
        >
          <option value="">All Countries</option>
          {CAR_COUNTRIES.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-dark-800/80 border border-dark-600/50 rounded-lg text-sm font-medium hover:bg-dark-700/80 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear
          </button>
        )}
      </div>

      {/* Mobile Filter Panel */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-dark-900/95 backdrop-blur-md border border-dark-700/50 rounded-xl p-4 z-50">
          <div className="space-y-4">
            {/* Brand Filter */}
            <div>
              <label className="label text-sm">Brand</label>
              <select
                value={filterBrand || ''}
                onChange={(e) => handleBrandChange(e.target.value || null)}
                className="input text-sm"
              >
                <option value="">All Brands</option>
                {CAR_BRANDS.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Country Filter */}
            <div>
              <label className="label text-sm">Country</label>
              <select
                value={filterCountry || ''}
                onChange={(e) => handleCountryChange(e.target.value || null)}
                className="input text-sm"
              >
                <option value="">All Countries</option>
                {CAR_COUNTRIES.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={clearFilters}
                className="flex-1 btn btn-outline text-sm"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 btn btn-primary text-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
