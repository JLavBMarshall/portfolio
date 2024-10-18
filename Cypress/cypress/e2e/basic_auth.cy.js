describe('Basic Authentification; pop-up appears before loading the page asking for user/password, which are both admin', () => {
/* A simple test of accessing a page with authentification information passed into it; Cypress handles the
 * authentification without further input. We then assert that the expected page title is present, as it
 * means we have reached the page.
 * The test fails if we didn't logged into the page or the expected title isn't present.
 */
  it('Basic Auth', () => {
    //visit page with login info, both username and password are set to admin
    cy.visit('basic_auth/', {
      auth: {
        username: 'admin',
        password: 'admin',
      },
    })
    //assert we loaded the correct page
    cy.get('h3').contains("Basic Auth")
  })
})