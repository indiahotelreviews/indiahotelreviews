import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { StarRating } from '../components/common/StarRating';
import { Badge } from '../components/common/Badge';

describe('Common UI Components', () => {
  it('renders StarRating correctly with stars and number', () => {
    const { container } = render(<StarRating rating={4.8} size="md" showNumber />);
    expect(screen.getByText('4.8')).toBeInTheDocument();
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(5);
  });

  it('renders Verified Stay badge with correct label', () => {
    render(<Badge type="verified_stay" />);
    expect(screen.getByText('Verified Stay')).toBeInTheDocument();
  });

  it('renders Trending Stay badge with correct label', () => {
    render(<Badge type="trending" />);
    expect(screen.getByText('Trending Stay')).toBeInTheDocument();
  });
});
