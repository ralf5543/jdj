import { defineConfig, loadEnv } from 'vite';
/// <reference types="vitest" />
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react({ jsxRuntime: 'classic' })],
    test: {
      globals: true,
      environment: 'jsdom',
    },
    define: {
      'process.env.VITE_API_KEY': JSON.stringify(env.VITE_API_KEY),
    },
  };
});
