'use client';

import React from 'react';
import { Button, Input, Select, Stack, Tag, usePuiTheme } from '@pui/components';
import { Search, Sun, Moon, Sparkles, Sliders } from 'lucide-react';

interface AppHeaderProps {
  onOpenInspector: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onOpenInspector,
  searchQuery,
  onSearchChange,
}) => {
  const { theme, setTheme, brandId, setBrandId, brands, isDark } = usePuiTheme();

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: '56px',
        borderBottom: '1px solid var(--phi-color-border)',
        backgroundColor: 'var(--phi-color-background-card)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <Stack direction="row" gap={3} align="center">
        <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--phi-color-primary)' }}>Φ</span>
        <span style={{ fontWeight: 700, fontSize: '1rem' }}>PUI Documentation & Workbench</span>
        <Tag intent="primary" minimal round>puijs.com</Tag>
      </Stack>

      <Stack direction="row" gap={3} align="center">
        <Input
          placeholder="Search components, tokens, APIs..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          icon={<Search size={14} />}
          style={{ width: '260px' }}
        />

        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          icon={isDark ? <Sun size={14} /> : <Moon size={14} />}
        >
          {isDark ? 'Light' : 'Dark'}
        </Button>

        <Select
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
          style={{ width: '140px' }}
        >
          {brands.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </Select>

        <Button
          variant="secondary"
          size="sm"
          icon={<Sliders size={14} />}
          onClick={onOpenInspector}
        >
          Inspector
        </Button>
      </Stack>
    </header>
  );
};
