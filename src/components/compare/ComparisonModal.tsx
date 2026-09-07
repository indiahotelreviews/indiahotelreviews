import React from 'react';
import { useApp } from '../../context/AppContext';
import { StarRating } from '../common/StarRating';
import { X, Scale, Sparkles } from 'lucide-react';

export const ComparisonModal: React.FC = () => {
  const { 
    comparisonModalOpen, 
    setComparisonModalOpen, 
    comparisonHotelIds, 
    clearComparison, 
    toggleCompareHotel,
    hotels, 
    navigateTo 
  } = useApp();

  if (!comparisonModalOpen) return null;

  const comparedHotels = hotels.filter((h) => comparisonHotelIds.includes(h.id));

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl border border-neutral-300 max-w-6xl w-full max-h-[92vh] flex flex-col shadow-modal overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-950 text-white flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Side-by-Side Analysis
                </span>
                <span className="text-xs font-mono font-bold bg-neutral-200 text-neutral-800 px-2 py-0.5 rounded">
                  {comparedHotels.length} of 4 Stays
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-950">
                Hotel Comparison Matrix
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearComparison}
              className="text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-neutral-950 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => setComparisonModalOpen(false)}
              className="p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-200 transition-colors"
              aria-label="Close comparison modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {comparedHotels.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <Scale className="w-12 h-12 text-neutral-300 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-neutral-800">
              No Hotels Selected for Comparison
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Browse hotels on the explore page and click the compare icon (⚖) on any card to view detailed side-by-side matrices.
            </p>
          </div>
        ) : (
          <div className="p-5 sm:p-6 overflow-x-auto overflow-y-auto flex-1 space-y-8">
            {/* Table Matrix */}
            <div className="min-w-[650px]">
              {/* Hotel Cards Header Row */}
              <div className="grid grid-cols-4 gap-4 pb-6 border-b border-neutral-200">
                <div className="flex flex-col justify-end p-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                    Property Comparison
                  </span>
                  <span className="font-serif text-lg font-bold text-neutral-900 mt-1">
                    Key Dimensions
                  </span>
                </div>

                {comparedHotels.map((hotel) => (
                  <div key={hotel.id} className="relative group bg-neutral-50 p-3 rounded-xl border border-neutral-200 flex flex-col justify-between space-y-3">
                    <button
                      onClick={() => toggleCompareHotel(hotel.id)}
                      className="absolute top-2 right-2 p-1 bg-black/60 text-white rounded-full hover:bg-black z-10"
                      title="Remove from comparison"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div className="aspect-[16/10] rounded-lg overflow-hidden bg-neutral-950">
                      <img
                        src={hotel.heroImage}
                        alt={hotel.name}
                        className="w-full h-full object-cover mono-to-color-zoom"
                      />
                    </div>

                    <div>
                      <div className="text-[10px] uppercase font-bold text-neutral-500">
                        {hotel.location.city}, {hotel.location.state}
                      </div>
                      <h4 className="font-serif font-bold text-sm text-neutral-950 line-clamp-1">
                        {hotel.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="font-mono text-xs font-bold bg-neutral-950 text-white px-1.5 py-0.5 rounded">
                          {hotel.ratings.overall.toFixed(1)}
                        </span>
                        <StarRating rating={hotel.ratings.overall} size="sm" />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setComparisonModalOpen(false);
                        navigateTo('hotel-detail', hotel.slug);
                      }}
                      className="w-full py-1.5 bg-neutral-950 text-white rounded text-[11px] font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                    >
                      View Profile
                    </button>
                  </div>
                ))}
              </div>

              {/* Rows */}
              <div className="divide-y divide-neutral-100 text-xs text-neutral-800">
                {/* Price Tier & Category */}
                <div className="grid grid-cols-4 gap-4 py-3.5 items-center font-medium">
                  <div className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
                    Price & Category
                  </div>
                  {comparedHotels.map((h) => (
                    <div key={h.id}>
                      <span className="font-mono font-bold text-neutral-950">{h.priceTier}</span>
                      <span className="text-neutral-500"> ({h.primaryCategory})</span>
                      <div className="text-[10px] text-neutral-500 mt-0.5 font-mono">{h.priceRangeText}</div>
                    </div>
                  ))}
                </div>

                {/* Rooms Score */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <div className="font-semibold text-neutral-700">Rooms & Comfort</div>
                  {comparedHotels.map((h) => (
                    <div key={h.id} className="font-mono font-bold text-sm">
                      {h.ratings.rooms.toFixed(1)} / 5.0
                    </div>
                  ))}
                </div>

                {/* Cleanliness Score */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <div className="font-semibold text-neutral-700">Cleanliness & Hygiene</div>
                  {comparedHotels.map((h) => (
                    <div key={h.id} className="font-mono font-bold text-sm">
                      {h.ratings.cleanliness.toFixed(1)} / 5.0
                    </div>
                  ))}
                </div>

                {/* Service Score */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <div className="font-semibold text-neutral-700">Service & Hospitality</div>
                  {comparedHotels.map((h) => (
                    <div key={h.id} className="font-mono font-bold text-sm">
                      {h.ratings.service.toFixed(1)} / 5.0
                    </div>
                  ))}
                </div>

                {/* Food Score */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <div className="font-semibold text-neutral-700">Food & Dining</div>
                  {comparedHotels.map((h) => (
                    <div key={h.id} className="font-mono font-bold text-sm">
                      {h.ratings.food.toFixed(1)} / 5.0
                    </div>
                  ))}
                </div>

                {/* Location Score */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <div className="font-semibold text-neutral-700">Location Score</div>
                  {comparedHotels.map((h) => (
                    <div key={h.id} className="font-mono font-bold text-sm">
                      {h.ratings.location.toFixed(1)} / 5.0
                    </div>
                  ))}
                </div>

                {/* Value for Money */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <div className="font-semibold text-neutral-700">Value for Money</div>
                  {comparedHotels.map((h) => (
                    <div key={h.id} className="font-mono font-bold text-sm">
                      {h.ratings.value.toFixed(1)} / 5.0
                    </div>
                  ))}
                </div>

                {/* Reality Check Highlight */}
                <div className="grid grid-cols-4 gap-4 py-3.5 items-start">
                  <div className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
                    Reality Check: Best Feature
                  </div>
                  {comparedHotels.map((h) => (
                    <div key={h.id} className="text-xs text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200">
                      🟢 {h.realityCheck.positives[0]}
                    </div>
                  ))}
                </div>

                {/* Reality Check Drawback */}
                <div className="grid grid-cols-4 gap-4 py-3.5 items-start">
                  <div className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
                    Reality Check: Notable Factor
                  </div>
                  {comparedHotels.map((h) => (
                    <div key={h.id} className="text-xs text-amber-900 bg-amber-50 p-2 rounded border border-amber-200">
                      🟡 {h.realityCheck.notable[0]}
                    </div>
                  ))}
                </div>

                {/* Suited For */}
                <div className="grid grid-cols-4 gap-4 py-3.5 items-start">
                  <div className="font-semibold text-neutral-700">Best Suited For</div>
                  {comparedHotels.map((h) => (
                    <div key={h.id} className="flex flex-wrap gap-1">
                      {h.bestSuitedFor.map((item, idx) => (
                        <span key={idx} className="text-[10px] bg-neutral-100 text-neutral-800 px-1.5 py-0.5 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Editorial "OUR TAKE" Verdict Section */}
            <div className="bg-neutral-950 text-white rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <h3 className="font-serif text-xl font-bold uppercase tracking-wider">
                  Our Take: Comparison Verdict
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs leading-relaxed text-neutral-300">
                {comparedHotels.map((h) => (
                  <div key={h.id} className="bg-neutral-900/90 p-4 rounded-lg border border-neutral-800 space-y-1.5">
                    <h4 className="font-bold text-white text-sm">{h.name}</h4>
                    <p className="italic font-serif text-neutral-300">“{h.editorialVerdict}”</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
