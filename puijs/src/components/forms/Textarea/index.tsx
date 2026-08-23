import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
  className?: string;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className = '', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(styles.textarea, error && styles.error, className)}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
