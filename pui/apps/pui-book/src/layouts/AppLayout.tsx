'use client';

import React, { useState } from 'react';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { InspectorDrawer } from './InspectorDrawer';

interface AppLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentPath,
  onNavigate,
  searchQuery,
  onSearchChange,
  children,
}) => {
  const [inspectorOpen, setInspectorOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--phi-color-background)' }}>
      <AppHeader
        onOpenInspector={() => setInspectorOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />
      <div style={{ display: 'flex', flex: 1 }}>
        <AppSidebar currentPath={currentPath} onNavigate={onNavigate} />
        <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
          {children}
        </div>
      </div>
      <InspectorDrawer isOpen={inspectorOpen} onClose={() => setInspectorOpen(false)} />
    </div>
  );
};
