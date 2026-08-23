import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

type TitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: React.ReactNode;
};

export const Title = ({ variant = 'h1', children, className = '', ...props }: TitleProps) => {
  const Tag = variant;
  return <Tag className={cn(styles.title, styles[variant], className)} {...props}>{children}</Tag>;
};
