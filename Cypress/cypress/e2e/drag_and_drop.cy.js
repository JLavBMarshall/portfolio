describe('Drag and Drop; elements that can be moved around', () => {
/* A more complex test; we have 2 draggable elements in a row, and we want to switch their plage
 * By simply dragging A to B, they will change place, and we can then assert their new positions.
 * We use Cypress' trigger events of dragstart and drop, which needs a dataTransfer.
 * Cypress' documentation suggests a mousedown->mousemove->mouseup as to emulate a mouse, but
 * it needs viewport coordinates, which is something we want to avoid as viewports are not always
 * consistent, and therefore a very frequent source of error in automation.
 * Solution was found here https://testup.io/how-to-implement-drag-and-drop-in-cypress/ in Method 2
 * This test fails if 1) items cannot be dragged and dropped 2) they didn't properly switch.
*/

  const dataTransfer = new DataTransfer()
  it('Drag and Drop', () => {
    //goto page and asserts correct page
    cy.visit('drag_and_drop').get('h3').contains("Drag and Drop")
    //drag A to B
    cy.get('#column-a').trigger('dragstart', {dataTransfer})
    cy.get('#column-b').trigger('drop', {dataTransfer})
    // assert the transfer
    cy.get('#column-a').contains("B")
    cy.get('#column-b').contains("A")
  })
})