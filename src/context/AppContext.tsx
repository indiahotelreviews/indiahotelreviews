import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  Hotel, 
  Review, 
  SocialPost, 
  UserProfile, 
  ReportItem, 
  HotelClaimRequest,
  FilterState,
  HotelCategory,
  TripType
} from '../types';
import { INITIAL_HOTELS } from '../data/hotelsData';
import { INITIAL_REVIEWS } from '../data/reviewsData';
import { INITIAL_SOCIAL_POSTS } from '../data/socialPostsData';

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

const DEFAULT_USER: UserProfile = {
  id: 'usr-curr',
  name: 'Arjun Menon',
  username: 'travelwitharjun',
  handle: '@travelwitharjun',
  bio: 'Architect & slow traveler documenting boutique heritage and coastal stays across India. Believer in real, unfiltered reviews.',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
  location: 'Bengaluru, India',
  reviewsCount: 14,
  photosCount: 42,
  socialPostsCount: 8,
  helpfulVotesReceived: 318,
  badges: [
    { id: 'top-reviewer', name: 'Top Reviewer', icon: '🏆', description: 'Over 10 highly rated detailed reviews' },
    { id: 'travel-creator', name: 'Travel Creator', icon: '🎥', description: 'Attached authentic verified video content' },
    { id: 'verified-reviewer', name: 'Verified Reviewer', icon: '✓', description: 'Consistently verified on-site check-ins' },
    { id: 'india-explorer', name: 'India Explorer', icon: '🧭', description: 'Reviewed stays across 4+ Indian states' },
  ],
  savedHotelIds: ['taj-lake-palace-udaipur', 'ananda-in-the-himalayas', 'the-machan-lonavala'],
  collections: [
    {
      id: 'col-1',
      name: 'Goa & Coastal Escapes 2026',
      description: 'Handpicked stays for winter workations and slow weekends',
      hotelIds: ['w-goa-vagator', 'marari-beach-resort-kerala'],
      createdAt: '2026-01-10',
    },
    {
      id: 'col-2',
      name: 'Royal Palaces to Experience',
      description: 'Living palaces with genuine architectural heritage',
      hotelIds: ['taj-lake-palace-udaipur', 'taj-falaknuma-palace-hyderabad', 'samode-haveli-jaipur'],
      createdAt: '2026-02-01',
    },
  ],
  connectedSocials: {
    instagram: 'travelwitharjun',
    youtube: 'arjunmenonvlogs',
    twitter: 'arjunmenon_in',
  },
};

interface AppContextType {
  hotels: Hotel[];
  reviews: Review[];
  socialPosts: SocialPost[];
  currentUser: UserProfile;
  savedHotelIds: string[];
  comparisonHotelIds: string[];
  reports: ReportItem[];
  claims: HotelClaimRequest[];
  toasts: ToastNotification[];
  
  // Navigation
  currentView: string;
  selectedHotelSlug: string | null;
  selectedArticleSlug: string | null;
  navigateTo: (view: string, param?: string) => void;
  
  // Search & Filters
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  filteredHotels: Hotel[];

  // Actions
  toggleSaveHotel: (hotelId: string) => void;
  toggleCompareHotel: (hotelId: string) => void;
  clearComparison: () => void;
  addReview: (reviewData: Partial<Review> & { hotelId: string }) => void;
  voteHelpful: (reviewId: string) => void;
  voteNotHelpful: (reviewId: string) => void;
  addHotelResponse: (hotelId: string, reviewId: string, content: string, responderName: string, responderRole: string) => void;
  submitSocialPost: (post: Omit<SocialPost, 'id' | 'submissionDate' | 'moderationStatus'>) => void;
  submitReport: (report: Omit<ReportItem, 'id' | 'timestamp' | 'status'>) => void;
  submitClaim: (claim: Omit<HotelClaimRequest, 'id' | 'timestamp' | 'status'>) => void;
  resolveReport: (reportId: string, action: 'dismiss' | 'hide_review') => void;
  approveClaim: (claimId: string) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
  updateUserProfile: (updated: Partial<UserProfile>) => void;
  loginAsUser: (user: UserProfile) => void;
  logout: () => void;
  addCustomHotel: (newHotel: Hotel) => void;

  // Modals
  authModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  
  writeReviewModalOpen: boolean;
  targetHotelForReview: Hotel | null;
  openWriteReviewModal: (hotel?: Hotel) => void;
  closeWriteReviewModal: () => void;
  
  claimModalOpen: boolean;
  targetHotelForClaim: Hotel | null;
  openClaimModal: (hotel: Hotel) => void;
  closeClaimModal: () => void;
  
