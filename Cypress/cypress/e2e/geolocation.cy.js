describe('Geolocation; a page that knows where you are', () => {
/* For this test, we send coordinates and we expect the page to show them.
 * The test fails if the coordinates are not what we sent in.
 */

  it('Geolocation', () => {
    //set coordinates
    const latitude = 55.23536
    const longitude = -0.47427
    //goto page and asserts correct page
    cy.visit('geolocation').get('h3').contains("Geolocation")
    //stub the coordinates
    cy.window().then(($window) => {
      cy.stub($window.navigator.geolocation, 'getCurrentPosition').callsFake(
        (callback) => {
          return callback({coords: {latitude, longitude}})
        }
      )
    })
    //click the button
    cy.get('button').click()
    //assert the coordinates are the same
    cy.contains(latitude).should('be.visible')
    cy.contains(longitude).should('be.visible')
  })
})