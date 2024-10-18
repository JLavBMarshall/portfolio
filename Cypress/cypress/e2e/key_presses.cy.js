describe('Key Presses; a key press detector', () => {
/* While there is an input field, the keypresses are detected even when out of focus
 * Test fails if the keypress is not detected
 */  
  it('Key Presses', () => {
    //goto page and asserts correct page
    cy.visit('key_presses').get('h3').contains("Key Presses")
    cy.get('#target').type('{backspace}')
    cy.get('#result').contains("You entered: BACK_SPACE")
    //to test a different character, simply change what's after "You entered:" and in type()
  })
})