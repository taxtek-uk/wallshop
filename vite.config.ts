import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  root: 'client',
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ["8081-ik3eo5j9uhqzevw5a3dmn-9ce7ec25.manusvm.computer", "8082-ik3eo5j9uhqzevw5a3dmn-9ce7ec25.manusvm.computer"]
  },
  build: {
    outDir: "dist/spa",
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
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log', 'console.info'] : []
      }
    },
    // Enable source maps for debugging
    sourcemap: mode === 'development'
  },
  plugins: [
    react(), 
    // Only use express plugin in development and when not in Vercel
    mode === 'development' && !process.env.VERCEL && expressPlugin(),
    // Bundle analyzer
    mode === 'production' && visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  // Optimize dependencies
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

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      // Dynamically import the server creation function to avoid build-time issues
      import("./server").then(({ createServer }) => {
        const app = createServer();
        // Add Express app as middleware to Vite dev server
        server.middlewares.use(app);
      }).catch(err => {
        console.warn('Could not load server module:', err.message);
      });
    },
  };
}
