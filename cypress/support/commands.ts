/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// @ts-ignore
let host = document.location.host

/**
 * Lands on a page
 */

Cypress.Commands.add("visitPath", (path: string): void => {
  cy.visit(path || "")
  cy.url().should("include", host + "/" + path || "")
})

/**
 * Checks if URL is same as Page
 */
Cypress.Commands.add("checkUrl", (param: string): void => {
  cy.url().should("include", host + "/" + param)
})
/**
 * Clearing Indexed DB
 */

Cypress.Commands.add("clearIndexedDB", async (): Promise<void> => {
  const databases = await window.indexedDB.databases()

  await Promise.all(
    databases.map(
      ({ name }: IDBDatabaseInfo) =>
        new Promise((resolve, reject) => {
          // @ts-ignore
          const request = window.indexedDB.deleteDatabase(name)

          request.addEventListener("success", resolve)
          // Note: we need to also listen to the "blocked" event
          // (and resolve the promise) due to https://stackoverflow.com/a/35141818
          request.addEventListener("blocked", resolve)
          request.addEventListener("error", reject)
        }),
    ),
  )
})
