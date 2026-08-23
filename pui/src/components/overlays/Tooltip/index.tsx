'use client';

import React, { useState } from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export const TOOLTIP_POSITIONS = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export type TooltipPosition = (typeof TOOLTIP_POSITIONS)[keyof typeof TOOLTIP_POSITIONS];

type TooltipProps = {
  children: React.ReactElement;
  content: React.ReactNode;
  position?: TooltipPosition;
  pushed?: boolean;
  className?: string;
};

export const Tooltip = ({ children, content, position = TOOLTIP_POSITIONS.TOP, pushed = false, className = '' }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  const positionClass = pushed && position === TOOLTIP_POSITIONS.RIGHT
    ? styles.rightPushed
    : styles[position];

  return (
    <span
      className={cn(styles.wrapper, className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && <span className={cn(styles.tooltip, positionClass)}>{content}</span>}
    </span>
  );
};
