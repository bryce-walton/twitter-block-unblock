// Config
let username = 'username'
let password = 'password'
let mobile = 'mobile'
let numberOfUsersToSoftBlock = 50
let url = `https://www.twitter.com/${username}/followers`
// Dom references
let followersButton: string, loginPopup: string;
followersButton = loginPopup = '.r-13awgt0 > :nth-child(2) > .css-4rbku5 > .r-m0bqgq > .css-901oao'
let usernameField = '.r-p1n3y5 > :nth-child(1) > .r-16y2uox > .css-901oao > .r-30o5oe'
let passwordField = ':nth-child(7) > .r-1bs4hfb > :nth-child(1) > .r-16y2uox'
let secondPasswordField = '.r-1bs4hfb > :nth-child(1) > .r-16y2uox > .css-901oao > .r-30o5oe'
let loginButtonOnModal = '.r-ku1wi2 > .r-urgr8i > .r-1awozwy'

beforeEach(()=> {
  Cypress.on('uncaught:exception', () => { return false })
  // Navigate and login
  cy.visit(url)
  cy.get(followersButton).click()
  // Use jQuery selector to check if login popup is present
  if (Cypress.$(loginPopup)) {
    // Username login (always required)
    cy.get(loginButtonOnModal).click()
    cy.get(usernameField).type(username)
    cy.get(passwordField).type(`${password}{enter}`)
    // Phone login (conditional)
    if(!Cypress.$('.r-14lw9ot')) {
      cy.get(usernameField).type(`${mobile}`)
      cy.get(secondPasswordField).type(`${password}{enter}`)
    }
    cy.get(followersButton).click()
  }
})

it(`should block and unblock ${numberOfUsersToSoftBlock} followers`, () => {
  let count = 0;
  // (Get followers list, block & unblock user at position (count)) * numberOfUsersToDelete
  for (var i = 0; i < numberOfUsersToSoftBlock; i++) {
    cy.get('[data-testid=UserCell]').eq(count).click('top')
    cy.get('[data-testid=userActions] > .r-1awozwy').click()
    cy.get('[data-testid=block]').click()
    cy.get('[data-testid=confirmationSheetConfirm] > .r-1awozwy').click()
    cy.get('[data-testid=toast] > .css-1dbjc4n > .css-18t94o4 > .css-901oao').click()

    // Refresh list after blocking/unblocking 10 users
    if ((numberOfUsersToSoftBlock + 1) % 10 == 0) {
      count = 0;
      cy.visit(url)
    } else {
      count++
      cy.go('back')
    }
  }
})