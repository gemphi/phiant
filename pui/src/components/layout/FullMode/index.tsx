import React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../../utils/cn';
import { Stack } from '../Stack';
import { Button } from '../../primitives/Button';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import styles from './styles.module.scss';

type FullModeProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export const FullMode = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  className = '',
}: FullModeProps) => {
  if (!isOpen) return null;

  return createPortal(
    <Stack
      direction="column"
      className={cn(styles.fullMode, className)}
      role="dialog"
      aria-modal="true"
      aria-label={title ?? 'Full mode'}
    >
      <Stack
        direction="row"
        align="center"
        justify="between"
        className={styles.header}
      >
        <Stack direction="row" align="center" gap={2}>
          <Button
            variant="ghost"
            size="sm"
            iconLeft={ArrowLeft}
            onClick={onClose}
            aria-label="Back"
          >
            Back
          </Button>
          {title && (
            <Stack direction="column" gap={0}>
              <span className={styles.title}>{title}</span>
              {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
            </Stack>
          )}
        </Stack>
        <Stack direction="row" align="center" gap={2}>
          <Maximize2 size={16} className={styles.expandIcon} />
        </Stack>
      </Stack>

      <Stack direction="column" className={styles.body}>
        {children}
      </Stack>

      {footer && (
        <Stack direction="row" align="center" justify="between" className={styles.footer}>
          {footer}
        </Stack>
      )}
    </Stack>,
    document.body
  );
};

FullMode.displayName = 'FullMode';
