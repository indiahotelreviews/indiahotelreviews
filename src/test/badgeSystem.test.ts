import { describe, it, expect } from 'vitest';
import { computeUserBadgesWithProgress, ALL_BADGE_DEFINITIONS } from '../utils/badgeSystem';

describe('Badge System', () => {
  it('should have all 7 core badge definitions', () => {
    expect(ALL_BADGE_DEFINITIONS.length).toBe(7);
    const badgeIds = ALL_BADGE_DEFINITIONS.map(b => b.id);
    expect(badgeIds).toContain('top-reviewer');
    expect(badgeIds).toContain('travel-creator');
    expect(badgeIds).toContain('verified-reviewer');
    expect(badgeIds).toContain('india-explorer');
    expect(badgeIds).toContain('visual-storyteller');
    expect(badgeIds).toContain('helpful-voice');
    expect(badgeIds).toContain('master-critic');
  });

  it('should correctly unlock badges when thresholds are met', () => {
    const stats = {
      reviewsCount: 15,
      photosCount: 20,
      socialPostsCount: 2,
      helpfulVotesReceived: 60,
    };

    const dummyReviews: any[] = [
      { id: '1', userLocation: 'Bengaluru, Karnataka' },
      { id: '2', userLocation: 'Udaipur, Rajasthan' },
      { id: '3', userLocation: 'Panaji, Goa' },
    ];

    const { unlockedBadges, allBadgeProgress } = computeUserBadgesWithProgress(
      dummyReviews,
      [],
      stats
    );

    const unlockedIds = unlockedBadges.map(b => b.id);
    expect(unlockedIds).toContain('top-reviewer');
    expect(unlockedIds).toContain('travel-creator');
    expect(unlockedIds).toContain('verified-reviewer');
    expect(unlockedIds).toContain('india-explorer');
    expect(unlockedIds).toContain('visual-storyteller');
    expect(unlockedIds).toContain('helpful-voice');

    // Master critic requires 20 reviews, so it should be locked
    const masterCritic = allBadgeProgress.find(b => b.id === 'master-critic');
    expect(masterCritic?.isUnlocked).toBe(false);
    expect(masterCritic?.currentValue).toBe(15);
    expect(masterCritic?.targetValue).toBe(20);
  });

  it('should lock badges for new users with 0 reviews and calculate progress', () => {
    const stats = {
      reviewsCount: 0,
      photosCount: 0,
      socialPostsCount: 0,
      helpfulVotesReceived: 0,
    };

    const { unlockedBadges, allBadgeProgress } = computeUserBadgesWithProgress([], [], stats);
    expect(unlockedBadges.length).toBe(0);

    const topReviewer = allBadgeProgress.find(b => b.id === 'top-reviewer');
    expect(topReviewer?.isUnlocked).toBe(false);
    expect(topReviewer?.currentValue).toBe(0);
    expect(topReviewer?.targetValue).toBe(10);
  });
});
