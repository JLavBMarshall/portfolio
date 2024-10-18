describe('Infinite Scoll; a page with lazy loading', () => {
/* On this page, we have an infinite scroll. 
 * We test with API; we call for the text in the scroll, scroll X amount of times, then we assert
 * we have the same amount of pages as scroll downs.
 * The test fails if the amount of pages loaded is different from the amount of scrolls we executed.
 */

//create an array of iterator for a loop
const arraySize = 5
const iteArray = [...Array(arraySize).keys()]

  it('Infinite Scroll', () => {
    //API call, intercept into an alias
    cy.intercept('infinite_scroll/**').as('page')
    //goto page and asserts correct page
    cy.visit('infinite_scroll').get('h3').contains("Infinite Scroll")
    //there's a <small>Loading</small> element in viewport to show that we are loading more content
    //might not be manually visible if you have fast speed
    cy.get('small')
    //create a wrap on which we loop (a 'for each')
    //the loop goes down arraySize times the infinite scroll
    // we wait to intercept the paragraph
    cy.wrap(iteArray).each((index)=> {
      cy.wait('@page')
      cy.window().scrollTo('bottom')
    })
    //we assert we got the same amount of pages 
    cy.get('.jscroll-added').its('length').should('eq', arraySize)
  })
})