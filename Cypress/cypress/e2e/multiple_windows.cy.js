describe('Multiple Windows; a page opened in a new window/tab', () => {
/* A test where we open a new tab.
 * As Cypress actually opens a new tab outside of its testing port, we force Cypress to
 * open the new page in the current viewport with cy.invoke('removeAttr', 'target')
 * (as recommended in the documentation https://docs.cypress.io/api/commands/invoke#Function-with-Arguments)
 * Fails if we don't go to the new tab.
 */
  it('New Tab', () => {
    //goto page and asserts correct page
    cy.visit('windows').get('h3').contains("Opening a new window")
    //force the link to open in the same window
    cy.contains("Click Here").invoke('removeAttr', 'target').click()
    //and assert we got there
    .url().should('include', '/windows/new').get('h3').contains("New Window")
    //then navigate back and assert we went to the same previous page
    cy.go('back')
    cy.contains("Click Here").should('be.visible')
  })
})