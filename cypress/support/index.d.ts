declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to ... add your description here
     */

    visitPath(path: string): Chainable<Element>
    checkUrl(param: string): Chainable<Element>
  }
}
