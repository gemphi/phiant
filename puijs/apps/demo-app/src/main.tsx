import React from 'react';
import ReactDOM from 'react-dom/client';
import { PuiProvider } from '@phient/pui';
import App from './App';
import '@phient/pui/tokens/tokens.scss';
import '@phient/pui/styles/core.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PuiProvider defaultTheme="system" defaultBrand="foundry">
      <App />
    </PuiProvider>
  </React.StrictMode>
);
