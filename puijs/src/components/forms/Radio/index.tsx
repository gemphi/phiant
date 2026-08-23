import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
  error?: boolean;
  className?: string;
};

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <label className={cn(styles.wrapper, className)}>
        <input ref={ref} type="radio" className={styles.input} {...props} />
        <span className={cn(styles.circle, error && styles.error)} />
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);
Radio.displayName = 'Radio';
