import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@phient/pui': path.resolve(__dirname, '../../src'),
    },
  },
  server: {
    port: 3002,
  },
});
