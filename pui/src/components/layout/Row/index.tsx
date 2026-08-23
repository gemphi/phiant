import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';
import type { Breakpoint } from '../Col';

export type RowGap = 1 | 2 | 3 | 4 | 6 | 8;
export type RowAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type RowJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export type RowColumns = number | { cols?: number };

type RowProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: RowGap;
  align?: RowAlign;
  justify?: RowJustify;
  wrap?: boolean;
  className?: string;
  children?: React.ReactNode;
  xs?: RowColumns;
  sm?: RowColumns;
  md?: RowColumns;
  lg?: RowColumns;
  xl?: RowColumns;
};

const alignMap: Record<RowAlign, React.CSSProperties['alignItems']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const justifyMap: Record<RowJustify, React.CSSProperties['justifyContent']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

const BREAKPOINTS: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const toCols = (spec: RowColumns | undefined): number | undefined => {
  if (spec == null) return undefined;
  if (typeof spec === 'object') return spec.cols;
  return spec;
};

const buildResponsiveClasses = (bp: Breakpoint, spec: RowColumns | undefined): string | null => {
  const cols = toCols(spec);
  if (cols == null) return null;
  const infix = bp === 'xs' ? '' : `-${bp}`;
  return styles[`row-cols${infix}-${cols}`];
};

export const Row = React.forwardRef<HTMLDivElement, RowProps>(
  (
    { gap = 2, align = 'center', justify = 'start', wrap = true, className = '', style, children, xs, sm, md, lg, xl, ...props },
    ref
  ) => {
    const responsiveClasses = BREAKPOINTS.map((bp) => buildResponsiveClasses(bp, { xs, sm, md, lg, xl }[bp])).filter(Boolean) as string[];

    return (
      <div
        ref={ref}
        className={cn(styles.row, ...responsiveClasses, className)}
        style={{
          ...style,
          gap: `${gap * 0.25}rem`,
          '--row-gap': `${gap * 0.25}rem`,
          alignItems: alignMap[align],
          justifyContent: justifyMap[justify],
          flexWrap: wrap ? 'wrap' : 'nowrap',
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Row.displayName = 'Row';
