describe('Dynamic Loading; async functions', () => {
/* A similar test to the previous one. The timeout is longer, and therefore we use
 * Cypress' timeout option to extend the timeout retry for specific places
 * The tests fail if the loading takes longer than the timeout timer.
 */

  it('Dynamic Loaded Hidden Element', () => {
    //goto page and asserts correct page
    cy.visit('dynamic_loading').get('h3').contains("Dynamically Loaded")
    //click on link
    cy.get('[href="/dynamic_loading/1"]').click()
    //and assert we are on correct page
    .get('h4').contains("Example 1")
    //assert hidden element is hidden
    cy.get('#finish').should('not.be.visible')
    //click on start to load the hidden element
    cy.contains("Start").click()
    //unlike the previous test, this needs a timeout
    cy.get('#finish',{timeout:6000}).should('be.visible')
  })

  it('Dynamic Loaded Rendered Element', () => {
    //goto page and asserts correct page
    cy.visit('dynamic_loading').get('h3').contains("Dynamically Loaded")
    //click on link
    cy.get('[href="/dynamic_loading/2"]').click()
    //and assert we are on correct page
    .get('h4').contains("Example 2")
    // assert element does not exist
    cy.contains("Hello World!").should('not.exist')
    //start the load
    cy.contains("Start").click()
    //assert it loaded
    cy.contains("Hello World!", {timeout:6000}).should('be.visible')
  })
})