describe('JavaScript alerts; 3 challenging popups', () => {
/* We have 3 alerts; a normal alert, a confirm prompt, and an input prompt.
 * Test fail if we do not get the correct success messages
 */

  it('JS Alert', () => {
    //goto page and asserts correct page
    cy.visit('javascript_alerts').get('h3').contains("JavaScript Alerts")
    //click on the button to generate the alert
    cy.contains("Click for JS Alert").click()
    //catch the alert; we assert what the text in it is, and Cypress closes it for us
    cy.on('window:alert', (alertText)=> {
      expect(alertText).eq("I am a JS Alert")
    })
    //a text will spawn to say we have generated the alert, we assert it is present
    cy.get('#result').contains("You successfully clicked an alert").should('be.visible')
  })

  it('JS Confirm', () => {
    //goto page and asserts correct page
    cy.visit('javascript_alerts').get('h3').contains("JavaScript Alerts")
    //click on the button to generate the alert
    cy.contains("Click for JS Confirm").click()
    //catch the alert; by default, Cypress always confirms
    cy.on('window:alert', (alertText)=> {
      expect(alertText).eq("I am a JS Confirm")
      //we can make Cypress cancel the prompt by adding return false
    })
    //a text will spawn to say we have generated the alert, we assert it is present
    cy.get('#result').contains('You clicked: Ok').should('be.visible')
  })

  it('JS Prompt', () => {
    //goto page and asserts correct page
    cy.visit('javascript_alerts').get('h3').contains("JavaScript Alerts")
    //for this test, we need to create a stub so that we can send in text to the prompt
    cy.window().then(($window) => {
      cy.stub($window, 'prompt').returns("Hello")
      cy.contains('Click for JS Prompt').click()
    })
    //assert we sent our text correctly
    cy.get('#result').contains('You entered: Hello').should('be.visible')
  })
})