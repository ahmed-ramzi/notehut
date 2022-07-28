import { cg } from "../support/methods"
const nav = ".nh-hamburger"
const logout = ".nh-logout"

describe("Logout Test", () => {
  it("Logout", (): void => {
    cy.visitPath("")
    cy.checkUrl("")

    cg(nav).click()
    cg(logout).click()
    cy.checkUrl("login")
  })
})
