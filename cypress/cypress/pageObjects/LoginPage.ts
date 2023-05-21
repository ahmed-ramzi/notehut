export default class LoginPage {
  public path = "/login"

  private form = "[data-test='loginForm']"
  private email = "[data-test='formEmail']"
  private password = "[data-test='formPassword']"
  private submitButton = "[data-test='submitBtn']"
  private errMsg = "[data-test='errorMsg']"

  visit() {
    cy.visit(this.path)
  }

  getForm() {
    return cy.get(this.form)
  }
  getEmail() {
    return cy.get(this.email)
  }
  getPassword() {
    return cy.get(this.password)
  }
  getSubmitBtn() {
    return cy.get(this.submitButton)
  }
  getErrorMsg() {
    return cy.get(this.errMsg)
  }

  isLoadedProper() {
    this.getForm().should("exist").should("be.visible")
    this.getEmail().should("exist").should("be.visible")
    this.getPassword().should("exist").should("be.visible")
    this.getSubmitBtn().should("exist").should("be.visible")
    this.getErrorMsg().should("not.exist")
  }
}
