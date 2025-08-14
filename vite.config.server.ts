import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "/", // Required for Vercel/static hosting to avoid asset path issues
  build: {
    lib: {
      entry: path.resolve(__dirname, "server/node-build.ts"),
      name: "server",
      fileName: "production",
      formats: ["es"],
    },
    outDir: "dist/server", // Server build output folder
    target: "node22", // Matches latest Vercel Node runtime
    ssr: true, // Enables Server-Side Rendering build
    rollupOptions: {
      external: [
        // Node.js built-ins (don’t bundle)
        "fs",
        "path",
        "url",
        "http",
        "https",
        "os",
        "crypto",
        "stream",
        "util",
        "events",
        "buffer",
        "querystring",
        "child_process",

        // External dependencies to keep external in server build
        "express",
        "cors",
      ],
      output: {
        format: "es",
        entryFileNames: "[name].mjs", // Ensure ESM output for Node 22
      },
    },
    minify: false, // Keep readable for debugging
    sourcemap: true, // Useful for production debugging
    emptyOutDir: true, // Clear old build files before building
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});
