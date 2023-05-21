import LoginPage from "../pageObjects/LoginPage"
import Helpers from "../support/helpers"
import GroupsPage from "../pageObjects/GroupsPage"

describe("Login Test", () => {
  const loginPage = new LoginPage()
  const groupsPage = new GroupsPage()
  const helpers = new Helpers()
  before(() => {
    cy.clearIndexedDB()
  })
  it("should not access the groups pages", () => {
    groupsPage.visit()
    helpers.urlDoesNotContains(groupsPage.path)
    helpers.urlContains(loginPage.path)
    loginPage.isLoadedProper()
  })

  it("should stop login with wrong credentials", (): void => {
    loginPage.getEmail().click().clear().type("test@mail.com")
    loginPage.getPassword().click().clear().type("1234567bm")
    loginPage.getSubmitBtn().click()
    loginPage.getErrorMsg().should("have.text", "Incorrect Password")
    helpers.urlContains(loginPage.path)
  })

  it("should login with correct credentials", (): void => {
    loginPage.getForm().should("exist")
    loginPage.getEmail().should("exist").click().clear().type(Cypress.env("email"))
    loginPage.getPassword().should("exist").click().clear().type(Cypress.env("password"))
    loginPage.getSubmitBtn().click()
    loginPage.getErrorMsg().should("not.exist")
    helpers.urlDoesNotContains(loginPage.path)
  })
})
