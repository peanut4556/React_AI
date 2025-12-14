import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ["defaults", "not IE 11", "iOS >= 12", "Safari >= 12"],
      modernPolyfills: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    target: ["es2018"],
  },
  server: {
    port: 3000,
    proxy: {
      "/search": {
        target: "http://localhost:8000",
        changeOrigin: true,
        // 确保不缓存、保持流式传输
        headers: {
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      },
      "/deep-research": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
