import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts({ skipDiagnostics: false, include: ["src"], exclude: ["src/**/*.test.*"], outputDir: "dist/dts" })],
  build: {
    minify: true,
    sourcemap: true,
    rollupOptions: {
      input: "src/index.ts",
      preserveEntrySignatures: "strict",
      external: [],
      output: [
        {
          dir: "dist/esm",
          format: "esm",
          exports: "named",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
        },
        {
          dir: "dist/umd",
          format: "umd",
          name: "Snoho",
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
        },
        {
          dir: "dist/iife",
          format: "iife",
          name: "Snoho",
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
        },
      ],
    },
  },
});
