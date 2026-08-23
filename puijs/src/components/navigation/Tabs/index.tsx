'use client';

import React, { useState } from 'react';
import { cn } from '../../../utils/cn';
import { Button } from '../../primitives/Button';
import { Stack } from '../../layout/Stack';
import styles from './styles.module.scss';

export type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  items: TabItem[];
  defaultActiveId?: string;
  className?: string;
};

export const Tabs = ({ items, defaultActiveId, className = '' }: TabsProps) => {
  const [active, setActive] = useState(defaultActiveId ?? items[0]?.id);
  const activeItem = items.find((item) => item.id === active) ?? items[0];

  return (
    <Stack direction="column" className={cn(styles.tabs, className)}>
      <Stack direction="row" gap={1} className={styles.list} role="tablist">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active === item.id}
            className={cn(styles.tab, active === item.id && styles.active)}
            onClick={() => setActive(item.id)}
          >
            {item.label}
          </button>
        ))}
      </Stack>
      <Stack direction="column" className={styles.panel} role="tabpanel">
        {activeItem?.content}
      </Stack>
    </Stack>
  );
};
