describe('Hovers; a page where information shows when you hover', () => {
/* In this test, we hover icons to show 2 hidden elements.
 * As Cypress doesn't have a hover function, we invoke the element to show (mouseover isn't enough)
 * There are plugins for visual testing, but this repo is only base Cypress
 * The test fail if the elements' visibility is not as expected
 */
  it('Hovers', () => {
    //goto page and asserts correct page
    cy.visit('hovers').get('h3').contains("Hovers")
    //assert the hidden elements are not visible
    cy.get('.figcaption').should('not.be.visible')
    //make the first one visible
    .first().invoke('show')
    //assert so
    .contains('name: user1').should('be.visible')
  })
})