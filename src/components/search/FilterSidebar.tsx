import React from 'react';
import { useApp } from '../../context/AppContext';
import type { HotelCategory, PriceTier } from '../../types';
import { INDIAN_STATES } from '../../data/destinationsData';
import { Filter, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';

export const FilterSidebar: React.FC = () => {
  const { filters, setFilters, resetFilters } = useApp();

  const categories: HotelCategory[] = [
    'Luxury',
    'Heritage',
    'Boutique',
    'Beach Resort',
    'Mountain Retreat',
    'Homestay',
    'Wellness & Spa',
    'Couple-Friendly',
    'Family-Friendly',
    'Pet-Friendly',
    'Business',
    'Budget',
  ];

  const priceTiers: PriceTier[] = ['₹', '₹₹', '₹₹₹', '₹₹₹₹'];

  const handlePriceTierToggle = (tier: PriceTier) => {
    setFilters((prev) => {
      const exists = prev.priceTiers.includes(tier);
      const updated = exists
        ? prev.priceTiers.filter((t) => t !== tier)
        : [...prev.priceTiers, tier];
      return { ...prev, priceTiers: updated };
    });
  };

  return (
    <div className="bg-white rounded-xl border border-editorial-border p-5 space-y-6 shadow-subtle">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm uppercase tracking-wider">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </div>

        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-950 transition-colors font-medium"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Sort By */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800">
          Sort Stays By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              sortBy: e.target.value as any,
            }))
          }
          className="w-full p-2 border border-neutral-300 rounded text-xs bg-white focus:outline-none focus:border-neutral-950 font-medium"
        >
          <option value="highest_rated">Highest Rated (Overall)</option>
          <option value="most_reviewed">Most Reviewed (Community Volume)</option>
          <option value="trending">Trending in India</option>
          <option value="best_value">Best Value for Money</option>
        </select>
      </div>

      {/* 2. Indian State Selector */}
      <div className="space-y-2 pt-2 border-t border-neutral-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800">
          Region / Indian State
        </label>
        <select
          value={filters.selectedState}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              selectedState: e.target.value,
              selectedCity: '',
            }))
          }
          className="w-full p-2 border border-neutral-300 rounded text-xs bg-white focus:outline-none focus:border-neutral-950"
        >
          <option value="">All Indian States ({INDIAN_STATES.length})</option>
          {INDIAN_STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Hotel Categories */}
      <div className="space-y-2 pt-2 border-t border-neutral-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800">
          Stay Style & Category
        </label>
        <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
          <button
            type="button"
            onClick={() => setFilters((prev) => ({ ...prev, selectedCategory: '' }))}
            className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
              filters.selectedCategory === ''
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border-neutral-200'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  selectedCategory: prev.selectedCategory === cat ? '' : cat,
                }))
              }
              className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                filters.selectedCategory === cat
                  ? 'bg-neutral-900 text-white border-neutral-900 font-bold'
                  : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Price Tier Filter */}
      <div className="space-y-2 pt-2 border-t border-neutral-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800">
          Price Category
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {priceTiers.map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => handlePriceTierToggle(tier)}
              className={`py-1.5 text-center rounded text-xs font-mono font-bold border transition-colors ${
                filters.priceTiers.includes(tier)
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border-neutral-200'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
        <span className="text-[10px] text-neutral-500 block font-mono">
          ₹ (&lt;₹5k) · ₹₹ (₹5k–15k) · ₹₹₹ (₹15k–35k) · ₹₹₹₹ (&gt;₹35k)
        </span>
      </div>

      {/* 5. Minimum Rating */}
      <div className="space-y-2 pt-2 border-t border-neutral-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800">
          Minimum Rating
        </label>
        <div className="flex items-center gap-1.5">
          {[0, 4.0, 4.5, 4.8].map((score) => (
            <button
              key={score}
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, minRating: score }))}
              className={`flex-1 py-1 text-center rounded text-xs font-bold border transition-colors flex items-center justify-center gap-1 ${
                filters.minRating === score
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border-neutral-200'
              }`}
            >
              {score === 0 ? 'Any' : `${score} ★`}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Authenticity Toggles */}
      <div className="space-y-3 pt-3 border-t border-neutral-100 text-xs">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, verifiedOnly: e.target.checked }))
            }
            className="w-4 h-4 rounded text-neutral-950 focus:ring-0 border-neutral-300"
          />
          <span className="font-semibold text-neutral-800 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            Verified Stays Only
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.withSocialOnly}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, withSocialOnly: e.target.checked }))
            }
            className="w-4 h-4 rounded text-neutral-950 focus:ring-0 border-neutral-300"
          />
          <span className="font-semibold text-neutral-800 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            With Community Video / Reels
          </span>
        </label>
      </div>
    </div>
  );
};
