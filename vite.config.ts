import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(async ({ mode }) => {
  const plugins: any[] = [react()];

  if (mode === "development") {
    try {
      const mod: any = await import("lovable-tagger");
      const plugin = mod.default ?? mod.lovableTagger;
      if (plugin) {
        plugins.push(plugin());
      }
    } catch (err) {
      console.warn("⚠️ lovable-tagger could not be loaded in dev mode:", err);
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      exclude: ["lovable-tagger"],
    },
  };
});