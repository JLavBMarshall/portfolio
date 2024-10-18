describe('Forgot Password; a fake password retrieval', () => {
/* This test expects a 500 error as the feature itself is not functional, but we can test sending the form.
 * The test can fail before sending the form if you can't type the email.
 */
  it('Forgot Password', () => {
    //goto page and asserts correct page -> surprise, we have a h2
    cy.visit('forgot_password').get('h2').contains("Forgot Password")
    // assert the field is available and type in an email
    // (we do not test if the field validates email format because it's not an unit test)
    cy.get('#email').type('test@test.com')
    // click the button and skip the error
    cy.contains('Retrieve password').click({failOnStatusCode: false})
  })
})