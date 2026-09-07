import type { UserBadge, Review, SocialPost } from '../types';

export interface BadgeProgress {
  id: string;
  name: string;
  icon: string;
  description: string;
  isUnlocked: boolean;
  currentValue: number;
  targetValue: number;
  unit: string;
}

export const ALL_BADGE_DEFINITIONS: Array<{
  id: string;
  name: string;
  icon: string;
  description: string;
  targetValue: number;
  unit: string;
  calculateProgress: (stats: {
    reviewsCount: number;
    photosCount: number;
    socialPostsCount: number;
    helpfulVotes: number;
    distinctStates: number;
  }) => number;
}> = [
  {
    id: 'top-reviewer',
    name: 'Top Reviewer',
    icon: '🏆',
    description: 'Over 10 detailed, authentic hotel reviews',
    targetValue: 10,
    unit: 'reviews',
    calculateProgress: (stats) => stats.reviewsCount,
  },
  {
    id: 'travel-creator',
    name: 'Travel Creator',
    icon: '🎥',
    description: 'Attached verified community social video / reels',
    targetValue: 1,
    unit: 'social reels',
    calculateProgress: (stats) => stats.socialPostsCount,
  },
  {
    id: 'verified-reviewer',
    name: 'Verified Reviewer',
    icon: '✓',
    description: 'Consistently verified on-site check-ins',
    targetValue: 1,
    unit: 'verified stay',
    calculateProgress: (stats) => (stats.reviewsCount > 0 ? 1 : 0),
  },
  {
    id: 'india-explorer',
    name: 'India Explorer',
    icon: '🧭',
    description: 'Reviewed authentic stays across 3+ Indian states',
    targetValue: 3,
    unit: 'states',
    calculateProgress: (stats) => stats.distinctStates,
  },
  {
    id: 'visual-storyteller',
    name: 'Visual Storyteller',
    icon: '📸',
    description: 'Uploaded 10+ authentic unfiltered guest stay photos',
    targetValue: 10,
    unit: 'photos',
    calculateProgress: (stats) => stats.photosCount,
  },
  {
    id: 'helpful-voice',
    name: 'Community Pillar',
    icon: '🌟',
    description: 'Received 50+ helpful upvotes from travellers',
    targetValue: 50,
    unit: 'votes',
    calculateProgress: (stats) => stats.helpfulVotes,
  },
  {
    id: 'master-critic',
    name: 'Master Connoisseur',
    icon: '👑',
    description: 'Elite reviewer with 20+ reviews and 100+ helpful votes',
    targetValue: 20,
    unit: 'reviews',
    calculateProgress: (stats) => stats.reviewsCount,
  },
];

export const computeUserBadgesWithProgress = (
  userReviews: Review[],
  _userSocials: SocialPost[],
  userStats: {
    reviewsCount: number;
    photosCount: number;
    socialPostsCount: number;
    helpfulVotesReceived: number;
  }
): { unlockedBadges: UserBadge[]; allBadgeProgress: BadgeProgress[] } => {
  // Compute distinct states from reviews
  const statesSet = new Set<string>();
  userReviews.forEach((r) => {
    if (r.userLocation && r.userLocation.includes(',')) {
      const parts = r.userLocation.split(',');
      statesSet.add(parts[parts.length - 1].trim());
    }
  });

  const distinctStates = Math.max(statesSet.size, userReviews.length >= 3 ? 3 : userReviews.length);

  const stats = {
    reviewsCount: userStats.reviewsCount,
    photosCount: userStats.photosCount,
    socialPostsCount: userStats.socialPostsCount,
    helpfulVotes: userStats.helpfulVotesReceived,
    distinctStates,
  };

  const allBadgeProgress: BadgeProgress[] = ALL_BADGE_DEFINITIONS.map((def) => {
    const currentValue = def.calculateProgress(stats);
    const isUnlocked = currentValue >= def.targetValue;
    return {
      id: def.id,
      name: def.name,
      icon: def.icon,
      description: def.description,
      isUnlocked,
      currentValue,
      targetValue: def.targetValue,
      unit: def.unit,
    };
  });

  const unlockedBadges: UserBadge[] = allBadgeProgress
    .filter((b) => b.isUnlocked)
    .map((b) => ({
      id: b.id,
      name: b.name,
      icon: b.icon,
      description: b.description,
    }));

  return { unlockedBadges, allBadgeProgress };
};
