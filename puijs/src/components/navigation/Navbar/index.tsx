import React from 'react';
import { cn } from '../../../utils/cn';
import { Stack } from '../../layout/Stack';
import styles from './styles.module.scss';

type NavbarProps = {
  children: React.ReactNode;
  sticky?: boolean;
  position?: 'top' | 'bottom';
  variant?: 'default' | 'transparent' | 'solid';
  height?: number;
  className?: string;
};

export const Navbar = ({
  children,
  sticky = false,
  position = 'top',
  variant = 'default',
  height = 56,
  className = '',
}: NavbarProps) => {
  return (
    <Stack
      direction="row"
      align="center"
      justify="between"
      className={cn(
        styles.navbar,
        styles[position],
        styles[variant],
        sticky && styles.sticky,
        className
      )}
      style={{ height: `${height}px` }}
    >
      {children}
    </Stack>
  );
};

Navbar.displayName = 'Navbar';

type NavbarSectionProps = {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  className?: string;
};

export const NavbarSection = ({ children, align = 'start', className = '' }: NavbarSectionProps) => (
  <Stack direction="row" align="center" gap={2} className={cn(styles.section, styles[`align-${align}`], className)}>
    {children}
  </Stack>
);

NavbarSection.displayName = 'NavbarSection';

type NavbarItemProps = {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
};

export const NavbarItem = ({ children, active = false, onClick, href, className = '' }: NavbarItemProps) => {
  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={cn(styles.item, active && styles.itemActive, className)}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(styles.item, active && styles.itemActive, className)}
    >
      {children}
    </button>
  );
};

NavbarItem.displayName = 'NavbarItem';
