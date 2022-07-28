import { cg } from "../support/methods"
const form = ".nh-form"
const email = ".nh-email"
const password = ".nh-password"
const submit = ".nh-submit"
const errMsg = ".nh-error-msg"

describe("Login Test", () => {
  before(() => {
    cy.clearIndexedDB()
  })
  it("Login with Wrong Credentials", (): void => {
    cy.visit("")
    cy.checkUrl("login")
    cg(form).should("exist")
    cg(email).should("exist").click().clear().type("test@mail.com")
    cg(password).should("exist").click().clear().type("1234567bm")
    cg(submit).click()
    cg(errMsg).should("have.text", "Incorrect Password")
  })

  it("Login with Correct Credentials", (): void => {
    cg(form).should("exist")
    cg(email).should("exist").click().clear().type("test@mail.com")
    cg(password).should("exist").click().clear().type("aya3vkq-rqr2twc_JRX")
    cg(submit).click()
    cy.checkUrl("")
    cg(".nh-header")
  })
})
