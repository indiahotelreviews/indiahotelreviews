import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, MapPin, Sparkles, X } from 'lucide-react';

interface SearchBarProps {
  size?: 'large' | 'compact';
  onSearchSubmit?: () => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  size = 'large',
  onSearchSubmit,
  className = '',
}) => {
  const { filters, setFilters, navigateTo } = useApp();
  const [localQuery, setLocalQuery] = useState(filters.searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const quickCities = ['Goa', 'Jaipur', 'Udaipur', 'Bengaluru', 'Hyderabad', 'Kerala', 'Mumbai', 'Rishikesh'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      searchQuery: localQuery,
    }));
    setShowSuggestions(false);
    navigateTo('explore');
    if (onSearchSubmit) onSearchSubmit();
  };

  const handleSelectQuickCity = (city: string) => {
    setLocalQuery(city);
    setFilters((prev) => ({
      ...prev,
      searchQuery: city,
      selectedCity: city,
    }));
    setShowSuggestions(false);
    navigateTo('explore');
    if (onSearchSubmit) onSearchSubmit();
  };

  const handleClear = () => {
    setLocalQuery('');
    setFilters((prev) => ({
      ...prev,
      searchQuery: '',
      selectedCity: '',
    }));
  };

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${className}`}>
      <form
        onSubmit={handleSearch}
        className={`flex items-center bg-white rounded-xl border transition-all duration-300 shadow-elevated ${
          size === 'large'
            ? 'p-2 sm:p-2.5 border-neutral-300 hover:border-neutral-900 focus-within:border-neutral-950 ring-4 ring-neutral-900/5'
            : 'p-1.5 border-neutral-200 hover:border-neutral-800'
        }`}
      >
        <div className="pl-3 sm:pl-4 text-neutral-400">
          <Search className={size === 'large' ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-4 h-4'} />
        </div>

        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search hotels, cities, destinations across India..."
          className={`w-full px-3 py-2 bg-transparent text-neutral-900 placeholder:text-neutral-400 focus:outline-none font-medium ${
            size === 'large' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
          }`}
        />

        {localQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 text-neutral-400 hover:text-neutral-800 rounded-full"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="submit"
          className={`bg-neutral-950 text-white font-bold uppercase tracking-wider rounded-lg shrink-0 hover:bg-neutral-800 transition-colors ${
            size === 'large'
              ? 'px-5 sm:px-7 py-3 text-xs sm:text-sm'
              : 'px-4 py-2 text-xs'
          }`}
        >
          Search
        </button>
      </form>

      {/* Quick Suggestions Dropdown */}
      {showSuggestions && (
        <div 
          className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl border border-neutral-200 p-4 shadow-modal z-30 animate-fadeIn"
          onMouseLeave={() => setShowSuggestions(false)}
        >
          <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-neutral-600" />
            <span>Trending Indian Destinations</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickCities.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => handleSelectQuickCity(city)}
                className="flex items-center gap-1 px-3 py-1.5 bg-neutral-50 hover:bg-neutral-900 hover:text-white rounded-lg text-xs font-semibold text-neutral-800 border border-neutral-200 transition-colors"
              >
                <MapPin className="w-3 h-3 text-neutral-400" />
                <span>{city}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
