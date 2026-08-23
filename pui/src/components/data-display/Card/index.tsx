import React from 'react';
import { cn } from '../../../utils/cn';
import { Stack } from '../../layout/Stack';
import styles from './styles.module.scss';

export const CARD_VARIANTS = {
  DEFAULT: 'default',
  HERO: 'hero',
  FLAT: 'flat',
  COMPACT: 'compact',
} as const;

export type CardVariant = (typeof CARD_VARIANTS)[keyof typeof CARD_VARIANTS];

type CardProps = React.HTMLAttributes<HTMLElement> & {
  variant?: CardVariant;
  hoverable?: boolean;
  compact?: boolean;
  selected?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export const Card = ({
  variant = CARD_VARIANTS.DEFAULT,
  hoverable = true,
  compact = false,
  selected = false,
  className = '',
  children,
  ...props
}: CardProps) => {
  return (
    <article
      className={cn('pui-card', styles.card, styles[variant], compact && styles.compact, hoverable && styles.hoverable, selected && styles.selected, className)}
      {...props}
    >
      {children}
    </article>
  );
};

type CardHeaderProps = React.HTMLAttributes<HTMLElement> & {
  action?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export const CardHeader = ({ action, className = '', children, ...props }: CardHeaderProps) => {
  return (
    <header className={cn('pui-card-header', styles.header, className)} {...props}>
      <Stack direction="row" align="center" gap={2} className={styles.headerContent}>{children}</Stack>
      {action && <Stack direction="row" align="center" className={styles.headerAction}>{action}</Stack>}
    </header>
  );
};

type CardBodyProps = React.HTMLAttributes<HTMLElement> & {
  className?: string;
  children?: React.ReactNode;
};

export const CardBody = ({ className = '', children, ...props }: CardBodyProps) => {
  return (
    <section className={cn('pui-card-body', styles.body, className)} {...props}>
      {children}
    </section>
  );
};

type CardFooterProps = React.HTMLAttributes<HTMLElement> & {
  className?: string;
  children?: React.ReactNode;
};

export const CardFooter = ({ className = '', children, ...props }: CardFooterProps) => {
  return (
    <footer className={cn('pui-card-footer', styles.footer, className)} {...props}>
      {children}
    </footer>
  );
};

type CardImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  className?: string;
};

export const CardImage = ({ src, alt, className = '', ...props }: CardImageProps) => {
  return <img src={src} alt={alt} className={cn(styles.image, className)} {...props} />;
};
