import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, className = '', children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(styles.select, error && styles.error, className)}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';
