import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'puijs': path.resolve(__dirname, '../../src'),
      '@pui/components': path.resolve(__dirname, '../../src'),
    },
  },
  server: {
    port: 3003,
  },
});
