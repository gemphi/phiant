import React from 'react';
import ReactDOM from 'react-dom/client';
import { PuiProvider } from '@phi/pui';
import App from './App';
import '../../src/tokens/tokens.scss';
import '../../src/styles/core.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PuiProvider defaultTheme="system" defaultBrand="foundry">
      <App />
    </PuiProvider>
  </React.StrictMode>
);
