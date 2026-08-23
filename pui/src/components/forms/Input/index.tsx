import React from 'react';
import { cn } from '../../../utils/cn';
import { Span } from '../../primitives/Span';
import { Stack } from '../../layout/Stack';
import styles from './styles.module.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
  error?: boolean;
  className?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon, error, className = '', ...props }, ref) => {
    return (
      <Stack direction="row" align="center" className={styles.wrapper}>
        {icon && <Span className={styles.icon}>{icon}</Span>}
        <input
          ref={ref}
          className={cn(styles.input, icon && styles.withIcon, error && styles.error, className)}
          {...props}
        />
      </Stack>
    );
  }
);
Input.displayName = 'Input';
