import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves this repository at /jude-yap-aerospace-portfolio/.
// Keep the base explicit so static assets and the Vite bundle resolve correctly.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/jude-yap-aerospace-portfolio/",
  root: path.resolve(import.meta.dirname, "client"),
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client/src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    assetsDir: "assets",
    sourcemap: false,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
  },
});
