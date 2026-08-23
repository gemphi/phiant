import React from 'react';
import { type LucideIcon } from 'lucide-react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export const ICON_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;

export type IconSize = (typeof ICON_SIZES)[keyof typeof ICON_SIZES];

type IconProps = {
  name: LucideIcon;
  size?: IconSize | number;
  className?: string;
};

const sizeMap: Record<IconSize, number> = {
  [ICON_SIZES.SM]: 14,
  [ICON_SIZES.MD]: 16,
  [ICON_SIZES.LG]: 20,
  [ICON_SIZES.XL]: 24,
};

export const Icon = ({ name: Name, size = ICON_SIZES.MD, className = '' }: IconProps) => {
  const numericSize = typeof size === 'number' ? size : sizeMap[size];
  return <Name className={cn(styles.icon, className)} size={numericSize} color="currentColor" />;
};
