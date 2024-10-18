describe('Form Authentification; fill a form to log in', () => {
/* The page has a form to fill in to log into another page. Wrong info generates an error.
 * Correct info are tomsmith for username and SuperSecretPassword! for password.
 * We do not test if it's case sensitive, that would be an unit test.
 */
  it('Form Auth', () => {
    //goto page and asserts correct page
    cy.visit('login').get('h2').contains("Login")
    //fill the form
    cy.get('#username').type("tomsmith")
    cy.get('#password').type("SuperSecretPassword!")
    //send the form
    cy.get('.radius').click()
    //assert we are in
    cy.get('h2').contains("Secure Area")
  })

  it('Form Auth Error', () => {
    //goto page and asserts correct page
    cy.visit('login').get('h2').contains("Login")
    //fill the form
    cy.get('#username').type("toto")
    cy.get('#password').type("popo")
    //send the form
    cy.get('.radius').click()
    //assert the error
    cy.get('#flash').should('be.visible')
  })
})