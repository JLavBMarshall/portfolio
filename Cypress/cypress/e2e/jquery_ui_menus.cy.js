describe('JQueryUI Menu; an automation challenge', () => {
/* JQueryUI Menus need mouse operations and sync with those events. 
 * Automation frameworks don't like that because they prefer HTML elements, which aren't there.
 * This specific menu is a download menu, therefore;
 * Test fails if we cannot download the file.
 */

  const path = require('path')
  const downloadsFolder = Cypress.config('downloadsFolder')

  it('JQueryUI', () => {
    //goto page and asserts correct page
    cy.visit('jqueryui/menu').get('h3').contains("JQueryUI")
    //click listener 
    cy.window().document().then((doc) => {
      doc.addEventListener('click', () => {
        setTimeout(() => {doc.location.reload()}, 3000)
      })
    })
    //travel to the download link in the JQueryUI Menu
    cy.contains("Enabled").trigger('mouseover')
    cy.contains("Downloads").trigger('mouseover').next('ul.ui-menu')
      .then(($thirdMenu) => {
        cy.wrap($thirdMenu).invoke('show')
        cy.wrap($thirdMenu).contains("CSV").click()
      })
     //verify we have downloaded the CSV
     //you can change the extension to PDF or XLS (on below and above line) as all 3 downloads are called menu
    cy.readFile(path.join(downloadsFolder,'menu.csv')).should('exist')
  })
})