import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

type StickyProps = {
  children: React.ReactNode;
  top?: number;
  bottom?: number;
  offset?: number;
  zIndex?: number;
  className?: string;
};

export const Sticky = ({
  children,
  top,
  bottom,
  offset = 0,
  zIndex = 100,
  className = '',
}: StickyProps) => {
  const style: React.CSSProperties = {
    zIndex,
  };

  if (top !== undefined) {
    style.top = `${top + offset}px`;
  }
  if (bottom !== undefined) {
    style.bottom = `${bottom + offset}px`;
  }

  return (
    <div className={cn(styles.sticky, className)} style={style}>
      {children}
    </div>
  );
};

Sticky.displayName = 'Sticky';