  reportModalOpen: boolean;
  targetReportItem: { type: 'review' | 'social_post' | 'hotel'; id: string; title: string; hotelName?: string } | null;
  openReportModal: (item: { type: 'review' | 'social_post' | 'hotel'; id: string; title: string; hotelName?: string }) => void;
  closeReportModal: () => void;

  comparisonModalOpen: boolean;
  setComparisonModalOpen: (open: boolean) => void;
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  selectedCity: '',
  selectedState: '',
  selectedCategory: '',
  minRating: 0,
  priceTiers: [],
  tripType: '',
  verifiedOnly: false,
  withSocialOnly: false,
  sortBy: 'highest_rated',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load persistent state
  const [hotels, setHotels] = useState<Hotel[]>(() => {
    const saved = localStorage.getItem('ihr_hotels');
    return saved ? JSON.parse(saved) : INITIAL_HOTELS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('ihr_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [socialPosts, setSocialPosts] = useState<SocialPost[]>(() => {
    const saved = localStorage.getItem('ihr_social_posts');
    return saved ? JSON.parse(saved) : INITIAL_SOCIAL_POSTS;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('ihr_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [savedHotelIds, setSavedHotelIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('ihr_saved_hotels');
    return saved ? JSON.parse(saved) : ['taj-lake-palace-udaipur', 'ananda-in-the-himalayas', 'the-machan-lonavala'];
  });

  const [comparisonHotelIds, setComparisonHotelIds] = useState<string[]>([]);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [claims, setClaims] = useState<HotelClaimRequest[]>([]);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Navigation State
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedHotelSlug, setSelectedHotelSlug] = useState<string | null>(null);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);

