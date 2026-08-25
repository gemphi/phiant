import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export type ColGap = 1 | 2 | 3 | 4 | 6 | 8;
export type ColAlign = 'start' | 'center' | 'end' | 'stretch';
export type ColJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type ColSize = boolean | 'auto' | number;
export type ColSpec = ColSize | { span?: ColSize; offset?: number; order?: number | 'first' | 'last' };
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ColProps = React.HTMLAttributes<HTMLDivElement> & {
  span?: ColSize;
  gap?: ColGap;
  align?: ColAlign;
  justify?: ColJustify;
  fill?: boolean;
  xs?: ColSpec;
  sm?: ColSpec;
  md?: ColSpec;
  lg?: ColSpec;
  xl?: ColSpec;
};

const alignMap: Record<ColAlign, React.CSSProperties['alignItems']> = {
  start: 'flex-start', center: 'center', end: 'flex-end', stretch: 'stretch',
};

const justifyMap: Record<ColJustify, React.CSSProperties['justifyContent']> = {
  start: 'flex-start', center: 'center', end: 'flex-end',
  between: 'space-between', around: 'space-around', evenly: 'space-evenly',
};

const toSpan = (s?: ColSpec) => (typeof s === 'object' ? s.span : s);
const toOffset = (s?: ColSpec) => (typeof s === 'object' ? s.offset : undefined);
const toOrder = (s?: ColSpec) => (typeof s === 'object' ? s.order : undefined);

export const Col: React.FC<ColProps> = ({
  span, gap, align, justify, fill, className, children, xs, sm, md, lg, xl, style, ...props
}) => {
  const bp = { xs, sm, md, lg, xl };
  const bpClasses: string[] = [];

  if (span != null) {
    if (span === true) bpClasses.push(styles['col']);
    else if (span === 'auto') bpClasses.push(styles['col-auto']);
    else if (typeof span === 'number') bpClasses.push(styles[`col-${span}`]);
  }

  (Object.keys(bp) as Breakpoint[]).forEach((b) => {
    const spec = bp[b];
    const s = toSpan(spec);
    const offset = toOffset(spec);
    const order = toOrder(spec);

    if (s === true) bpClasses.push(styles[`col-${b}`]);
    else if (s === 'auto') bpClasses.push(styles[`col-${b}-auto`]);
    else if (typeof s === 'number') bpClasses.push(styles[`col-${b}-${s}`]);

    if (offset != null) bpClasses.push(styles[`offset-${b}-${offset}`]);
    if (order != null) bpClasses.push(styles[`order-${b}-${order}`]);
  });

  const hasSpan = bpClasses.some((c) => c && c.includes('col-'));
  const dynamicStyle: React.CSSProperties = {
    ...(align && { alignItems: alignMap[align] }),
    ...(justify && { justifyContent: justifyMap[justify] }),
    ...style,
  };

  return (
    <div
      className={cn(styles.col, !hasSpan && styles.colAuto, gap && styles[`gap-${gap}`], fill && styles.fill, ...bpClasses, className)}
      style={dynamicStyle}
      {...props}
    >
      {children}
    </div>
  );
};
