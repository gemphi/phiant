import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export const BADGE_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  WARNING: 'warning',
  INFO: 'info',
  ERROR: 'error',
  COUNT: 'count',
} as const;

export type BadgeVariant = (typeof BADGE_VARIANTS)[keyof typeof BADGE_VARIANTS];

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  className?: string;
  children?: React.ReactNode;
};

export const Badge = ({
  children,
  variant = BADGE_VARIANTS.PRIMARY,
  className = '',
  ...props
}: BadgeProps) => {
  return (
    <span className={cn(styles.badge, styles[variant], className)} {...props}>
      {children}
    </span>
  );
};
