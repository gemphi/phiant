'use client';

import React from 'react';
import { Stack, Tag, Text } from '@pui/components';
import { DOCS_NAV_GROUPS, NavItem } from '../content/navigation';

interface AppSidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ currentPath, onNavigate }) => {
  return (
    <aside
      style={{
        width: '260px',
        borderRight: '1px solid var(--phi-color-border)',
        backgroundColor: 'var(--phi-color-background-secondary)',
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        overflowY: 'auto',
      }}
    >
      {DOCS_NAV_GROUPS.map((group) => (
        <div key={group.id}>
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--phi-color-text-muted)',
              marginBottom: '8px',
              paddingLeft: '8px',
            }}
          >
            {group.title}
          </div>
          <Stack direction="column" gap={1}>
            {group.items.map((item: NavItem) => {
              const active = currentPath === item.path;
              return (
                <div
                  key={item.id}
                  onClick={() => onNavigate(item.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    borderRadius: 'var(--phi-radius-sm)',
                    cursor: 'pointer',
                    fontSize: 'var(--phi-font-size-sm)',
                    fontWeight: active ? '600' : '400',
                    backgroundColor: active ? 'var(--phi-color-primary-light)' : 'transparent',
                    color: active ? 'var(--phi-color-primary)' : 'var(--phi-color-text-primary)',
                    transition: 'all var(--phi-transition-fast)',
                  }}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <Tag intent={active ? 'primary' : 'none'} minimal size="sm">
                      {item.badge}
                    </Tag>
                  )}
                </div>
              );
            })}
          </Stack>
        </div>
      ))}
    </aside>
  );
};
