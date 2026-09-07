import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SearchBar } from '../components/search/SearchBar';
import { FilterSidebar } from '../components/search/FilterSidebar';
import { HotelCard } from '../components/hotel/HotelCard';
import { InteractiveMap } from '../components/search/InteractiveMap';
import { Map, List, Grid, SlidersHorizontal } from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const { filteredHotels } = useApp();
  const [viewMode, setViewMode] = useState<'split' | 'grid' | 'map'>('split');
  const [mobileTab, setMobileTab] = useState<'list' | 'map'>('list');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [selectedHotelForMap, setSelectedHotelForMap] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header & Search */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              India Directory & Map
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-950 mt-1">
              Explore Stays in India
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600">
              Showing {filteredHotels.length} authentic properties scored by community stays
            </p>
          </div>

          {/* View mode toggle on Desktop */}
          <div className="hidden md:flex items-center gap-1 bg-neutral-100 p-1 rounded-lg border border-neutral-200">
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${
                viewMode === 'split' ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Split Map & List</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${
                viewMode === 'grid' ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${
                viewMode === 'map' ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Full Map</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar size="compact" />
      </div>

      {/* Mobile Toggle & Filter Launcher */}
      <div className="flex items-center justify-between gap-2 md:hidden">
        <div className="flex items-center bg-neutral-100 p-1 rounded-lg border border-neutral-200">
          <button
            onClick={() => setMobileTab('list')}
            className={`px-3 py-1 text-xs font-bold uppercase rounded ${
              mobileTab === 'list' ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-600'
            }`}
          >
            List ({filteredHotels.length})
          </button>
          <button
            onClick={() => setMobileTab('map')}
            className={`px-3 py-1 text-xs font-bold uppercase rounded ${
              mobileTab === 'map' ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-600'
            }`}
          >
            Map
          </button>
        </div>

        <button
          onClick={() => setShowFilterDrawer(!showFilterDrawer)}
          className="flex items-center gap-1 px-3 py-1.5 bg-neutral-900 text-white rounded text-xs font-bold uppercase tracking-wider"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {showFilterDrawer && (
        <div className="md:hidden">
          <FilterSidebar />
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-12 gap-8">
        {/* Left Col: Filters Sidebar */}
        <div className="col-span-3">
          <FilterSidebar />
        </div>

        {/* Right Content */}
        <div className="col-span-9 space-y-6">
          {viewMode === 'split' && (
            <div className="grid grid-cols-12 gap-6">
              {/* Hotel List */}
              <div className="col-span-6 space-y-4 max-h-[850px] overflow-y-auto pr-2">
                {filteredHotels.length === 0 ? (
                  <div className="p-8 bg-neutral-50 rounded-xl text-center text-xs text-neutral-500">
                    No stays match your active search filters. Try resetting filters.
                  </div>
                ) : (
                  filteredHotels.map((hotel) => (
                    <div
                      key={hotel.id}
                      onMouseEnter={() => setSelectedHotelForMap(hotel.id)}
                    >
                      <HotelCard hotel={hotel} variant="grid" />
                    </div>
                  ))
                )}
              </div>

              {/* Sticky Map */}
              <div className="col-span-6 sticky top-28 h-[850px]">
                <InteractiveMap
                  hotels={filteredHotels}
                  selectedHotelId={selectedHotelForMap}
                  height="850px"
                />
              </div>
            </div>
          )}

          {viewMode === 'grid' && (
            <div className="grid grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} variant="grid" />
              ))}
            </div>
          )}

          {viewMode === 'map' && (
            <div className="w-full">
              <InteractiveMap
                hotels={filteredHotels}
                selectedHotelId={selectedHotelForMap}
                height="700px"
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile View Content */}
      <div className="md:hidden">
        {mobileTab === 'list' ? (
          <div className="space-y-4">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} variant="grid" />
            ))}
          </div>
        ) : (
          <div className="w-full">
            <InteractiveMap hotels={filteredHotels} height="600px" />
          </div>
        )}
      </div>
    </div>
  );
};
