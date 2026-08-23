'use client';

import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export type TagIntent = 'none' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type TagSize = 'sm' | 'md' | 'lg';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  intent?: TagIntent;
  size?: TagSize;
  interactive?: boolean;
  minimal?: boolean;
  round?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({
  intent = 'none',
  size = 'md',
  interactive = false,
  minimal = false,
  round = false,
  icon,
  rightIcon,
  onRemove,
  children,
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        styles.tag,
        styles[`intent-${intent}`],
        styles[`size-${size}`],
        interactive && styles.interactive,
        minimal && styles.minimal,
        round && styles.round,
        className
      )}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.content}>{children}</span>
      {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      {onRemove && (
        <button
          type="button"
          className={styles.removeBtn}
          onClick={onRemove}
          aria-label="Remove tag"
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
};

export default Tag;
