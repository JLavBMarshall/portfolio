describe('Disappearing Elements; sometimes, the Gallery button is not present', () => {
/* We have 5 buttons, but sometimes, the last button (gallery) is not present.
 * I wasn't fully sure what to expect out of this test, so I decided to take an approach
 * where the feature has an intermittent defect; test might pass, test might fail.
 * For this reason, I did not include it in the all.cy.js battery
 * Test fails when a button (doesn't matter which) is missing.
 */
    it('Disappearing Elements', () => {
      //goto page and assert correct page
      cy.visit('disappearing_elements').get('h3').contains("Disappearing Elements")
      //assert we have all 5 links with correct text
      cy.get('ul li:first').contains("Home")
      cy.get('ul li:nth-child(2)').contains("About")
      cy.get('ul li:nth-child(3)').contains("Contact Us")
      cy.get('ul li:nth-child(4)').contains("Portfolio")
      cy.get('ul li:nth-child(5)').contains("Gallery")
    })
  })