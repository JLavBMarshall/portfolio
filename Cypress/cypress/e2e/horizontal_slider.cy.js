describe('Horizontal Slider; a bar with values', () => {
/* In this test, we select a slider and move it. There is a value on the right that increments by 0.5 per tick.
 * This test fails if the action isn't performed or if the value is incorrect.
 */
  it('Horizontal Slider Key', () => {
    //goto page and asserts correct page
    cy.visit('horizontal_slider').get('h3').contains("Horizontal Slider")
    //move the slider 4 times -> we expect a value of 2
    cy.get('input').focus().type(Cypress._.repeat('{rightarrow}-{enter}',4)).trigger('change')
    //assert we have 2
     .get('#range').contains("2")
  })

  it('Horizontal Silder Slider Click', () => {
    //goto page and asserts correct page
    cy.visit('horizontal_slider').get('h3').contains("Horizontal Slider")
    //click on the value 2
    cy.get('input').invoke('val', '2').trigger('change')
    //assert the value
      .get('#range').should('have.text', '2')
  })
})