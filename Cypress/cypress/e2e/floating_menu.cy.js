describe('Floating Menu; a menu that floats at the top', () => {
/* A floating menu is a div that stays at the top of the viewport, no matter your position in the page
 * For this test, we scroll down and assert that the menu is still visible.
 * This test fails if the menu is not visible at any point.
 */
  it('Floating Menu', () => {
    //goto page and asserts correct page
    cy.visit('floating_menu').get('h3').contains("Floating Menu")
    // scroll to the bottom of the page
    cy.get('#page-footer').scrollIntoView()
    // check if menu is visible and functioning
    cy.contains("Home").should('be.visible').click()
    // check if the url has the hash ("#about") concatenated to it
    cy.hash().should('contains','#home')
  })
})