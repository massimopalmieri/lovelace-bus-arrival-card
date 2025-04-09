import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    host: "0.0.0.0",
    cors: {
      origin: "*",
      methods: ["GET"],
      allowedHeaders: ["Content-Type"],
    },
  },
  build: {
    outDir: "dist",
    lib: {
      entry: "src/bus-arrival-card.ts",
      formats: ["es"],
      fileName: () => `bus-arrival-card.js`,
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
