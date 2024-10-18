describe('Dropdown; a list with 2 elements', () => {
/* Simple test of a dropdown, we assert it exists, select the first option, assert it was selected
 * then select the second option and assert it was selected.
 * This test fails if dropdown doesn't exist, if the options don't either, or they were not selected.
 */

  it('Dropdown', () => {
    //goto page and asserts correct page
    cy.visit('dropdown').get('h3').contains("Dropdown List")
    //assert dropdown exists and that it's on the default selection
    cy.get('#dropdown option:selected').should('not.have.value')
    //select and assert first option
    cy.get('select').select('1').should('have.value', '1')
    //select and assert second option
    cy.get('select').select('2').should('have.value', '2')
  })
})