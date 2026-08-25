import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { DocGuide } from './types';

interface DocsSidebarProps {
  categories: Record<string, DocGuide[]>;
  activeGuideId: string;
  onSelectGuide: (id: string) => void;
}

export const DocsSidebar: React.FC<DocsSidebarProps> = ({
  categories,
  activeGuideId,
  onSelectGuide,
}) => {
  return (
    <aside style={{
      position: 'sticky',
      top: '65px',
      height: 'calc(100vh - 65px)',
      overflowY: 'auto',
      borderRight: '1px solid var(--border-color, rgba(129, 140, 248, 0.2))',
      background: 'var(--gradient-sidebar, linear-gradient(180deg, var(--bg-card, #0e1026) 0%, var(--bg-secondary, #070814) 100%))',
      padding: '1.75rem 1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    }}>
      {Object.entries(categories).map(([catTitle, guides]) => (
        <nav key={catTitle} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--text-secondary, #94a3b8)',
            paddingLeft: '0.5rem',
            marginBottom: '0.25rem',
            display: 'block',
          }}>
            {catTitle}
          </span>

          {guides.map((g) => {
            const isActive = g.id === activeGuideId;
            return (
              <button
                key={g.id}
                onClick={() => onSelectGuide(g.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius-md, 8px)',
                  background: isActive ? 'var(--color-primary-light, rgba(129, 140, 248, 0.15))' : 'transparent',
                  border: isActive ? '1px solid var(--border-color, rgba(129, 140, 248, 0.2))' : '1px solid transparent',
                  color: isActive ? 'var(--color-primary, #818cf8)' : 'var(--text-primary, #f8fafc)',
                  fontSize: '0.825rem',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast, 0.15s ease)',
                }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {g.title}
                </span>
                {isActive && <ChevronRight size={16} style={{ flexShrink: 0, marginLeft: '0.5rem' }} />}
              </button>
            );
          })}
        </nav>
      ))}
    </aside>
  );
};
