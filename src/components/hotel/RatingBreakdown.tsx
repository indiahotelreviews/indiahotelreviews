import React from 'react';
import type { HotelRatings } from '../../types';
import { StarRating } from '../common/StarRating';

interface RatingBreakdownProps {
  ratings: HotelRatings;
  reviewCount: number;
}

export const RatingBreakdown: React.FC<RatingBreakdownProps> = ({ ratings, reviewCount }) => {
  const criteria = [
    { label: 'Rooms & Comfort', score: ratings.rooms },
    { label: 'Cleanliness & Hygiene', score: ratings.cleanliness },
    { label: 'Service & Hospitality', score: ratings.service },
    { label: 'Location & Surroundings', score: ratings.location },
    { label: 'Food & Dining Quality', score: ratings.food },
    { label: 'Value for Money', score: ratings.value },
    { label: 'Property Amenities', score: ratings.amenities },
  ];

  return (
    <div className="bg-white rounded-xl border border-editorial-border p-6 shadow-subtle">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
        <div className="flex items-center gap-4">
          <div className="bg-neutral-950 text-white font-mono text-3xl sm:text-4xl font-bold px-4 py-2 rounded-lg flex items-center justify-center">
            {ratings.overall.toFixed(1)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <StarRating rating={ratings.overall} size="md" />
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                {ratings.overall >= 4.8
                  ? 'Exceptional Experience'
                  : ratings.overall >= 4.5
                  ? 'Excellent Stay'
                  : 'Very Good Stay'}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Based on {reviewCount.toLocaleString()} verified guest reviews
            </p>
          </div>
        </div>

        <div className="text-right text-xs text-neutral-500 font-mono hidden sm:block">
          100% Genuine Stays · Zero Fake Reviews
        </div>
      </div>

      {/* Horizontal Sub-rating Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-6">
        {criteria.map((item, index) => {
          const percentage = (item.score / 5.0) * 100;
          return (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-800">{item.label}</span>
                <span className="font-mono font-bold text-neutral-950">{item.score.toFixed(1)}</span>
              </div>
              <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-neutral-950 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
