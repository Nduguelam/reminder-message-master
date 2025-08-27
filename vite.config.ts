import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 8080
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["lovable-tagger"],
  },
  define: {
    global: 'globalThis',
  },
});