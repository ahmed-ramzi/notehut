export default class GroupsPage {
  public path = "/groups"

  visit(): void {
    cy.visit(this.path)
  }
}
