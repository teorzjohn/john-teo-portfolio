import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  // This portfolio is published at the root of johnteo.com.
  base: '/',
  plugins: [react()],
}));
