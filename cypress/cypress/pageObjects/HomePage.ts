export default class HomePage {
  public path = "/"

  private navMenu = "[data-test='navMenuBtn']"
  private logoutBtn = "[data-test='logoutBtn']"
  private headerTitle = "[data-test='headerTitle']"
  private userAvatar = '[data-test="userAvatar"]'
  private noNotesView = '[data-test="noNotesView"]'
  private createNoteBtn = '[data-test="createNoteBtn"]'
  private footerNav = '[data-test="footerNav"]'
  private sideMenu = '[data-test="sideMenu"]'
  private notesWall = '[data-test="notesWall"]'
  private noteCard = '[data-test="noteCard"]'
  private deleteNoteBtn = '[data-test="deleteNoteBtn"]'

  private sideMenuItems = {
    personalNotesBtn: '[data-test="personalNotesBtn"]',
    notificationsBtn: '[data-test="notificationsBtn"]',
    settingsBtn: '[data-test="settingsBtn"]',
    createGroupBtn: '[data-test="createGroupBtn"]',
    closeMenuBtn: '[data-test="closeMenuBtn"]',
  }
  visit(): void {
    cy.visit(this.path)
  }

  getNavMenuBtn() {
    return cy.get(this.navMenu)
  }

  getLogoutBtn() {
    return cy.get(this.logoutBtn)
  }

  getHeaderTitle() {
    return cy.get(this.headerTitle)
  }
  getUserAvatar() {
    return cy.get(this.userAvatar)
  }
  getNoNotesView() {
    return cy.get(this.noNotesView)
  }
  getCreateNoteBtn() {
    return cy.get(this.createNoteBtn)
  }
  getFooterNav() {
    return cy.get(this.footerNav)
  }
  getSideMenu() {
    return cy.get(this.sideMenu)
  }

  // Notes Stuf
  getNotesWall() {
    return cy.get(this.notesWall)
  }
  getNoteCard() {
    return cy.get(this.noteCard)
  }
  getDeleteNoteBtn() {
    return cy.get(this.deleteNoteBtn)
  }

  // SideMenu Items
  getPersonalNotesBtn() {
    return cy.get(this.sideMenuItems.personalNotesBtn)
  }
  getNotificationsBtn() {
    return cy.get(this.sideMenuItems.notificationsBtn)
  }
  getSettingsBtn() {
    return cy.get(this.sideMenuItems.settingsBtn)
  }
  getCreateGroupBtn() {
    return cy.get(this.sideMenuItems.createGroupBtn)
  }
  getCloseMenuBtnn() {
    return cy.get(this.sideMenuItems.closeMenuBtn)
  }

  isLoadedProperly() {
    this.getHeaderTitle().should("exist").should("be.visible")
    this.getUserAvatar().should("exist").should("be.visible")
    this.getNoNotesView().should("exist").should("be.visible")
    this.getCreateNoteBtn().should("exist").should("be.visible")
    this.getFooterNav().should("exist").should("be.visible")
    this.getNavMenuBtn().should("exist").should("be.visible")
  }

  isSideMenuRenderedProperly() {
    this.getSideMenu().should("exist").should("be.visible")
    this.getPersonalNotesBtn().should("exist").should("be.visible")
    this.getNotificationsBtn().should("exist").should("be.visible")
    this.getSettingsBtn().should("exist").should("be.visible")
    this.getCreateGroupBtn().should("exist").should("be.visible")
    this.getCloseMenuBtnn().should("exist").should("be.visible")
  }
}
