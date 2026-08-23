import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export const CONTAINER_SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  FULL: 'full',
} as const;

export type ContainerSize = (typeof CONTAINER_SIZES)[keyof typeof CONTAINER_SIZES];

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: ContainerSize;
  fluid?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ size, fluid = false, className = '', children, ...props }, ref) => {
    const sizeClass = fluid || !size ? styles.full : styles[size];
    return (
      <div ref={ref} className={cn(styles.container, sizeClass, className)} {...props}>
        {children}
      </div>
    );
  }
);
Container.displayName = 'Container';
