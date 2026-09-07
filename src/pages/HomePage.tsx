import React from 'react';
import { useApp } from '../context/AppContext';
import { SearchBar } from '../components/search/SearchBar';
import { HotelCard } from '../components/hotel/HotelCard';
import { SocialMediaCards } from '../components/hotel/SocialMediaCards';
import { ReviewCard } from '../components/review/ReviewCard';
import { DESTINATIONS } from '../data/destinationsData';
import { JOURNAL_ARTICLES } from '../data/journalArticlesData';
import { 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  ChevronRight, 
  Flame, 
  Star, 
  Award, 
  PenSquare, 
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    hotels, 
    reviews, 
    socialPosts, 
    navigateTo, 
    setFilters, 
    openWriteReviewModal 
  } = useApp();

  const trendingHotels = [...hotels].sort((a, b) => b.trendingScore - a.trendingScore).slice(0, 4);
  const bestRatedHotels = [...hotels].sort((a, b) => b.ratings.overall - a.ratings.overall).slice(0, 4);
  const latestReviews = reviews.slice(0, 3);
  const featuredArticles = JOURNAL_ARTICLES.slice(0, 3);

  const categories = [
    { name: 'Heritage Palaces', tag: 'Heritage', count: '180+' },
    { name: 'Beach Resorts', tag: 'Beach Resort', count: '240+' },
    { name: 'Luxury Sanctuaries', tag: 'Luxury', count: '310+' },
    { name: 'Boutique Havelis', tag: 'Boutique', count: '145+' },
    { name: 'Mountain Chalets', tag: 'Mountain Retreat', count: '190+' },
    { name: 'Plantation Homestays', tag: 'Homestay', count: '120+' },
    { name: 'Ayurvedic Wellness', tag: 'Wellness & Spa', count: '95+' },
    { name: 'Budget Friendly', tag: 'Budget', count: '450+' },
  ];

  const handleDestinationClick = (destName: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedCity: destName,
      selectedState: '',
      searchQuery: destName,
    }));
    navigateTo('explore');
  };

  const handleCategoryClick = (categoryName: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedCategory: categoryName,
      searchQuery: '',
    }));
    navigateTo('explore');
  };

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-editorial-border overflow-hidden">
        <div className="absolute inset-0 bg-grid-subtle opacity-60 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 text-white text-xs font-semibold tracking-widest uppercase shadow-subtle">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Real Stays · Real Reviews · Real India</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-950 leading-[1.08]">
            INDIA, CHECKED IN.
          </h1>

          <p className="font-sans text-base sm:text-xl text-neutral-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Discover hotels through the authentic experiences of travellers who actually stayed there. Zero fake reviews. Zero hotel booking clutter.
          </p>

          <div className="pt-4">
            <SearchBar size="large" />
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-mono text-neutral-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neutral-900" />
              <span>100% Community Verified Stays</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neutral-900" />
              <span>Creator Video & Reel Integrations</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-neutral-900" />
              <span>8-Point Unfiltered Rating Breakdown</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPLORE INDIA (DESTINATIONS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500">
              <MapPin className="w-3.5 h-3.5 text-neutral-900" />
              <span>Geographic Discovery</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-950 mt-1">
              Explore India
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600">
              Curated stays across majestic states, tranquil coasts, and Himalayan valleys
            </p>
          </div>

          <button
            onClick={() => navigateTo('explore')}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-neutral-950 hover:text-neutral-600 transition-colors self-start sm:self-auto"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DESTINATIONS.slice(0, 4).map((dest) => (
            <div
              key={dest.id}
              onClick={() => handleDestinationClick(dest.name)}
              className="group relative h-80 rounded-xl overflow-hidden cursor-pointer border border-editorial-border hover:border-neutral-950 transition-all duration-300 shadow-subtle hover:shadow-elevated flex flex-col justify-end p-6 bg-neutral-950"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover mono-to-color-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

              <div className="relative z-20 space-y-1.5 text-white">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-300">
                  {dest.state} · {dest.hotelCount} Stays
                </span>
                <h3 className="font-serif text-2xl font-bold tracking-tight">
                  {dest.name}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                  {dest.tagline}
                </p>
                <div className="pt-2 flex items-center gap-1 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
                  <span>Explore stays</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRENDING IN INDIA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500">
              <Flame className="w-4 h-4 text-amber-600 fill-amber-600" />
              <span>Community Momentum</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-950 mt-1">
              Trending in India
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600">
              Properties experiencing significant review activity, creator shares, and guest saves
            </p>
          </div>

          <button
            onClick={() => {
              setFilters((prev) => ({ ...prev, sortBy: 'trending' }));
              navigateTo('explore');
            }}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-neutral-950 hover:text-neutral-600 transition-colors self-start sm:self-auto"
          >
            <span>Explore Trending List</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} variant="grid" />
          ))}
        </div>
      </section>

      {/* 4. STAY STYLES & CATEGORIES */}
      <section className="bg-neutral-100/70 border-y border-neutral-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              Browse by Stay Architecture
            </span>
            <h2 className="font-serif text-3xl font-bold text-neutral-950">
              Indian Stay Categories
            </h2>
            <p className="text-xs text-neutral-600">
              Find stays crafted specifically for your journey style and aesthetic preference
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat.tag)}
                className="group p-5 bg-white rounded-xl border border-neutral-200 hover:border-neutral-950 transition-all duration-300 text-left shadow-subtle hover:shadow-elevated flex flex-col justify-between h-32"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-neutral-400 block mb-1">
                    {cat.count} Properties
                  </span>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-neutral-900 group-hover:text-neutral-600 transition-colors">
                    {cat.name}
                  </h4>
                </div>

                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-900 pt-2 border-t border-neutral-100">
                  <span>Browse</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FROM THE COMMUNITY (DUAL PUBLICITY SOCIAL CONTENT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SocialMediaCards
          posts={socialPosts.slice(0, 4)}
          title="From Our Community"
          subtitle="Real stays in action: Watch video reels, vlogs & shorts shared by travellers across India"
        />
      </section>

      {/* 6. BEST-RATED HOTELS IN INDIA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500">
              <Award className="w-4 h-4 text-neutral-900" />
              <span>Verified Excellence</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-950 mt-1">
              Top Rated Stays in India
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600">
              Benchmark properties scored 4.8★ and above by verified community reviews
            </p>
          </div>

          <button
            onClick={() => navigateTo('rankings')}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-neutral-950 hover:text-neutral-600 transition-colors self-start sm:self-auto"
          >
            <span>View All Rankings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestRatedHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} variant="grid" />
          ))}
        </div>
      </section>

      {/* 7. LATEST AUTHENTIC REVIEWS STREAM */}
      <section className="bg-neutral-50 border-y border-neutral-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Unfiltered Feed</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-neutral-950 mt-1">
                Latest Community Reviews
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600">
                Real accounts from travellers checked in across India this month
              </p>
            </div>

            <button
              onClick={() => openWriteReviewModal()}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-950 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-subtle self-start sm:self-auto"
            >
              <PenSquare className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {latestReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. INDIA HOTEL JOURNAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500">
              <BookOpen className="w-4 h-4 text-neutral-900" />
              <span>Editorial Stories</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-950 mt-1">
              India Hotel Journal
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600">
              Thoughtful travel writing, architectural deep-dives, and regional stay guides
            </p>
          </div>

          <button
            onClick={() => navigateTo('journal')}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-neutral-950 hover:text-neutral-600 transition-colors self-start sm:self-auto"
          >
            <span>Read The Journal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => navigateTo('journal-article', article.slug)}
              className="group bg-white rounded-xl border border-editorial-border overflow-hidden hover:border-neutral-950 transition-all duration-300 shadow-subtle hover:shadow-elevated cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-950">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover mono-to-color-zoom"
                  />
                </div>
                <div className="p-5 sm:p-6 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500">
                    <span>{article.publishDate}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-neutral-950 group-hover:text-neutral-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-900">
                <span>Read Story</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. CALL TO ACTION: SHARE YOUR STAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-neutral-950 text-white p-8 sm:p-14 overflow-hidden border border-neutral-800 text-center space-y-6">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Community Contribution
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Stayed Somewhere Memorable?
            </h2>
            <p className="text-xs sm:text-base text-neutral-300 font-light leading-relaxed">
              Help fellow travellers make confident decisions. Share your unfiltered experience, upload real photographs, and link your social reels.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => openWriteReviewModal()}
                className="px-6 py-3 bg-white text-neutral-950 font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-neutral-200 transition-all shadow-subtle hover:scale-105 active:scale-95"
              >
                Write a Stay Review
              </button>
              <button
                onClick={() => navigateTo('explore')}
                className="px-6 py-3 border border-neutral-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-neutral-900 transition-colors"
              >
                Explore Indian Stays
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
