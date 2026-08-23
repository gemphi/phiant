import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../primitives/Icon';
import { Span } from '../../primitives/Span';
import styles from './styles.module.scss';

export const RATING_SIZES = {
  SM: 'sm',
  LG: 'lg',
} as const;

export type RatingSize = (typeof RATING_SIZES)[keyof typeof RATING_SIZES];

type RatingProps = {
  value: number;
  count?: number;
  size?: RatingSize;
  interactive?: boolean;
  onChange?: (value: number) => void;
  className?: string;
};

export const Rating = ({ value, count, size = RATING_SIZES.SM, interactive = false, onChange, className = '' }: RatingProps) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const filled = index < Math.round(value);
    return (
      <button
        key={index}
        type="button"
        disabled={!interactive}
        className={cn(styles.star, filled && styles.filled, interactive && styles.interactive)}
        onClick={() => interactive && onChange?.(index + 1)}
      >
        <Icon name={Star} size={size} />
      </button>
    );
  });

  return (
    <span className={cn(styles.rating, className)} role="img" aria-label={`Rating: ${value} out of 5`}>
      {stars}
      {typeof count === 'number' && <Span variant="muted" className={styles.count}>({count})</Span>}
    </span>
  );
};
