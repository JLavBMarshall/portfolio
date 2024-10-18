describe('Challenging DOM; a page with difficult locators', () => {
/* For this demo, we will ignore the canvas element, as it needs additional libraries/plugins for visual testing 
 * For this demo, we will 1) select the red button (middle of the left column), the (3,6) cell, and click on the delete link of the 7th row.
 * The goal of the demo is to showcase CSS selectors, as there is no functionnality on the page. 
 */

  it('Challenging DOM', () => {
    //goto page and assert correct page
    cy.visit('challenging_dom').get('h3').contains("Challenging DOM")
    //click on the red button (doesn't do anything)
    cy.get('a[class="button alert"]').click()
    //get the text inside the cell at 3rd column, 6th row (text5)
    cy.get('tbody tr:nth-child(6) td:nth-child(3)').contains("5")
    //click on the delete link of the 7th row (link doesn't do anything)
    cy.get('tbody tr:nth-child(7) td:nth-child(7)').contains("delete").click()
  })

})