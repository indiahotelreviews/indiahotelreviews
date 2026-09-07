import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HotelCard } from '../components/hotel/HotelCard';
import { Bookmark, Compass } from 'lucide-react';

export const SavedHotelsPage: React.FC = () => {
  const { savedHotelIds, hotels, currentUser, navigateTo } = useApp();
  const [activeCollectionId, setActiveCollectionId] = useState<string>('all');

  const savedHotels = hotels.filter((h) => savedHotelIds.includes(h.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500">
            <Bookmark className="w-3.5 h-3.5 text-neutral-900" />
            <span>Personal Travel Wishlists</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-950 mt-1">
            My Saved Stays ({savedHotels.length})
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600">
            Organize verified Indian hotels into custom itineraries and trip ideas
          </p>
        </div>

        <button
          onClick={() => navigateTo('explore')}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-950 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors self-start sm:self-auto"
        >
          <Compass className="w-4 h-4" />
          <span>Explore More Stays</span>
        </button>
      </div>

      {/* Custom Collections Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveCollectionId('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
            activeCollectionId === 'all'
              ? 'bg-neutral-950 text-white'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          All Saved ({savedHotels.length})
        </button>

        {currentUser.collections.map((col) => (
          <button
            key={col.id}
            onClick={() => setActiveCollectionId(col.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
              activeCollectionId === col.id
                ? 'bg-neutral-950 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            📁 {col.name} ({col.hotelIds.length})
          </button>
        ))}
      </div>

      {/* Grid of Saved Hotels */}
      {savedHotels.length === 0 ? (
        <div className="p-16 text-center space-y-4 bg-neutral-50 rounded-2xl border border-neutral-200">
          <Bookmark className="w-12 h-12 text-neutral-300 mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-neutral-800">
            No Saved Hotels Yet
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Click the bookmark icon on any hotel card to save properties for your upcoming trips across India.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('explore')}
              className="px-6 py-2.5 bg-neutral-950 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              Browse Hotels
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} variant="grid" />
          ))}
        </div>
      )}
    </div>
  );
};
