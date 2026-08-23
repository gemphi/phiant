import React from 'react';
import ReactDOM from 'react-dom/client';
import { PuiProvider } from '@pui/components';
import App from './App';
import '@pui/components/tokens/tokens.scss';
import '@pui/components/styles/core.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PuiProvider defaultTheme="system" defaultBrand="foundry">
      <App />
    </PuiProvider>
  </React.StrictMode>
);
