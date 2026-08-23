'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../../utils/cn';
import { Stack } from '../../layout/Stack';
import styles from './styles.module.scss';

type PopoverProps = {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  className?: string;
  contentClassName?: string;
};

export const Popover = ({
  isOpen: controlledOpen,
  onOpenChange,
  trigger,
  children,
  placement = 'bottom-start',
  className = '',
  contentClassName = '',
}: PopoverProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const ref = useRef<HTMLDivElement>(null);

  const setOpen = (value: boolean) => {
    if (onOpenChange) {
      onOpenChange(value);
    } else {
      setInternalOpen(value);
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <Stack direction="column" className={cn(styles.popover, className)} ref={ref}>
      <Stack className={styles.trigger} onClick={() => setOpen(!open)}>
        {trigger}
      </Stack>
      {open && (
        <Stack direction="column" className={cn(styles.content, styles[placement], contentClassName)}>
          {children}
        </Stack>
      )}
    </Stack>
  );
};

Popover.displayName = 'Popover';
