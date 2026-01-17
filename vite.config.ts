import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import { getComponentAliases } from "./config/component-aliases";

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "SOURCEMAP_ERROR") {
          return;
        }
        warn(warning);
      },
    },
  },
  esbuild: {
    sourcemap: false,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    exclude: [...configDefaults.exclude, "samples/**"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./packages"),
      "@react-cupertino-ui/shared": path.resolve(__dirname, "./packages/shared"),
      "@globalstyles": path.resolve(__dirname, "./app/globals.css"),
      ...getComponentAliases(),
    },
  },
});
