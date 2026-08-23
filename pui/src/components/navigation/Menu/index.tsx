'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { Button } from '../../primitives/Button';
import { Stack } from '../../layout/Stack';
import styles from './styles.module.scss';

export const MENU_POSITIONS = {
  BOTTOM_END: 'bottom-end',
  BOTTOM_START: 'bottom-start',
  BOTTOM_CENTER: 'bottom-center',
  RIGHT: 'right',
  LEFT: 'left',
} as const;

export type MenuPosition = (typeof MENU_POSITIONS)[keyof typeof MENU_POSITIONS];

type MenuProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  position?: MenuPosition;
  className?: string;
};

export const Menu = ({ trigger, children, position = MENU_POSITIONS.BOTTOM_END, className = '' }: MenuProps) => {
  const [open, setOpen] = useState(false);
  const positionClass = styles[position];
  return (
    <Stack
      direction="column"
      className={cn(styles.menu, className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Stack className={styles.trigger}>{trigger}</Stack>
      {open && <Stack direction="column" className={cn(styles.dropdown, positionClass)}>{children}</Stack>}
    </Stack>
  );
};

type MenuItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  children?: React.ReactNode;
};

export const MenuItem = ({ active = false, className = '', children, ...props }: MenuItemProps) => {
  return (
    <button
      type="button"
      className={cn(styles.item, active && styles.active, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export const MenuChevron = () => <ChevronDown size={14} />;
