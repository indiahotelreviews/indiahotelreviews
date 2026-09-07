import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  size = 'md',
  showNumber = false,
  interactive = false,
  onChange,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }, (_, i) => {
          const starValue = i + 1;
          const isFilled = starValue <= Math.floor(rating);
          const isHalf = !isFilled && starValue - 0.5 <= rating;

          return (
            <button
              key={i}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange && onChange(starValue)}
              className={`${
                interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'
              } focus:outline-none`}
            >
              <Star
                className={`${sizeClasses[size]} ${
                  isFilled
                    ? 'fill-neutral-900 text-neutral-900 dark:fill-white dark:text-white'
                    : isHalf
                    ? 'fill-neutral-400 text-neutral-900'
                    : 'fill-transparent text-neutral-300 dark:text-neutral-700'
                } transition-colors`}
              />
            </button>
          );
        })}
      </div>
      {showNumber && (
        <span className="font-mono text-xs font-semibold tracking-tight text-neutral-900 dark:text-white ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};
