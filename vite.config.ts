import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';
import express from 'express';
import fs from 'fs';

export default defineConfig(({ mode }) => ({
  root: 'client', // index.html now in /client
  server: {
    proxy: {
    "/api": "http://localhost:3000"
  },
    host: '::',
    port: 8080
  },
  build: {
    outDir: 'dist', // Output folder relative to root
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'radix-vendor': [
            '@radix-ui/react-tooltip',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-accordion',
            '@radix-ui/react-tabs',
            '@radix-ui/react-select',
            '@radix-ui/react-slider',
            '@radix-ui/react-switch',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-label',
            '@radix-ui/react-separator',
            '@radix-ui/react-progress',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-toast',
            '@radix-ui/react-popover',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-menubar',
            '@radix-ui/react-context-menu',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-avatar',
            '@radix-ui/react-aspect-ratio',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group'
          ],
          'query-vendor': ['@tanstack/react-query'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          // Page chunks
          'smart-walls': ['./client/pages/SmartWalls.tsx'],
          'smart-devices': ['./client/pages/SmartDevices.tsx'],
          'wall-panels': [
            './client/pages/WallPanels.tsx',
            './client/pages/WPCWallPanels.tsx',
            './client/pages/AntiCollisionWallPanels.tsx',
            './client/pages/WPCSplicingBoards.tsx'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 500,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs:
          mode === 'production'
            ? ['console.log', 'console.info']
            : []
      }
    },
    sourcemap: mode === 'development'
  },
  plugins: [
    react(),
    // Dev-only Express server
    mode === 'development' &&
      !process.env.VERCEL && {
        name: 'express-server',
        async configureServer(server) {
          // Load the Express app from TS using Vite's SSR loader (works with .ts files)
          const mod = await server.ssrLoadModule(path.resolve(__dirname, './server/api/index.ts'));
          const apiApp = typeof mod.createServer === 'function' ? mod.createServer() : null;
          if (apiApp) {
            // Only route /api/* requests to the Express app; let Vite handle everything else
            server.middlewares.use((req, res, next) => {
              if (req.url && req.url.startsWith('/api')) {
                return (apiApp as any)(req, res, next);
              }
              next();
            });
          }
        }
      },
    // Bundle analyzer
    mode === 'production' &&
      visualizer({
        filename: 'dist/stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true
      })
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client'),
      '@shared': path.resolve(__dirname, './shared')
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      '@tanstack/react-query'
    ]
  }
}));
