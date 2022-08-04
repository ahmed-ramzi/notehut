import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  clearScreen: false,
  server: {
    port: 8080,
    strictPort: true,
  },
  envPrefix: ["VITE_", "TAURI_"],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  build: {
    target: ["es2021", "chrome97", "safari13"],
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  define: {
    "process.env": {},
  },
})
