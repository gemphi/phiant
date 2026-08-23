import React from 'react';
import { cn } from '../../../utils/cn';
import { Stack } from '../../layout/Stack';
import styles from './styles.module.scss';

export type TabListItem = {
  id: string;
  label: string;
  disabled?: boolean;
};

type TabListProps = {
  items: TabListItem[];
  activeId?: string;
  onChange?: (id: string) => void;
  size?: 'sm' | 'md';
  variant?: 'default' | 'pills';
  className?: string;
};

export const TabList = ({
  items,
  activeId,
  onChange,
  size = 'md',
  variant = 'default',
  className = '',
}: TabListProps) => {
  return (
    <Stack direction="row" gap={1} className={cn(styles.tabList, styles[size], styles[variant], className)} role="tablist">
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={item.disabled}
            className={cn(styles.tab, isActive && styles.active)}
            onClick={() => onChange?.(item.id)}
          >
            {item.label}
          </button>
        );
      })}
    </Stack>
  );
};

TabList.displayName = 'TabList';
