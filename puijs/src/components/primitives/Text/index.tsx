import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export const TEXT_VARIANTS = {
  DEFAULT: 'default',
  MUTED: 'muted',
  SM: 'sm',
  LG: 'lg',
  LABEL: 'label',
  XS: 'xs',
} as const;

export type TextVariant = (typeof TEXT_VARIANTS)[keyof typeof TEXT_VARIANTS];

type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  variant?: TextVariant;
  center?: boolean;
  children?: React.ReactNode;
};

export const Text = ({
  variant = TEXT_VARIANTS.DEFAULT,
  center = false,
  className = '',
  children,
  ...props
}: TextProps) => {
  return (
    <p className={cn(styles.text, styles[variant], center && styles.center, className)} {...props}>
      {children}
    </p>
  );
};
