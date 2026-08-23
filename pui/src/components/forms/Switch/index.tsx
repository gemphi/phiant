'use client';

import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  inline?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  size = 'md',
  inline = false,
  checked,
  defaultChecked,
  disabled,
  className,
  onChange,
  ...props
}) => {
  return (
    <label
      className={cn(
        styles.switchLabel,
        styles[`size-${size}`],
        disabled && styles.disabled,
        inline && styles.inline,
        className
      )}
    >
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
        {...props}
      />
      <span className={styles.track}>
        <span className={styles.thumb} />
      </span>
      {label && <span className={styles.text}>{label}</span>}
    </label>
  );
};

export default Switch;
