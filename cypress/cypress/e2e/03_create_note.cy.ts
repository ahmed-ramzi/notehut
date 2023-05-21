import HomePage from "../pageObjects/HomePage"
import Helpers from "../support/helpers"
import NotesEditingPage from "../pageObjects/NotesEditingPage"

describe.skip("Note creation test", () => {
  const homePage = new HomePage()
  const helpers = new Helpers()
  const notesEditingPage = new NotesEditingPage()

  const noteTitle = "Cypress"
  const noteText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

  // before("should load home page properly", () => {
  //   homePage.visit()
  //   helpers.urlContains(homePage.path)
  //   // homePage.isLoadedProperly()
  // })

  it("changing user agent", () => {
    cy.visit("/", {
      onBeforeLoad: (win) => {
        Object.defineProperty(win.navigator, "userAgent", {
          value: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
        })
      },
    })
  })
  it("should create a new note", () => {
    // homePage.getCreateNoteBtn().click()
    // helpers.urlContains(notesEditingPage.path)
    // notesEditingPage.getTitleArea().click().type(noteTitle)
    // notesEditingPage.getTextArea().click().type(noteText)
    // notesEditingPage.getBackBtn().click()
    // helpers.urlDoesNotContains(notesEditingPage.path)

    homePage.getNoNotesView().should("not.exist")
    homePage.getNoteCard().should("have.length", 1)
  })

  it("should delete the note", () => {
    homePage.getNoteCard().trigger("touchstart")
  })
})
