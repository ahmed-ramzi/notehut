declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to ... add your description here
     */

    clearIndexedDB(): Promise<void>
  }
}
