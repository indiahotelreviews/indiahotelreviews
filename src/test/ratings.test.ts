import { describe, it, expect } from 'vitest';

describe('Ratings and Sentiment Calculation', () => {
  it('should accurately calculate weighted average when a new review is submitted', () => {
    const currentCount = 10;
    const currentOverall = 4.8;
    const newRating = 5.0;

    const updatedReviewCount = currentCount + 1;
    const updatedOverall = Number(
      ((currentOverall * currentCount + newRating) / updatedReviewCount).toFixed(1)
    );

    expect(updatedOverall).toBe(4.8);
    expect(updatedReviewCount).toBe(11);
  });

  it('should correctly calculate sentiment distribution percentages', () => {
    const reviews = [
      { ratings: { overall: 5 } },
      { ratings: { overall: 5 } },
      { ratings: { overall: 4 } },
      { ratings: { overall: 3 } },
      { ratings: { overall: 2 } },
    ];

    let pos = 0;
    let neu = 0;
    let neg = 0;

    reviews.forEach(r => {
      if (r.ratings.overall >= 4) pos++;
      else if (r.ratings.overall === 3) neu++;
      else neg++;
    });

    const total = reviews.length;
    const positiveSentiment = Math.round((pos / total) * 100);
    const neutralSentiment = Math.round((neu / total) * 100);
    const negativeSentiment = Math.max(0, 100 - positiveSentiment - neutralSentiment);

    expect(positiveSentiment).toBe(60);
    expect(neutralSentiment).toBe(20);
    expect(negativeSentiment).toBe(20);
    expect(positiveSentiment + neutralSentiment + negativeSentiment).toBe(100);
  });
});
