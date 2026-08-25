import React from 'react';
import { BookOpen, Search, ArrowLeft, Sun, Moon } from 'lucide-react';
import { Badge } from '../../primitives/Badge';
import { Button } from '../../primitives/Button';

interface DocsNavbarProps {
  brandTitle: string;
  version: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectGuide: (id: string) => void;
  onBackToApp?: () => void;
  backToAppLabel?: string;
  dark?: boolean;
  onToggleDark?: () => void;
}

export const DocsNavbar: React.FC<DocsNavbarProps> = ({
  brandTitle,
  version,
  searchQuery,
  onSearchChange,
  onSelectGuide,
  onBackToApp,
  backToAppLabel = 'Open App',
  dark,
  onToggleDark,
}) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      height: '65px',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--border-color, rgba(129, 140, 248, 0.2))',
      background: 'var(--gradient-header, linear-gradient(180deg, var(--bg-card, #0e1026) 0%, var(--bg-primary, #030307) 100%))',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.5))',
    }}>
      {/* Brand & Version Badge */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            padding: 0,
          }}
          onClick={() => onSelectGuide('quickstart')}
        >
          <span style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--color-primary, #6366f1) 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.35)',
          }}>
            <BookOpen size={17} />
          </span>
          <span style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary, #f8fafc)' }}>
            {brandTitle}
          </span>
        </button>

        <Badge variant="secondary" style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.55rem' }}>
          {version}
        </Badge>
      </nav>

      {/* Global Search Bar */}
      <section style={{ position: 'relative', width: '360px' }}>
        <Search size={15} style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-secondary, #94a3b8)' }} />
        <input
          type="text"
          placeholder="Search guides, Kuramoto equations, APIs..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem 0.5rem 2.2rem',
            borderRadius: 'var(--radius-md, 8px)',
            border: '1px solid var(--border-color, rgba(129, 140, 248, 0.2))',
            background: 'var(--bg-input, rgba(6, 7, 18, 0.85))',
            color: 'var(--text-primary, #f8fafc)',
            fontSize: '0.825rem',
            outline: 'none',
          }}
        />
      </section>

      {/* Right Actions */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {onBackToApp && (
          <Button
            variant="outline"
            size="sm"
            onClick={onBackToApp}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.85rem' }}
          >
            <ArrowLeft size={15} />
            <span>{backToAppLabel}</span>
          </Button>
        )}

        {onToggleDark && (
          <Button
            variant="icon"
            size="sm"
            onClick={onToggleDark}
            aria-label="Toggle theme mode"
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </Button>
        )}
      </nav>
    </header>
  );
};
