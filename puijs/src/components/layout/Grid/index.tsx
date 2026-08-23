import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';
import type { Breakpoint } from '../Col';

export type GridGap = 1 | 2 | 3 | 4 | 6 | 8;

type GridProps = React.HTMLAttributes<HTMLDivElement> & {
  columns?: number;
  gap?: GridGap;
  className?: string;
  children?: React.ReactNode;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

const BREAKPOINTS: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ columns, gap = 4, className = '', style, children, xs, sm, md, lg, xl, ...props }, ref) => {
    const responsiveProps = { xs, sm, md, lg, xl };
    const responsiveClasses: string[] = [];

    for (const bp of BREAKPOINTS) {
      const cols = responsiveProps[bp];
      if (cols != null) {
        const infix = bp === 'xs' ? '' : `-${bp}`;
        responsiveClasses.push(styles[`grid-cols${infix}-${cols}`]);
      }
    }

    const hasResponsive = responsiveClasses.length > 0;
    const baseStyle: React.CSSProperties = {
      ...style,
      gap: `${gap * 0.25}rem`,
    };

    if (!hasResponsive && columns != null) {
      baseStyle.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
    }

    return (
      <div
        ref={ref}
        className={cn(styles.grid, ...responsiveClasses, className)}
        style={baseStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Grid.displayName = 'Grid';
