import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { Span } from '../../primitives/Span';
import { Stack } from '../../layout/Stack';
import styles from './styles.module.scss';

export const SPINNER_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export type SpinnerSize = (typeof SPINNER_SIZES)[keyof typeof SPINNER_SIZES];

type SpinnerProps = {
  size?: SpinnerSize;
  label?: string;
  className?: string;
};

const sizeMap: Record<SpinnerSize, number> = {
  [SPINNER_SIZES.SM]: 16,
  [SPINNER_SIZES.MD]: 24,
  [SPINNER_SIZES.LG]: 32,
};

export const Spinner = ({ size = SPINNER_SIZES.MD, label, className = '' }: SpinnerProps) => {
  return (
    <Stack direction="row" align="center" gap={2} className={cn(styles.spinner, className)} role="status">
      <Loader2 className={styles.spin} size={sizeMap[size]} />
      {label && <Span className={styles.label}>{label}</Span>}
    </Stack>
  );
};
