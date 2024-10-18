describe('Dynamic Controls; a page with async elements', () => {
/* On this page, we have an async function to add/remove an element, as well as an
 * async function to enable/disable a text field input, async being that there's a delay
 * between the click and the end of the function.
 * This is normally a challenge for frameworks such as TestComplete, Robot Framework, Selenium, but fortunally
 * Cypress has a built-in retry feature, and we can further extend that timeout for specific tests if needed.
 * The way to handle this would be to do something such as cy.get('#class', {timeout:10000}), but
 * the default timeout is more than enough for this page.
 * These tests fail if the elements expected are not visible.  
 */
  it('Dynamic Controls - Remove/add', () => {
    //goto page and asserts correct page -> this page has a nice catch; it's a not a h3, it's a h4
    cy.visit('dynamic_controls').get('h4').contains("Dynamic Controls")
    //assert checkbox and remove are present, then click on remove
    cy.get('#checkbox')
    cy.get('button').contains("Remove").click()
    //assert checkbox is gone (aka the actual feature we would want to test in practice)
    cy.get('#checkbox').should('not.exist')
    //let's add it back in
    cy.get('button').contains("Add").click()
    cy.get('#checkbox').should('exist')
  })

  it('Dynamic Controls - Enable/disable', () => {
    //goto page and asserts correct page
    cy.visit('dynamic_controls').get('h4').contains("Dynamic Controls")
    //assert input field is disabled
    cy.get('#input-example > input').should('be.disabled')
    //click on enable
    cy.get('button').contains("Enable").click()
    //assert input field is enabled and type hello in
    cy.get('#input-example > input').should('not.be.disabled').type("Hello, World")
  })
})