import HomePage from "../pageObjects/HomePage"
import Helpers from "../support/helpers"
import LoginPage from "../pageObjects/LoginPage"

describe("Logout test", () => {
  const homePage = new HomePage()
  const helpers = new Helpers()
  const loginPage = new LoginPage()
  it("should Logout from app", (): void => {
    homePage.visit()
    helpers.urlContains(homePage.path)
    homePage.getNavMenuBtn().click()
    homePage.getLogoutBtn().click()
    helpers.urlContains(loginPage.path)
  })
})
