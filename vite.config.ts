import { defineConfig } from 'vite';

export default defineConfig({
  base: '/flow-designer/',
  server: {
    port: 1000,
    host: true
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
