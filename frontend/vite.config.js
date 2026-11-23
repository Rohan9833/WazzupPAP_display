import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss()],
    server: {
      // In development, /api calls are proxied to the Express backend.
      proxy: {
        '/api': {
          target: env.VITE_DEV_API_PROXY || 'http://localhost:5000',
          changeOrigin: true,
        },
      },
    },
    preview: {
      proxy: { '/api': { target: env.VITE_DEV_API_PROXY || 'http://localhost:5000', changeOrigin: true } },
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
    },
  };
});
