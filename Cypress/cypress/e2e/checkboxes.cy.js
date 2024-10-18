describe('Checkboxes, there are 2 boxes, second is checked', () => {
  it('Checkboxes', () => {
    //goto page and asserts correct page
    cy.visit('checkboxes').get('h3').contains("Checkboxes")
    //asserts both boxes are present and that second is checked
    cy.get('form input:first').should('not.be.checked')
    cy.get('form input:nth-child(3)').should('be.checked')
    //reverse the checks then assert them
    cy.get('form input:first').click().should('be.checked')
    cy.get('form input:nth-child(3)').click().should('not.be.checked')
  })
})