export default class Helpers {
  urlContains(value: string) {
    cy.url().should("include", value)
  }
  urlDoesNotContains(value: string) {
    cy.url().should("not.include", value)
  }
}
