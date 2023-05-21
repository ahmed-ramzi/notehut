export default class NotesEditingPage {
  public path = "/note"

  private backBtn = "[data-test='actionBackBtn']"
  private titleArea = "[data-test='titleArea']"
  private textArea = "[data-test='textArea']"

  visit(): void {
    cy.visit(this.path)
  }

  getBackBtn() {
    return cy.get(this.backBtn)
  }
  getTitleArea() {
    return cy.get(this.titleArea)
  }
  getTextArea() {
    return cy.get(this.textArea)
  }
}
