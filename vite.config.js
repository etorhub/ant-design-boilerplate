import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'app',
  publicDir: path.resolve(__dirname, 'public'),
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'],
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
});
