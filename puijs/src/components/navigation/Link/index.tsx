import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export const LINK_VARIANTS = {
  DEFAULT: 'default',
  MUTED: 'muted',
  UNDERLINE: 'underline',
} as const;

export type LinkVariant = (typeof LINK_VARIANTS)[keyof typeof LINK_VARIANTS];

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: LinkVariant;
  active?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export const Link = ({ href, variant = LINK_VARIANTS.DEFAULT, active = false, className = '', children, ...props }: LinkProps) => {
  return (
    <a
      href={href}
      className={cn(styles.link, styles[variant], active && styles.active, className)}
      {...props}
    >
      {children}
    </a>
  );
};
