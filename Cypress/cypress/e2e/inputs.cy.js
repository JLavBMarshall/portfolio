describe('Inputs; accepts only numbers', () => {
/* A very straightforward test; input takes numbers, not letters
 * Test fails if the input takes letters, or doesn't take numbers
 */  

  it('Inputs', () => {
    //goto page and asserts correct page
    cy.visit('inputs').get('h3').contains("Inputs")
    //test non-numbers
    cy.get('input').type("Hello").should('not.have.value')
    //test numbers
    cy.get('input').type(123).should('have.value', 123)
    //and that's it
  })
})