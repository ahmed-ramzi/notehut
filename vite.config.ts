import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  logLevel: "info",
  optimizeDeps: {
    include: ["@yeger/vue-masonry-wall"],
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  define: {
    "process.env": {},
  },
})
