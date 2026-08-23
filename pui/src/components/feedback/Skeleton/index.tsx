import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  className?: string;
};

export const Skeleton = ({ width, height, circle = false, className = '', style, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn(styles.skeleton, circle && styles.circle, className)}
      style={{ width, height, ...style }}
      {...props}
    />
  );
};
