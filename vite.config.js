import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'app',
  publicDir: path.resolve(__dirname, 'public'),
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '\\.(css|less|scss)$': path.resolve(__dirname, 'node_modules/identity-obj-proxy'),
    },
  },
  css: {
    devSourcemap: true,
  },
  server: {
    port: 8080,
    open: true,
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname, 'vitest.setup.js')],
    include: ['**/*.{test,spec}.{js,jsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['**/*.{js,jsx}'],
      exclude: ['**/node_modules/**', '**/tests/**', '**/*.test.{js,jsx}', '**/*.spec.{js,jsx}'],
    },
  },
});
