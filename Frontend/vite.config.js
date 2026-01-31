import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react()],
    define: {
      ...Object.entries(env).reduce((acc, [key, val]) => {
        if (key.startsWith('VITE_')) {
          acc[`import.meta.env.${key}`] = JSON.stringify(val);
          acc[`process.env.${key}`] = JSON.stringify(val);
        }
        return acc;
      }, {})
    },
    server: {
      port: 3000,
      open: true,
      cors: true,
    },
    preview: {
      port: 3000,
      open: true
    },
    base: '/', // Changed to root-relative path for Vercel
    build: {
      target: 'es2020', // Add this for better browser compatibility
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]'
        }
      }
    }
  });
};