describe('Entry Ad; a modal shows on visit', () => {
/* On first vist, we get a modal that we can close.
 * This test fails if there is no modal or that the modal doesn't close.
 */

  it('Entry Ad', () => {
    //goto page and asserts correct page
    cy.visit('entry_ad').get('h3').contains("Entry Ad")
    //assert modal is active
    cy.get('.modal-title').should('be.visible')
    //close it
    cy.get('.modal-footer').contains("Close").click()
    //assert modal is not present
    cy.get('.modal-title').should('not.be.visible')
  })
})