describe('Broken Images: we expect 2 broken and 1 valid', () => {
/* This page contains 3 images, where the first 2 are broken and the last one is valid.
 * To assert the image is broken, its naturalWidth property should be 0.
 * To assert the image is not broken, its naturalWidth must be above 0.
 * The test fails if 1) the 3 images are not present 2) the first two images have a higher natural width than 0 
 * 3) the third image has a null natural width.
 */
  it('Broken Images', () => {
    //goto page and assert correct page
    cy.visit('broken_images').get('h3').contains("Broken Images")

    /* We have 3 images, first 2 (asdf.jpg and hjkl.jpg) are broken, while third one (img/avatar-blank.jpg) is valid
    *  We assert all 3 are present, and we assert that the first two are broken by checking for the 'naturalWidth' property
    * An image is broken if its naturalWidth is == 0
    */

    cy.get('img[src="asdf.jpg"]').should('have.prop', 'naturalWidth').and('equal', 0)
    cy.get('img[src="hjkl.jpg"]').should('have.prop', 'naturalWidth').and('equal', 0)
    cy.get('img[src="img/avatar-blank.jpg"]').should('have.prop', 'naturalWidth').and('be.greaterThan', 0)

  })
})