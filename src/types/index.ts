export type PriceTier = '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';

export type HotelCategory = 
  | 'Luxury'
  | 'Heritage'
  | 'Boutique'
  | 'Beach Resort'
  | 'Resort'
  | 'Mountain Retreat'
  | 'Homestay'
  | 'Wellness & Spa'
  | 'Business'
  | 'Budget'
  | 'Family-Friendly'
  | 'Couple-Friendly'
  | 'Pet-Friendly';

export type TripType = 'Solo' | 'Couple' | 'Family' | 'Friends' | 'Business';

export interface LocationInfo {
  city: string;
  state: string;
  region: 'North' | 'South' | 'West' | 'East' | 'Central' | 'North-East';
  address: string;
  lat: number;
  lng: number;
  nearbyLandmarks?: string[];
}

export interface RealityCheckItem {
  type: 'positive' | 'notable' | 'drawback';
  text: string;
}

export interface HotelRatings {
  overall: number;
  rooms: number;
  cleanliness: number;
  service: number;
  location: number;
  food: number;
  value: number;
  amenities: number;
}

export interface Hotel {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: LocationInfo;
  ratings: HotelRatings;
  reviewCount: number;
  priceTier: PriceTier;
  priceRangeText: string;
  primaryCategory: HotelCategory;
  categories: HotelCategory[];
  heroImage: string;
  officialPhotos: string[];
  amenities: string[];
  bestSuitedFor: string[];
  realityCheck: {
    positives: string[];
    notable: string[];
    drawbacks: string[];
  };
  guestsLove: string[];
  guestsMention: string[];
  description: string;
  editorialVerdict: string;
  isClaimed: boolean;
  isVerified: boolean;
  trendingScore: number;
  aiSummary: {
    summary: string;
    positiveSentiment: number;
    neutralSentiment: number;
    negativeSentiment: number;
  };
}

export interface SocialPost {
  id: string;
  hotelId: string;
  reviewId?: string;
  platform: 'instagram' | 'youtube' | 'facebook';
  contentType: 'reel' | 'post' | 'video' | 'short';
  url: string;
  creatorUsername: string;
  creatorName: string;
  creatorAvatar?: string;
  caption: string;
  thumbnailUrl: string;
  viewsCount?: string;
  submissionDate: string;
  moderationStatus: 'approved' | 'pending' | 'flagged';
}

export interface HotelResponse {
  id: string;
  hotelId: string;
  responderName: string;
  responderRole: string;
  responseDate: string;
  content: string;
}

export interface Review {
  id: string;
  hotelId: string;
  hotelName: string;
  userId: string;
  userName: string;
  userHandle: string;
  userAvatar: string;
  userLocation?: string;
  isVerifiedStay: boolean;
  verificationType: 'verified_stay' | 'community_review';
  checkInDate: string;
  roomType: string;
  nights: number;
  tripType: TripType;
  ratings: HotelRatings;
  title: string;
  content: string;
  pros?: string;
  cons?: string;
  tipsForGuests?: string;
  wouldStayAgain: boolean;
  guestPhotos: string[];
  socialPosts?: SocialPost[];
  helpfulVotes: number;
  userVotedHelpful?: boolean;
  userVotedNotHelpful?: boolean;
  createdAt: string;
  hotelResponse?: HotelResponse;
  isReported?: boolean;
}

export interface UserBadge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface UserCollection {
  id: string;
  name: string;
  description?: string;
  hotelIds: string[];
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  handle: string;
  bio: string;
  avatar: string;
  location: string;
  reviewsCount: number;
  photosCount: number;
  socialPostsCount: number;
  helpfulVotesReceived: number;
  badges: UserBadge[];
  savedHotelIds: string[];
  collections: UserCollection[];
  connectedSocials: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishDate: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  featuredHotelIds: string[];
  body: Array<{
    type: 'paragraph' | 'subheading' | 'hotel_embed' | 'quote' | 'image';
    text?: string;
    hotelId?: string;
    caption?: string;
    imageUrl?: string;
  }>;
}

export interface ReportItem {
  id: string;
  type: 'review' | 'social_post' | 'hotel';
  targetId: string;
  targetTitle: string;
  hotelName?: string;
  reportedBy: string;
  reason: 'fake_review' | 'spam' | 'offensive' | 'misleading' | 'wrong_hotel' | 'inappropriate_social' | 'other';
  details: string;
  timestamp: string;
  status: 'pending' | 'resolved' | 'dismissed';
}

export interface HotelClaimRequest {
  id: string;
  hotelId: string;
  hotelName: string;
  claimantName: string;
  claimantEmail: string;
  claimantRole: string;
  claimantPhone: string;
  notes: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}

export interface FilterState {
  searchQuery: string;
  selectedCity: string;
  selectedState: string;
  selectedCategory: string;
  minRating: number;
  priceTiers: PriceTier[];
  tripType: string;
  verifiedOnly: boolean;
  withSocialOnly: boolean;
  sortBy: 'highest_rated' | 'most_reviewed' | 'recently_reviewed' | 'best_value' | 'trending';
}
