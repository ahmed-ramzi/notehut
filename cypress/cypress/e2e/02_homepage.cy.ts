import HomePage from "../pageObjects/HomePage"
import Helpers from "../support/helpers"

describe("Home page test", () => {
  const homePage = new HomePage()
  const helpers = new Helpers()

  it("should load page properly", (): void => {
    homePage.visit()
    helpers.urlContains(homePage.path)
    homePage.isLoadedProperly()
  })

  it("side menu should be rendered properly", (): void => {
    homePage.getNavMenuBtn().click()
    helpers.urlContains(homePage.path)
    homePage.isSideMenuRenderedProperly()
    homePage.getCloseMenuBtnn().click()
    helpers.urlContains(homePage.path)
    homePage.isLoadedProperly()
  })
})
