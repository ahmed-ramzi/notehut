import { defineConfig } from "cypress"

module.exports = defineConfig({
  videoUploadOnPasses: false,
  viewportHeight: 844,
  viewportWidth: 390,
  chromeWebSecurity: false,
  defaultCommandTimeout: 5000,
  pageLoadTimeout: 20000,
  e2e: {
    defaultCommandTimeout: 20000,
  },
})
