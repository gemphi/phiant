import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export type ColGap = 1 | 2 | 3 | 4 | 6 | 8;
export type ColAlign = 'start' | 'center' | 'end' | 'stretch';
export type ColJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export type ColSize = boolean | 'auto' | number;
export type ColSpec = ColSize | { span?: ColSize; offset?: number; order?: number | 'first' | 'last' };
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type ColProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: ColGap;
  align?: ColAlign;
  justify?: ColJustify;
  fill?: boolean;
  className?: string;
  children?: React.ReactNode;
  xs?: ColSpec;
  sm?: ColSpec;
  md?: ColSpec;
  lg?: ColSpec;
  xl?: ColSpec;
};

const alignMap: Record<ColAlign, React.CSSProperties['alignItems']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

const justifyMap: Record<ColJustify, React.CSSProperties['justifyContent']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

const toSpan = (spec: ColSpec | undefined): ColSize | undefined => {
  if (spec == null) return undefined;
  if (typeof spec === 'object') return spec.span;
  return spec;
};

const toOffset = (spec: ColSpec | undefined): number | undefined => {
  if (spec == null) return undefined;
  if (typeof spec === 'object') return spec.offset;
  return undefined;
};

const toOrder = (spec: ColSpec | undefined): number | 'first' | 'last' | undefined => {
  if (spec == null) return undefined;
  if (typeof spec === 'object') return spec.order;
  return undefined;
};

const BREAKPOINTS: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const buildResponsiveClasses = (bp: Breakpoint, spec: ColSpec | undefined): string[] => {
  if (spec == null) return [];
  const span = toSpan(spec);
  const offset = toOffset(spec);
  const order = toOrder(spec);
  const classes: string[] = [];
  const infix = bp === 'xs' ? '' : `-${bp}`;

  if (span === true) {
    classes.push(styles[`col${infix}`]);
  } else if (span === 'auto') {
    classes.push(styles[`col${infix}-auto`]);
  } else if (typeof span === 'number') {
    classes.push(styles[`col${infix}-${span}`]);
  }

  if (typeof offset === 'number') {
    classes.push(styles[`offset${infix}-${offset}`]);
  }

  if (order === 'first') {
    classes.push(styles[`order${infix}-first`]);
  } else if (order === 'last') {
    classes.push(styles[`order${infix}-last`]);
  } else if (typeof order === 'number') {
    classes.push(styles[`order${infix}-${order}`]);
  }

  return classes;
};

export const Col = React.forwardRef<HTMLDivElement, ColProps>(
  (
    { gap = 2, align = 'stretch', justify = 'start', fill = false, className = '', style, children, xs, sm, md, lg, xl, ...props },
    ref
  ) => {
    const responsiveClasses = BREAKPOINTS.flatMap((bp) => buildResponsiveClasses(bp, { xs, sm, md, lg, xl }[bp]));

    const hasResponsive = responsiveClasses.length > 0;

    const baseStyle: React.CSSProperties = {
      gap: `${gap * 0.25}rem`,
      alignItems: alignMap[align],
      justifyContent: justifyMap[justify],
    };

    if (!hasResponsive && fill) {
      baseStyle.flex = '1 1 auto';
    }

    return (
      <div
        ref={ref}
        className={cn(styles.col, ...responsiveClasses, className)}
        style={{
          ...baseStyle,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Col.displayName = 'Col';
