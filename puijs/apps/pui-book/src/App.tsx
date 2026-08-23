'use client';

import React, { useState } from 'react';
import { AppLayout } from './layouts/AppLayout';
import { HomePage } from './pages/HomePage';
import { ComponentsPage } from './pages/ComponentsPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { TokensPage } from './pages/TokensPage';
import { EcosystemPage } from './pages/EcosystemPage';
import { CommercePage } from './pages/CommercePage';
import { DataEnginePage } from './pages/DataEnginePage';

export default function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [searchQuery, setSearchQuery] = useState('');

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={setCurrentPath} />;
      case '/tokens':
        return <TokensPage />;
      case '/ecosystem':
        return <EcosystemPage />;
      case '/data-engine':
        return <DataEnginePage />;
      case '/playground':
        return <PlaygroundPage />;
      case '/components/primitives':
        return <ComponentsPage category="primitives" />;
      case '/components/feedback':
        return <ComponentsPage category="feedback" />;
      case '/components/forms':
        return <ComponentsPage category="forms" />;
      case '/components/data-display':
        return <ComponentsPage category="data-display" />;
      case '/components/overlays':
        return <ComponentsPage category="overlays" />;
      case '/components/commerce':
        return <CommercePage />;
      default:
        return <HomePage onNavigate={setCurrentPath} />;
    }
  };

  return (
    <AppLayout
      currentPath={currentPath}
      onNavigate={setCurrentPath}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    >
      {renderPage()}
    </AppLayout>
  );
}
