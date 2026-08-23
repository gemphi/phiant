import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
  error?: boolean;
  className?: string;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <label className={cn(styles.wrapper, className)}>
        <input ref={ref} type="checkbox" className={styles.input} {...props} />
        <span className={cn(styles.box, error && styles.error)} />
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';
