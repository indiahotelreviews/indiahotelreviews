import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StarRating } from '../components/common/StarRating';
import { Badge } from '../components/common/Badge';
import { RealityCheckCard } from '../components/hotel/RealityCheckCard';
import { RatingBreakdown } from '../components/hotel/RatingBreakdown';
import { HotelGallery } from '../components/hotel/HotelGallery';
import { SocialMediaCards } from '../components/hotel/SocialMediaCards';
import { ReviewCard } from '../components/review/ReviewCard';
import { InteractiveMap } from '../components/search/InteractiveMap';
import { 
  MapPin, 
  Bookmark, 
  Scale, 
  Share2, 
  PenSquare, 
  Building2, 
  Check, 
  Bot
} from 'lucide-react';

export const HotelDetailPage: React.FC = () => {
  const { 
    hotels, 
    selectedHotelSlug, 
    reviews, 
    socialPosts, 
    savedHotelIds, 
    toggleSaveHotel, 
    comparisonHotelIds, 
    toggleCompareHotel,
    openWriteReviewModal,
    openClaimModal,
    showToast,
    navigateTo 
  } = useApp();

  const [activeSection, setActiveSection] = useState<'overview' | 'reviews' | 'photos' | 'community' | 'location'>('overview');
  const [reviewFilter, setReviewFilter] = useState<'all' | 'verified' | 'photos' | '5star'>('all');

  const hotel = hotels.find((h) => h.slug === selectedHotelSlug) || hotels[0];
  const hotelReviews = reviews.filter((r) => r.hotelId === hotel.id);
  const hotelSocialPosts = socialPosts.filter((sp) => sp.hotelId === hotel.id);

  const isSaved = savedHotelIds.includes(hotel.id);
  const isCompared = comparisonHotelIds.includes(hotel.id);

  // Collect all guest photos from reviews
  const allGuestPhotos = hotelReviews.flatMap((r) => r.guestPhotos || []);

  const handleShare = () => {
    if (navigator.clipboard) {
      const publicUrl = `${window.location.origin}${window.location.pathname}?hotel=${hotel.slug}`;
      navigator.clipboard.writeText(publicUrl);
      showToast('Public hotel link copied to clipboard!', 'info');
    }
  };

  const filteredReviews = hotelReviews.filter((rev) => {
    if (reviewFilter === 'verified') return rev.isVerifiedStay;
    if (reviewFilter === 'photos') return rev.guestPhotos && rev.guestPhotos.length > 0;
    if (reviewFilter === '5star') return rev.ratings.overall === 5;
    return true;
  });

  const scrollToSection = (sectionKey: 'overview' | 'reviews' | 'photos' | 'community' | 'location') => {
    setActiveSection(sectionKey);
    const targetElement = document.getElementById(`${sectionKey}-section`);
    if (targetElement) {
      const navOffset = 130;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // ScrollSpy to update active tab based on scroll position
  React.useEffect(() => {
    const handleScroll = () => {
      const sections: Array<{ id: 'overview' | 'reviews' | 'photos' | 'community' | 'location'; el: HTMLElement | null }> = [
        { id: 'overview', el: document.getElementById('overview-section') },
        { id: 'reviews', el: document.getElementById('reviews-section') },
        { id: 'photos', el: document.getElementById('photos-section') },
        { id: 'community', el: document.getElementById('community-section') },
        { id: 'location', el: document.getElementById('location-section') },
      ];

      const scrollPosition = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const item = sections[i];
        if (item.el && item.el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
        <button onClick={() => navigateTo('home')} className="hover:text-neutral-900">
          Home
        </button>
        <span>/</span>
        <button onClick={() => navigateTo('explore')} className="hover:text-neutral-900">
          {hotel.location.state}
        </button>
        <span>/</span>
        <button onClick={() => navigateTo('explore')} className="hover:text-neutral-900">
          {hotel.location.city}
        </button>
        <span>/</span>
        <span className="text-neutral-950 font-bold truncate">{hotel.name}</span>
      </div>

      {/* 1. HERO SECTION */}
      <section className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge type="verified_stay" />
              <span className="text-xs font-mono font-bold bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded border border-neutral-200">
                {hotel.priceTier} · {hotel.primaryCategory}
              </span>
              {hotel.isClaimed && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-600">
                  <Building2 className="w-3 h-3 text-neutral-900" />
                  Verified Hotel Ownership
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950">
              {hotel.name}
            </h1>

            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-600 font-medium">
              <MapPin className="w-4 h-4 text-neutral-500 shrink-0" />
              <span>{hotel.location.address}</span>
            </div>

            <p className="font-serif italic text-base sm:text-lg text-neutral-700 pt-1">
              “{hotel.tagline}”
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => toggleCompareHotel(hotel.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-colors ${
                isCompared
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white text-neutral-800 hover:bg-neutral-100 border-neutral-300'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{isCompared ? 'Compared' : 'Compare'}</span>
            </button>

            <button
              onClick={() => toggleSaveHotel(hotel.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-colors ${
                isSaved
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white text-neutral-800 hover:bg-neutral-100 border-neutral-300'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-lg bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors"
              title="Share hotel link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => openWriteReviewModal(hotel)}
              className="flex items-center gap-2 px-5 py-2.5 bg-neutral-950 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-subtle hover:shadow-elevated active:scale-95"
            >
              <PenSquare className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Large Editorial Image Banner (Grayscale -> Color on hover) */}
        <div className="group relative h-96 sm:h-[480px] rounded-2xl overflow-hidden bg-neutral-950 border border-editorial-border shadow-elevated">
          <img
            src={hotel.heroImage}
            alt={hotel.name}
            className="w-full h-full object-cover mono-to-color-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Rating Callout Overlay */}
          <div className="absolute bottom-6 left-6 z-10 flex items-center gap-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-neutral-200 shadow-modal text-neutral-950">
            <div className="bg-neutral-950 text-white font-mono text-2xl sm:text-3xl font-bold px-3 py-1.5 rounded-lg">
              {hotel.ratings.overall.toFixed(1)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <StarRating rating={hotel.ratings.overall} size="md" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {hotel.ratings.overall >= 4.8 ? 'World Class' : 'Exceptional'}
                </span>
              </div>
              <span className="text-xs text-neutral-500 font-mono block mt-0.5">
                {hotel.reviewCount.toLocaleString()} Verified Guest Reviews
              </span>
            </div>
          </div>

          {/* Price Range Badge */}
          <div className="absolute bottom-6 right-6 z-10 bg-neutral-950/90 text-white backdrop-blur-md px-4 py-2 rounded-xl border border-neutral-700 text-xs font-mono">
            Direct pricing: <span className="font-bold text-white">{hotel.priceRangeText}</span>
          </div>
        </div>
      </section>

      {/* 2. SECTION NAV PILLS */}
      <div className="sticky top-16 md:top-20 z-30 bg-white/90 backdrop-blur-md border-y border-neutral-200 py-3 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto gap-2">
        <div className="flex items-center gap-1 sm:gap-2">
          {[
            { id: 'overview', label: 'Overview & Reality Check' },
            { id: 'reviews', label: `Reviews (${hotelReviews.length})` },
            { id: 'photos', label: `Photos (${hotel.officialPhotos.length + allGuestPhotos.length})` },
            { id: 'community', label: `Community Reels (${hotelSocialPosts.length})` },
            { id: 'location', label: 'Location & Map' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                activeSection === tab.id
                  ? 'bg-neutral-950 text-white shadow-subtle'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Claim Property Trigger */}
        {!hotel.isClaimed && (
          <button
            onClick={() => openClaimModal(hotel)}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-neutral-950 whitespace-nowrap"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Claim Property</span>
          </button>
        )}
      </div>

      {/* 3. QUICK FACTS & OVERVIEW */}
      <div id="overview-section" className="grid grid-cols-1 lg:grid-cols-3 gap-8 scroll-mt-32">
        {/* Main 2 Cols: Description & Reality Check */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl border border-editorial-border p-6 md:p-8 space-y-4 shadow-subtle">
            <h3 className="font-serif text-2xl font-bold text-neutral-950">
              The Property Overview
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
              {hotel.description}
            </p>

            {/* Editorial Verdict Box */}
            <div className="p-4 bg-neutral-50 rounded-lg border-l-4 border-neutral-950 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                Editorial Reviewer Verdict
              </span>
              <p className="font-serif italic text-neutral-900 text-sm">
                “{hotel.editorialVerdict}”
              </p>
            </div>
          </div>

          {/* SIGNATURE REALITY CHECK */}
          <RealityCheckCard
            realityCheck={hotel.realityCheck}
            guestsLove={hotel.guestsLove}
            guestsMention={hotel.guestsMention}
          />

          {/* FUTURE-READY AI REVIEW SYNTHESIS */}
          <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-neutral-900" />
                <h3 className="font-serif text-lg font-bold text-neutral-950">
                  What Guests Are Saying (Review Synthesis)
                </h3>
              </div>
              <span className="text-[10px] font-mono uppercase bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded font-bold">
                Synthesized from {hotel.reviewCount} reviews
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
              “{hotel.aiSummary.summary}”
            </p>

            {/* Sentiment breakdown bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-600">
                <span className="text-emerald-700 font-bold">{hotel.aiSummary.positiveSentiment}% Positive</span>
                <span className="text-neutral-500">{hotel.aiSummary.neutralSentiment}% Neutral</span>
                <span className="text-rose-700 font-bold">{hotel.aiSummary.negativeSentiment}% Critical</span>
              </div>
              <div className="h-2 w-full flex rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full" style={{ width: `${hotel.aiSummary.positiveSentiment}%` }} />
                <div className="bg-neutral-300 h-full" style={{ width: `${hotel.aiSummary.neutralSentiment}%` }} />
                <div className="bg-rose-500 h-full" style={{ width: `${hotel.aiSummary.negativeSentiment}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar 1 Col: Quick Facts & Amenities */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-editorial-border p-6 shadow-subtle space-y-5">
            <h3 className="font-serif text-lg font-bold text-neutral-950 pb-3 border-b border-neutral-100">
              Quick Facts
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-neutral-50">
                <span className="text-neutral-500">Destination</span>
                <span className="font-bold text-neutral-900">{hotel.location.city}, {hotel.location.state}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-50">
                <span className="text-neutral-500">Price Tier</span>
                <span className="font-mono font-bold text-neutral-900">{hotel.priceTier} ({hotel.priceRangeText.split('–')[0]})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-50">
                <span className="text-neutral-500">Property Style</span>
                <span className="font-bold text-neutral-900">{hotel.primaryCategory}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-50">
                <span className="text-neutral-500">Authenticity Score</span>
                <span className="font-mono font-bold text-emerald-700">100% Verified Stays</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block mb-2">
                Best Suited For
              </span>
              <div className="flex flex-wrap gap-1.5">
                {hotel.bestSuitedFor.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-neutral-100 text-neutral-800 rounded text-xs font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block mb-2">
                Featured Amenities
              </span>
              <ul className="space-y-2 text-xs text-neutral-700">
                {hotel.amenities.map((amenity, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 4. RATING BREAKDOWN */}
      <section className="space-y-4">
        <h3 className="font-serif text-2xl font-bold text-neutral-950">
          Rating Breakdown
        </h3>
        <RatingBreakdown ratings={hotel.ratings} reviewCount={hotel.reviewCount} />
      </section>

      {/* 5. PHOTOS & COMMUNITY GALLERY */}
      <section id="photos-section" className="space-y-6 pt-6 border-t border-neutral-200 scroll-mt-32">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl font-bold text-neutral-950">
              Photographs & Visual Records
            </h3>
            <p className="text-xs text-neutral-500">
              Clearly separated official property imagery versus authentic guest uploads
            </p>
          </div>
        </div>

        <HotelGallery
          officialPhotos={hotel.officialPhotos}
          guestPhotos={allGuestPhotos}
          hotelName={hotel.name}
        />
      </section>

      {/* 6. FROM THE COMMUNITY (DUAL PUBLICITY SOCIAL CONTENT) */}
      <section id="community-section" className="pt-6 border-t border-neutral-200 scroll-mt-32">
        <SocialMediaCards
          posts={hotelSocialPosts}
          title={`From the Community: ${hotel.name}`}
          subtitle="Watch public reels, shorts and vlogs posted by real guests who stayed here"
          hotelName={hotel.name}
        />
      </section>

      {/* 7. REVIEWS STREAM */}
      <section id="reviews-section" className="space-y-6 pt-6 border-t border-neutral-200 scroll-mt-32">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-neutral-950">
              Verified Community Reviews ({hotelReviews.length})
            </h3>
            <p className="text-xs text-neutral-500">
              Unfiltered personal accounts from guests who checked in at {hotel.name}
            </p>
          </div>

          {/* Sub-filters for reviews */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setReviewFilter('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                reviewFilter === 'all'
                  ? 'bg-neutral-950 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              All ({hotelReviews.length})
            </button>
            <button
              onClick={() => setReviewFilter('verified')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                reviewFilter === 'verified'
                  ? 'bg-neutral-950 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              ✓ Verified Only
            </button>
            <button
              onClick={() => setReviewFilter('photos')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                reviewFilter === 'photos'
                  ? 'bg-neutral-950 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              With Photos
            </button>
            <button
              onClick={() => setReviewFilter('5star')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                reviewFilter === '5star'
                  ? 'bg-neutral-950 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              5 ★ Stays
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.length === 0 ? (
            <div className="p-8 bg-neutral-50 rounded-xl text-center text-xs text-neutral-500">
              No reviews match this specific filter.
            </div>
          ) : (
            filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </div>
      </section>

      {/* 8. LOCATION & GEOGRAPHIC MAP */}
      <section id="location-section" className="space-y-4 pt-6 border-t border-neutral-200 scroll-mt-32">
        <h3 className="font-serif text-2xl font-bold text-neutral-950">
          Location & Surroundings
        </h3>
        <p className="text-xs text-neutral-600 font-medium">
          {hotel.location.address}
        </p>

        <InteractiveMap hotels={[hotel]} height="380px" />
      </section>
    </div>
  );
};
