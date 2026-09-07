import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HotelCard } from '../components/hotel/HotelCard';
import { Trophy } from 'lucide-react';

export const RankingsPage: React.FC = () => {
  const { hotels } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const rankingCategories = [
    { id: 'all', name: 'Best Overall in India' },
    { id: 'Heritage', name: 'Best Heritage & Living Palaces' },
    { id: 'Beach Resort', name: 'Best Beach & Coastal Resorts' },
    { id: 'Luxury', name: 'Best Luxury Sanctuaries' },
    { id: 'Wellness & Spa', name: 'Best Wellness & Ayurvedic Escapes' },
    { id: 'Mountain Retreat', name: 'Best Mountain & Hill Chalets' },
    { id: 'Homestay', name: 'Best Planter & Boutique Homestays' },
    { id: 'Family-Friendly', name: 'Best Family & Pilgrimage Stays' },
  ];

  const getRankedHotels = () => {
    let filtered = [...hotels];
    if (activeCategory !== 'all') {
      filtered = filtered.filter((h) => h.categories.includes(activeCategory as any));
    }
    return filtered.sort((a, b) => b.ratings.overall - a.ratings.overall);
  };

  const rankedList = getRankedHotels();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Editorial Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>India Hotel Review Honours</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight">
          The Best Stays in India
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed">
          Ranked purely by verified stay quality, genuine guest reviews, and hospitality consistency — not commercial sponsorships.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start sm:justify-center">
        {rankingCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
              activeCategory === cat.id
                ? 'bg-neutral-950 text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Ranked Hotel Cards List with Leaderboard Badges */}
      <div className="space-y-6">
        {rankedList.map((hotel, index) => (
          <div key={hotel.id} className="relative">
            {/* Rank Number Badge */}
            <div className="absolute -top-3 -left-3 z-20 w-8 h-8 rounded-full bg-neutral-950 text-white font-mono font-bold text-xs flex items-center justify-center border-2 border-white shadow-elevated">
              #{index + 1}
            </div>

            <HotelCard hotel={hotel} variant="list" />
          </div>
        ))}
      </div>
    </div>
  );
};
