import React from 'react';
import { PuiProvider } from '@phient/pui';
import { InspectorProvider } from './components/inspector';
import { AppLayout } from './components/AppLayout';
import { initStore } from './pageData/store/services';

initStore();

export default function App() {
  return (
    <PuiProvider defaultTheme="system">
      <InspectorProvider>
        <AppLayout />
      </InspectorProvider>
    </PuiProvider>
  );
}
