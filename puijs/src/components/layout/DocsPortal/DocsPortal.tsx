import React, { useState, useMemo } from 'react';
import type { DocsPortalProps, DocGuide } from './types';
import { DocsNavbar } from './DocsNavbar';
import { DocsSidebar } from './DocsSidebar';
import { DocsArticle } from './DocsArticle';
import { DocsTOC } from './DocsTOC';

export const DocsPortal: React.FC<DocsPortalProps> = ({
  guides,
  initialGuideId = 'quickstart',
  version = 'v0.2.2',
  brandTitle = 'Phiano Docs',
  onBackToApp,
  backToAppLabel = 'Open Cockpit',
  dark,
  onToggleDark,
  className = '',
}) => {
  const [activeGuideId, setActiveGuideId] = useState<string>(initialGuideId);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const cats: Record<string, DocGuide[]> = {};
    guides.forEach((d) => {
      if (!cats[d.category]) cats[d.category] = [];
      cats[d.category].push(d);
    });
    return cats;
  }, [guides]);

  const activeGuide = useMemo(() => {
    return guides.find((d) => d.id === activeGuideId) || guides[0];
  }, [guides, activeGuideId]);

  const currentIndex = useMemo(() => {
    return guides.findIndex((d) => d.id === activeGuideId);
  }, [guides, activeGuideId]);

  const prevGuide = currentIndex > 0 ? guides[currentIndex - 1] : undefined;
  const nextGuide = currentIndex < guides.length - 1 ? guides[currentIndex + 1] : undefined;

  return (
    <article className={`pui-docs-portal ${className}`} style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: 'var(--gradient-bg, linear-gradient(180deg, var(--bg-primary, #030307) 0%, var(--bg-secondary, #070814) 100%))',
      color: 'var(--text-primary, #f8fafc)',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
    }}>
      <DocsNavbar
        brandTitle={brandTitle}
        version={version}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectGuide={setActiveGuideId}
        onBackToApp={onBackToApp}
        backToAppLabel={backToAppLabel}
        dark={dark}
        onToggleDark={onToggleDark}
      />

      <section style={{
        display: 'grid',
        gridTemplateColumns: '280px minmax(0, 1fr) 260px',
        flex: 1,
        width: '100%',
      }}>
        <DocsSidebar
          categories={categories}
          activeGuideId={activeGuide.id}
          onSelectGuide={setActiveGuideId}
        />

        <DocsArticle
          guide={activeGuide}
          prevGuide={prevGuide}
          nextGuide={nextGuide}
          onSelectGuide={setActiveGuideId}
        />

        <DocsTOC />
      </section>
    </article>
  );
};

export const Docs = DocsPortal;
export const DocsPage = DocsPortal;
export default DocsPortal;
