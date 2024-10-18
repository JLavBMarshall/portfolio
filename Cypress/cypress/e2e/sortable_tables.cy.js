describe('Sortable Tables; data that can be sorted', () => {
/* Two tables with 6 columns which header can be clicked to sort the data.
 * As the content is static, we click 2 headers and assert which element is the first.
 * This test fails if the data is different from what's expected.
 */
  it('Sortable Tables', () => {
    //goto page and asserts correct page
    cy.visit('tables').get('h3').contains("Data Tables")
    //example 1
    cy.get('#table1 > thead > tr > :nth-child(1)').click()
    cy.get('#table1 > tbody > :nth-child(1) > :nth-child(1)').contains("Bach")
    //example 2
    cy.get('#table2 > thead > tr > :nth-child(1)').click()
    cy.get('tbody > :nth-child(1) > .last-name').contains("Bach")
  })
})