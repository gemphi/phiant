'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { Button } from '../../primitives/Button';
import { Text } from '../../primitives/Text';
import { Stack } from '../../layout/Stack';
import styles from './styles.module.scss';

export const TOAST_VARIANTS = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
} as const;

export type ToastVariant = (typeof TOAST_VARIANTS)[keyof typeof TOAST_VARIANTS];

type ToastProps = {
  message: string;
  variant?: ToastVariant;
  onClose: () => void;
  className?: string;
};

export const Toast = ({ message, variant = TOAST_VARIANTS.INFO, onClose, className = '' }: ToastProps) => {
  return createPortal(
    <Stack direction="row" align="center" justify="between" className={cn(styles.toast, styles[variant], className)} role="status">
      <Text variant="sm">{message}</Text>
      <Button variant="icon" size="sm" onClick={onClose} aria-label="Close">
        <X size={14} />
      </Button>
    </Stack>,
    document.body
  );
};
