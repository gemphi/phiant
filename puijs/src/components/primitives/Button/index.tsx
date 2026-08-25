import React from 'react';
import { Loader2, type LucideIcon } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { BUTTON_SIZES, BUTTON_VARIANTS, type ButtonSize, type ButtonVariant } from './constants';
import styles from './styles.module.scss';

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = ({
  variant = BUTTON_VARIANTS.PRIMARY,
  size = BUTTON_SIZES.MD,
  fullWidth = false,
  loading = false,
  loadingText,
  icon,
  iconLeft,
  iconRight,
  className = '',
  children,
  ...props
}: ButtonProps) => {
  const isIcon = variant === BUTTON_VARIANTS.ICON;
  const iconSize = size === BUTTON_SIZES.SM ? 14 : size === BUTTON_SIZES.LG ? 20 : 16;
  const iconSizeForIconVariant = size === BUTTON_SIZES.SM ? 16 : size === BUTTON_SIZES.LG ? 24 : 20;

  const classes = cn(
    styles.button,
    !isIcon && styles[size],
    isIcon && styles[`icon${size.charAt(0).toUpperCase() + size.slice(1)}`],
    styles[variant],
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    'disabled' in props && props.disabled && styles.disabled,
    className
  );

  const IconLeft = iconLeft;
  const IconRight = iconRight;

  const content = loading ? (
    <>
      <Loader2 className={styles.spin} aria-hidden size={isIcon ? iconSizeForIconVariant : iconSize} />
      {!isIcon && (typeof children === 'string' ? <span>{loadingText || children}</span> : children)}
    </>
  ) : (
    <>
      {icon && <span className={styles.iconNode}>{icon}</span>}
      {!isIcon && IconLeft && <IconLeft aria-hidden size={iconSize} />}
      {typeof children === 'string' ? <span>{children}</span> : children}
      {!isIcon && IconRight && <IconRight aria-hidden size={iconSize} />}
      {isIcon && IconLeft && <IconLeft aria-hidden size={iconSizeForIconVariant} />}
    </>
  );

  if ('href' in props && props.href) {
    const { href, ...linkProps } = props as ButtonAsLink;
    return (
      <a href={href} className={classes} {...linkProps}>
        {content}
      </a>
    );
  }

  const { disabled, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={classes} disabled={disabled || loading} {...buttonProps}>
      {content}
    </button>
  );
};