  // Filter State
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Modal States
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [writeReviewModalOpen, setWriteReviewModalOpen] = useState(false);
  const [targetHotelForReview, setTargetHotelForReview] = useState<Hotel | null>(null);

  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [targetHotelForClaim, setTargetHotelForClaim] = useState<Hotel | null>(null);

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [targetReportItem, setTargetReportItem] = useState<{
    type: 'review' | 'social_post' | 'hotel';
    id: string;
    title: string;
    hotelName?: string;
  } | null>(null);

  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);

  // Parse URL on initial load for deep public links
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const hotelParam = params.get('hotel');
      const articleParam = params.get('article');
      const viewParam = params.get('view');

      if (hotelParam) {
        setCurrentView('hotel-detail');
        setSelectedHotelSlug(hotelParam);
      } else if (articleParam) {
        setCurrentView('journal-article');
        setSelectedArticleSlug(articleParam);
      } else if (viewParam) {
        setCurrentView(viewParam);
      }
    } catch {
      // Ignore in non-browser environments
    }
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('ihr_hotels', JSON.stringify(hotels));
  }, [hotels]);

  useEffect(() => {
    localStorage.setItem('ihr_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('ihr_social_posts', JSON.stringify(socialPosts));
  }, [socialPosts]);

  useEffect(() => {
    localStorage.setItem('ihr_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ihr_saved_hotels', JSON.stringify(savedHotelIds));
  }, [savedHotelIds]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation Helper with browser URL query parameter sync
  const navigateTo = (view: string, param?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
    
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('hotel');
      url.searchParams.delete('article');
      url.searchParams.delete('view');

      if (view === 'hotel-detail' && param) {
        setSelectedHotelSlug(param);
        url.searchParams.set('hotel', param);
      } else if (view === 'journal-article' && param) {
        setSelectedArticleSlug(param);
        url.searchParams.set('article', param);
      } else if (view !== 'home') {
        url.searchParams.set('view', view);
      }

      window.history.pushState({}, '', url.toString());
    } catch {
      // ignore
    }
  };

  // User Profile & Authentication handlers
  const updateUserProfile = (updated: Partial<UserProfile>) => {
    setCurrentUser((prev) => {
      const newUser = { ...prev, ...updated };
      showToast('Profile updated successfully!', 'success');
      return newUser;
    });
  };

  const loginAsUser = (user: UserProfile) => {
    setCurrentUser(user);
    setAuthModalOpen(false);
    showToast(`Welcome back, ${user.name}!`, 'success');
  };

  const logout = () => {
    const guestUser: UserProfile = {
      id: `usr-guest-${Date.now()}`,
      name: 'Guest Explorer',
      username: 'guest',
      handle: '@guest',
      bio: 'Exploring India’s finest verified stays & community reviews.',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      location: 'India',
      reviewsCount: 0,
      photosCount: 0,
      socialPostsCount: 0,
      helpfulVotesReceived: 0,
      badges: [],
      savedHotelIds: [],
      collections: [],
      connectedSocials: {},
    };
    setCurrentUser(guestUser);
    showToast('Signed out of session', 'info');
  };

  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  // Add custom dynamic hotel
  const addCustomHotel = (newHotel: Hotel) => {
    setHotels((prev) => {
      const exists = prev.some((h) => h.id === newHotel.id || h.slug === newHotel.slug);
      if (exists) return prev;
      return [newHotel, ...prev];
    });
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // Save / Bookmark Hotel
  const toggleSaveHotel = (hotelId: string) => {
    setSavedHotelIds((prev) => {
      const exists = prev.includes(hotelId);
      const updated = exists ? prev.filter((id) => id !== hotelId) : [...prev, hotelId];
      showToast(exists ? 'Removed from saved hotels' : 'Saved to your collection', 'info');
      return updated;
    });
  };

  // Comparison
  const toggleCompareHotel = (hotelId: string) => {
    setComparisonHotelIds((prev) => {
      if (prev.includes(hotelId)) {
        return prev.filter((id) => id !== hotelId);
      }
      if (prev.length >= 4) {
        showToast('You can compare up to 4 hotels at once', 'warning');
        return prev;
      }
      showToast('Added to comparison', 'info');
      return [...prev, hotelId];
    });
  };

  const clearComparison = () => {
    setComparisonHotelIds([]);
  };

  // Add Review
  const addReview = (reviewData: Partial<Review> & { hotelId: string }) => {
    const hotel = hotels.find((h) => h.id === reviewData.hotelId);
    const newId = `rev-${Date.now()}`;
    const newReview: Review = {
      id: newId,
      hotelId: reviewData.hotelId,
      hotelName: hotel ? hotel.name : 'Indian Hotel Stay',
      userId: currentUser.id,
      userName: currentUser.name,
      userHandle: currentUser.handle.replace('@', ''),
      userAvatar: currentUser.avatar,
      userLocation: currentUser.location,
      isVerifiedStay: reviewData.isVerifiedStay ?? true,
      verificationType: reviewData.isVerifiedStay ? 'verified_stay' : 'community_review',
      checkInDate: reviewData.checkInDate || new Date().toISOString().split('T')[0],
      roomType: reviewData.roomType || 'Deluxe Room',
      nights: reviewData.nights || 2,
      tripType: (reviewData.tripType as TripType) || 'Couple',
      ratings: reviewData.ratings || {
        overall: 5,
        rooms: 5,
        cleanliness: 5,
        service: 5,
        location: 5,
        food: 5,
        value: 4,
        amenities: 5,
      },
      title: reviewData.title || 'Exceptional stay and hospitality',
      content: reviewData.content || '',
      pros: reviewData.pros,
      cons: reviewData.cons,
      tipsForGuests: reviewData.tipsForGuests,
      wouldStayAgain: reviewData.wouldStayAgain ?? true,
      guestPhotos: reviewData.guestPhotos || [],
      socialPosts: reviewData.socialPosts || [],
      helpfulVotes: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setReviews((prev) => [newReview, ...prev]);

    // Recalculate hotel review count, all subcategory ratings and sentiment breakdown
    if (hotel) {
      const currentCount = hotel.reviewCount;
      const updatedReviewCount = currentCount + 1;
      const incomingRatings = newReview.ratings;

      const calcWeighted = (currentAvg: number, newVal: number) => {
        return Number(((currentAvg * currentCount + newVal) / updatedReviewCount).toFixed(1));
      };

      const updatedRatings = {
        overall: calcWeighted(hotel.ratings.overall, incomingRatings.overall),
        rooms: calcWeighted(hotel.ratings.rooms, incomingRatings.rooms),
        cleanliness: calcWeighted(hotel.ratings.cleanliness, incomingRatings.cleanliness),
        service: calcWeighted(hotel.ratings.service, incomingRatings.service),
        location: calcWeighted(hotel.ratings.location, incomingRatings.location),
        food: calcWeighted(hotel.ratings.food, incomingRatings.food),
        value: calcWeighted(hotel.ratings.value, incomingRatings.value),
        amenities: calcWeighted(hotel.ratings.amenities, incomingRatings.amenities),
      };

      // Dynamically calculate sentiment breakdown percentages from all hotel reviews
      const allHotelReviews = [newReview, ...reviews.filter((r) => r.hotelId === hotel.id)];
      const totalRev = allHotelReviews.length;
      let posCount = 0;
      let neuCount = 0;
      let negCount = 0;

      allHotelReviews.forEach((r) => {
        if (r.ratings.overall >= 4) posCount++;
        else if (r.ratings.overall === 3) neuCount++;
        else negCount++;
      });

      const positiveSentiment = Math.round((posCount / totalRev) * 100);
      const neutralSentiment = Math.round((neuCount / totalRev) * 100);
      const negativeSentiment = Math.max(0, 100 - positiveSentiment - neutralSentiment);

      setHotels((prev) =>
        prev.map((h) =>
          h.id === hotel.id
            ? {
                ...h,
                reviewCount: updatedReviewCount,
                ratings: updatedRatings,
                aiSummary: {
                  ...h.aiSummary,
                  positiveSentiment,
                  neutralSentiment,
                  negativeSentiment,
                },
              }
            : h
        )
      );
    }

    // Update user stats
    setCurrentUser((prev) => ({
      ...prev,
      reviewsCount: prev.reviewsCount + 1,
      photosCount: prev.photosCount + (reviewData.guestPhotos?.length || 0),
      socialPostsCount: prev.socialPostsCount + (reviewData.socialPosts?.length || 0),
    }));

    showToast('Your genuine review has been published!', 'success');
  };

  // Helpful Voting
  const voteHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((rev) => {
        if (rev.id === reviewId) {
          if (rev.userVotedHelpful) {
            return {
              ...rev,
              helpfulVotes: Math.max(0, rev.helpfulVotes - 1),
              userVotedHelpful: false,
            };
          }
          return {
            ...rev,
            helpfulVotes: rev.helpfulVotes + 1,
            userVotedHelpful: true,
            userVotedNotHelpful: false,
          };
        }
        return rev;
      })
    );
  };

  const voteNotHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((rev) => {
        if (rev.id === reviewId) {
          if (rev.userVotedNotHelpful) {
            return { ...rev, userVotedNotHelpful: false };
          }
          return {
            ...rev,
            userVotedNotHelpful: true,
            userVotedHelpful: false,
            helpfulVotes: rev.userVotedHelpful ? Math.max(0, rev.helpfulVotes - 1) : rev.helpfulVotes,
          };
        }
        return rev;
      })
    );
  };

  // Hotel Owner Response
  const addHotelResponse = (
    hotelId: string,
    reviewId: string,
    content: string,
    responderName: string,
    responderRole: string
  ) => {
    setReviews((prev) =>
      prev.map((rev) => {
        if (rev.id === reviewId) {
          return {
            ...rev,
            hotelResponse: {
              id: `resp-${Date.now()}`,
              hotelId,
              responderName,
              responderRole,
              responseDate: new Date().toISOString().split('T')[0],
              content,
            },
          };
        }
        return rev;
      })
    );
    showToast('Hotel management response published', 'success');
  };

  // Social Post Submission
  const submitSocialPost = (post: Omit<SocialPost, 'id' | 'submissionDate' | 'moderationStatus'>) => {
    const newPost: SocialPost = {
      ...post,
      id: `sp-${Date.now()}`,
      submissionDate: new Date().toISOString().split('T')[0],
      moderationStatus: 'approved',
    };
    setSocialPosts((prev) => [newPost, ...prev]);
    showToast('Community social media link submitted!', 'success');
  };

  // Report Submission
  const submitReport = (report: Omit<ReportItem, 'id' | 'timestamp' | 'status'>) => {
    const newReport: ReportItem = {
      ...report,
      id: `rep-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'pending',
    };
    setReports((prev) => [newReport, ...prev]);
    showToast('Thank you. Content submitted to moderation team for review.', 'info');
  };

  // Claim Submission
  const submitClaim = (claim: Omit<HotelClaimRequest, 'id' | 'timestamp' | 'status'>) => {
    const newClaim: HotelClaimRequest = {
      ...claim,
      id: `clm-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'pending',
    };
    setClaims((prev) => [newClaim, ...prev]);
    showToast('Hotel claim request submitted. Verification in progress.', 'info');
  };

  // Moderation Handlers
  const resolveReport = (reportId: string, action: 'dismiss' | 'hide_review') => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: action === 'dismiss' ? 'dismissed' : 'resolved' } : r))
    );
    if (action === 'hide_review') {
      const rep = reports.find((r) => r.id === reportId);
      if (rep && rep.type === 'review') {
        setReviews((prev) => prev.map((rev) => (rev.id === rep.targetId ? { ...rev, isReported: true } : rev)));
      }
    }
    showToast('Moderation action saved', 'info');
  };

  const approveClaim = (claimId: string) => {
    setClaims((prev) =>
      prev.map((c) => {
        if (c.id === claimId) {
          // Mark hotel as claimed
          setHotels((hList) => hList.map((h) => (h.id === c.hotelId ? { ...h, isClaimed: true } : h)));
          return { ...c, status: 'approved' };
        }
        return c;
      })
    );
    showToast('Hotel ownership claim approved!', 'success');
  };

  // Modal Handlers
  const openWriteReviewModal = (hotel?: Hotel) => {
    setTargetHotelForReview(hotel || null);
    setWriteReviewModalOpen(true);
  };
  const closeWriteReviewModal = () => {
    setWriteReviewModalOpen(false);
    setTargetHotelForReview(null);
  };

  const openClaimModal = (hotel: Hotel) => {
    setTargetHotelForClaim(hotel);
    setClaimModalOpen(true);
  };
  const closeClaimModal = () => {
    setClaimModalOpen(false);
    setTargetHotelForClaim(null);
  };

  const openReportModal = (item: {
    type: 'review' | 'social_post' | 'hotel';
    id: string;
    title: string;
    hotelName?: string;
  }) => {
    setTargetReportItem(item);
    setReportModalOpen(true);
  };
  const closeReportModal = () => {
    setReportModalOpen(false);
    setTargetReportItem(null);
  };

  // Computed Filtered Hotels
  const filteredHotels = hotels.filter((hotel) => {
    // Search Query (name, city, state, tagline)
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const matchName = hotel.name.toLowerCase().includes(q);
      const matchCity = hotel.location.city.toLowerCase().includes(q);
      const matchState = hotel.location.state.toLowerCase().includes(q);
      const matchTagline = hotel.tagline.toLowerCase().includes(q);
      const matchCategory = hotel.categories.some((c) => c.toLowerCase().includes(q));
      if (!matchName && !matchCity && !matchState && !matchTagline && !matchCategory) {
        return false;
      }
    }

    // City / Destination filter
    if (filters.selectedCity) {
      const cityLower = filters.selectedCity.toLowerCase();
      if (
        !hotel.location.city.toLowerCase().includes(cityLower) &&
        !hotel.location.state.toLowerCase().includes(cityLower)
      ) {
        return false;
      }
    }

    // State filter
    if (filters.selectedState && hotel.location.state !== filters.selectedState) {
      return false;
    }

    // Category filter
    if (filters.selectedCategory && !hotel.categories.includes(filters.selectedCategory as HotelCategory)) {
      return false;
    }

    // Min Rating filter
    if (filters.minRating > 0 && hotel.ratings.overall < filters.minRating) {
      return false;
    }

    // Price Tiers
    if (filters.priceTiers.length > 0 && !filters.priceTiers.includes(hotel.priceTier)) {
      return false;
    }

    // Verified Only
    if (filters.verifiedOnly && !hotel.isVerified) {
      return false;
    }

    // With Social Media Content Only
    if (filters.withSocialOnly) {
      const hasSocial = socialPosts.some((p) => p.hotelId === hotel.id);
      if (!hasSocial) return false;
    }

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'highest_rated') return b.ratings.overall - a.ratings.overall;
    if (filters.sortBy === 'most_reviewed') return b.reviewCount - a.reviewCount;
    if (filters.sortBy === 'trending') return b.trendingScore - a.trendingScore;
    if (filters.sortBy === 'best_value') return b.ratings.value - a.ratings.value;
    return 0;
  });

  return (
    <AppContext.Provider
      value={{
        hotels,
        reviews,
        socialPosts,
        currentUser,
        savedHotelIds,
        comparisonHotelIds,
        reports,
        claims,
        toasts,
        currentView,
        selectedHotelSlug,
        selectedArticleSlug,
        navigateTo,
        filters,
        setFilters,
        resetFilters,
        filteredHotels,
        toggleSaveHotel,
        toggleCompareHotel,
        clearComparison,
        addReview,
        voteHelpful,
        voteNotHelpful,
        addHotelResponse,
        submitSocialPost,
        submitReport,
        submitClaim,
        resolveReport,
        approveClaim,
        showToast,
        dismissToast,
        updateUserProfile,
        loginAsUser,
        logout,
        addCustomHotel,
        authModalOpen,
        openAuthModal,
        closeAuthModal,
        writeReviewModalOpen,
        targetHotelForReview,
        openWriteReviewModal,
        closeWriteReviewModal,
        claimModalOpen,
        targetHotelForClaim,
        openClaimModal,
        closeClaimModal,
        reportModalOpen,
        targetReportItem,
        openReportModal,
        closeReportModal,
        comparisonModalOpen,
        setComparisonModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
