import React from 'react';

export const DocsTOC: React.FC = () => {
  return (
    <aside style={{
      position: 'sticky',
      top: '65px',
      height: 'calc(100vh - 65px)',
      overflowY: 'auto',
      padding: '1.75rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      borderLeft: '1px solid var(--border-color, rgba(129, 140, 248, 0.2))',
      background: 'var(--gradient-sidebar, linear-gradient(180deg, var(--bg-card, #0e1026) 0%, var(--bg-secondary, #070814) 100%))',
    }}>
      <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary, #94a3b8)' }}>
        On This Page
      </span>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <span style={{ fontSize: '0.825rem', color: 'var(--color-primary, #818cf8)', fontWeight: 600 }}>Overview & Setup</span>
        <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary, #94a3b8)' }}>Mathematical Equations</span>
        <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary, #94a3b8)' }}>Production Examples</span>
        <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary, #94a3b8)' }}>API Specifications</span>
      </nav>
    </aside>
  );
};
