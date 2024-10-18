describe('Add/Remove element; page should allow adding and deleting clickable buttons', () => {
/* For this test, we test the functionality of adding or removing an element. We have by default one addition button
 * with no delete buttons. We therefore test that there are no delete buttons, add some buttons, delete them, 
 * while also asserting that the buttons we expect are present.
 * The test fails if the buttons expected are not present.
 */
  it('Add/Remove', () => {
    //goto page and assert correct page
    cy.visit('add_remove_elements/').get('h3').contains("Add/Remove Elements")

    //assert Delete button doesn't exists
    cy.get('[class=added-manually]').should('not.exist')
    //assert Add Element button exists and click on it
    cy.get('button').contains("Add Element").click()

    //asserts both buttons exist and add new button
    cy.get('[class=added-manually]')
    cy.get('button').contains("Add Element").click()

    // asserts both buttons exists and delete first element
    cy.get('[class=added-manually]:nth-child(2)')
    cy.get('[class=added-manually]:first').click()

    // asserts both buttons exists and delete remaining element
    cy.get('button').contains("Add Element")
    cy.get('[class=added-manually]').click()

    // assert only Add Element exists
    cy.get('button').contains("Add Element")

  })
})