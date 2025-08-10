import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ["8081-ik3eo5j9uhqzevw5a3dmn-9ce7ec25.manusvm.computer", "8082-ik3eo5j9uhqzevw5a3dmn-9ce7ec25.manusvm.computer"]
  },
  build: {
    outDir: "dist/spa",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React libraries
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
            return 'react-vendor';
          }
          
          // UI libraries
          if (id.includes('framer-motion') || id.includes('lucide-react')) {
            return 'ui-vendor';
          }
          
          // Radix UI components
          if (id.includes('@radix-ui')) {
            return 'radix-vendor';
          }
          
          // Query library
          if (id.includes('@tanstack/react-query')) {
            return 'query-vendor';
          }
          
          // Three.js and related
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three-vendor';
          }
          
          // Large utility libraries
          if (id.includes('date-fns') || id.includes('clsx') || id.includes('class-variance-authority')) {
            return 'utils-vendor';
          }
          
          // Node modules (other vendors)
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Optimize asset naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    // Enable minification with optimized settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.warn'] : [],
        passes: 2,
        unsafe_arrows: true,
        unsafe_methods: true,
        unsafe_proto: true
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    // Enable source maps for debugging
    sourcemap: mode === 'development',
    // Optimize CSS
    cssMinify: true,
    // Enable compression
    reportCompressedSize: true,
    // Target modern browsers for better optimization
    target: ['es2020', 'chrome80', 'firefox78', 'safari14', 'edge88']
  },
  plugins: [
    react(), 
    expressPlugin(),
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
      '@tanstack/react-query',
      'clsx',
      'class-variance-authority',
      'tailwind-merge'
    ],
    exclude: [
      'three',
      '@react-three/fiber',
      '@react-three/drei'
    ]
  },
  // Enable experimental features for better performance
  esbuild: {
    target: 'es2020',
    legalComments: 'none',
    minifyIdentifiers: mode === 'production',
    minifySyntax: mode === 'production',
    minifyWhitespace: mode === 'production'
  }
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
