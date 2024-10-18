describe('Status Codes; standard REST API', () => {
/* We have 4 links to status 200, 301, 404, and 500.
 * We have to disable errors as Cypress manage them not so greatly
 * Then we post a request to these links and expect the response to be their URL
 * This test fails if the status code doesn't match the URL.
 */    
  it('Status Codes', () => {
    const statusCodes = [200, 301, 404, 500]
    //goto page and asserts correct page
    cy.visit('status_codes').get('h3').contains("Status Codes")
    //loop thru all codes; we send a request to the url, and we expect the code
    statusCodes.forEach((statusCode) => {
        cy.request({
            url: `/status_codes/${statusCode}`,
            failOnStatusCode: false, //MANDATORY; will fail test on 404/500
        })//and we assert we got the correct response
        .then((response) => {
            expect(response.status).to.eq(statusCode)
        })
    })
  })
})