'use client';

import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  labelFor?: string;
  labelInfo?: React.ReactNode;
  helperText?: React.ReactNode;
  intent?: 'none' | 'primary' | 'success' | 'warning' | 'error';
  inline?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  label,
  labelFor,
  labelInfo,
  helperText,
  intent = 'none',
  inline = false,
  disabled = false,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        styles.formGroup,
        styles[`intent-${intent}`],
        inline && styles.inline,
        disabled && styles.disabled,
        className
      )}
      {...props}
    >
      {label && (
        <label htmlFor={labelFor} className={styles.label}>
          {label}
          {labelInfo && <span className={styles.labelInfo}>{labelInfo}</span>}
        </label>
      )}
      <div className={styles.controlWrapper}>
        {children}
        {helperText && <div className={styles.helperText}>{helperText}</div>}
      </div>
    </div>
  );
};

export default FormGroup;
