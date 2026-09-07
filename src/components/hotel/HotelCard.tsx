import React from 'react';
import type { Hotel } from '../../types';
import { useApp } from '../../context/AppContext';
import { StarRating } from '../common/StarRating';
import { Badge } from '../common/Badge';
import { Bookmark, MapPin, Scale, ChevronRight, CheckCircle2 } from 'lucide-react';

interface HotelCardProps {
  hotel: Hotel;
  variant?: 'grid' | 'list' | 'compact';
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, variant = 'grid' }) => {
  const { 
    navigateTo, 
    savedHotelIds, 
    toggleSaveHotel, 
    comparisonHotelIds, 
    toggleCompareHotel 
  } = useApp();

  const isSaved = savedHotelIds.includes(hotel.id);
  const isCompared = comparisonHotelIds.includes(hotel.id);

  if (variant === 'list') {
    return (
      <div className="group bg-white rounded-lg border border-editorial-border overflow-hidden hover:border-neutral-900 transition-all duration-300 shadow-subtle hover:shadow-elevated flex flex-col md:flex-row">
        {/* Grayscale -> Color Image container */}
        <div 
          onClick={() => navigateTo('hotel-detail', hotel.slug)}
          className="relative md:w-80 h-56 md:h-auto shrink-0 overflow-hidden cursor-pointer bg-neutral-900"
        >
          <img
            src={hotel.heroImage}
            alt={hotel.name}
            className="w-full h-full object-cover mono-to-color-zoom"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {hotel.isVerified && <Badge type="verified_stay" />}
            {hotel.trendingScore > 90 && <Badge type="trending" />}
          </div>
          <div className="absolute bottom-3 right-3 bg-neutral-950/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[11px] font-mono">
            {hotel.priceTier} · {hotel.primaryCategory}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex items-center gap-1 text-xs text-neutral-500 font-medium">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>{hotel.location.city}, {hotel.location.state}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCompareHotel(hotel.id);
                  }}
                  className={`p-1.5 rounded text-xs border transition-colors ${
                    isCompared
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'text-neutral-500 hover:text-neutral-900 border-neutral-200'
                  }`}
                  title="Compare hotel"
                >
                  <Scale className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveHotel(hotel.id);
                  }}
                  className={`p-1.5 rounded text-xs border transition-colors ${
                    isSaved
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'text-neutral-500 hover:text-neutral-900 border-neutral-200'
                  }`}
                  title="Save hotel"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
                </button>
              </div>
            </div>

            <h3 
              onClick={() => navigateTo('hotel-detail', hotel.slug)}
              className="font-serif text-xl font-bold text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer"
            >
              {hotel.name}
            </h3>

            <p className="text-xs text-neutral-600 line-clamp-2 mt-1 italic font-serif">
              “{hotel.tagline}”
            </p>

            {/* Ratings Bar */}
            <div className="flex items-center gap-3 mt-3 py-2 border-y border-neutral-100">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-sm font-bold bg-neutral-950 text-white px-2 py-0.5 rounded">
                  {hotel.ratings.overall.toFixed(1)}
                </span>
                <StarRating rating={hotel.ratings.overall} size="sm" />
              </div>
              <span className="text-xs text-neutral-500 font-medium">
                {hotel.reviewCount.toLocaleString()} verified stays
              </span>
            </div>

            {/* Reality check snippet */}
            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50/70 px-2.5 py-1.5 rounded border border-emerald-100">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{hotel.realityCheck.positives[0]}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
            <div className="text-xs text-neutral-500 font-mono">
              From <span className="font-bold text-neutral-900">{hotel.priceRangeText.split('–')[0]}</span>
            </div>
            <button
              onClick={() => navigateTo('hotel-detail', hotel.slug)}
              className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-neutral-950 group-hover:translate-x-0.5 transition-transform"
            >
              <span>View Profile</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid variant (default)
  return (
    <div className="group bg-white rounded-lg border border-editorial-border overflow-hidden hover:border-neutral-900 transition-all duration-300 shadow-subtle hover:shadow-elevated flex flex-col justify-between">
      <div>
        {/* Grayscale -> Color Image container */}
        <div 
          onClick={() => navigateTo('hotel-detail', hotel.slug)}
          className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer bg-neutral-950"
        >
          <img
            src={hotel.heroImage}
            alt={hotel.name}
            className="w-full h-full object-cover mono-to-color-zoom"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {hotel.isVerified && <Badge type="verified_stay" />}
            {hotel.trendingScore > 92 && <Badge type="trending" />}
          </div>

          {/* Save & Compare overlays */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCompareHotel(hotel.id);
              }}
              className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
                isCompared
                  ? 'bg-neutral-950 text-white'
                  : 'bg-white/90 text-neutral-800 hover:bg-white'
              }`}
              title="Compare"
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveHotel(hotel.id);
              }}
              className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
                isSaved
                  ? 'bg-neutral-950 text-white'
                  : 'bg-white/90 text-neutral-800 hover:bg-white'
              }`}
              title="Save"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
            </button>
          </div>

          <div className="absolute bottom-3 right-3 bg-neutral-950/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-mono">
            {hotel.priceTier} · {hotel.primaryCategory}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
            <div className="flex items-center gap-1 font-medium">
              <MapPin className="w-3 h-3 text-neutral-400" />
              <span>{hotel.location.city}, {hotel.location.state}</span>
            </div>
            <span className="font-mono text-[11px] text-neutral-400">
              {hotel.reviewCount} reviews
            </span>
          </div>

          <h3 
            onClick={() => navigateTo('hotel-detail', hotel.slug)}
            className="font-serif text-lg sm:text-xl font-bold text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer line-clamp-1"
          >
            {hotel.name}
          </h3>

          <p className="text-xs text-neutral-600 line-clamp-2 mt-1 italic font-serif leading-relaxed">
            “{hotel.tagline}”
          </p>

          {/* Rating Summary */}
          <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-neutral-100">
            <span className="font-mono text-xs font-bold bg-neutral-950 text-white px-1.5 py-0.5 rounded">
              {hotel.ratings.overall.toFixed(1)}
            </span>
            <StarRating rating={hotel.ratings.overall} size="sm" />
            <span className="text-[11px] text-neutral-400 font-mono ml-auto">
              Cleanliness {hotel.ratings.cleanliness.toFixed(1)}
            </span>
          </div>

          {/* Reality Check Teaser */}
          <div className="mt-3 text-[11px] text-neutral-700 bg-neutral-50 p-2 rounded border border-neutral-100 flex items-start gap-1.5">
            <span className="text-emerald-600 font-bold shrink-0">🟢</span>
            <span className="line-clamp-1">{hotel.realityCheck.positives[0]}</span>
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div className="px-4 sm:px-5 pb-4 pt-1 flex items-center justify-between text-xs border-t border-neutral-50">
        <span className="font-mono text-[11px] text-neutral-500">
          {hotel.priceRangeText.split('–')[0]}
        </span>
        <button
          onClick={() => navigateTo('hotel-detail', hotel.slug)}
          className="font-bold uppercase tracking-wider text-neutral-950 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 text-[11px]"
        >
          <span>View Stays</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
