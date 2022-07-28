import { defineConfig } from "cypress"

export default defineConfig({
  video: true,
  videoUploadOnPasses: false,
  viewportHeight: 1080,
  viewportWidth: 1920,
  chromeWebSecurity: false,
  defaultCommandTimeout: 25000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})