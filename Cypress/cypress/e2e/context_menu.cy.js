describe('Context Menu; right-click in a div generates a pop-up', () => {
/* A right click in the specific div (visually, a box) will trigger an alert
 * By catching the alert, we can then assert what the message in that alert box contains.
 * This test fails if there is no alert or the message in the alert is different.
 */  
  it('Context Menu', () => {
    //goto page and assert correct page
    cy.visit('context_menu').get('h3').contains("Context Menu")
    //rightclick the div
    cy.get('div[id="hot-spot"]').rightclick()
    //assert alert window to appear and contain the correct text
    cy.on('window:alert',(txt)=>{
      expect(txt).to.contains('You selected a context menu')
    })
  })
})