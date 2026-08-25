import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export type SelectOption = {
  value: string | number;
  label: string;
  disabled?: boolean;
};

export type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> & {
  options?: SelectOption[];
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, size = 'md', error, className = '', children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(styles.select, styles[size], error && styles.error, className)}
        {...props}
      >
        {options
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))
          : children}
      </select>
    );
  }
);
Select.displayName = 'Select';
