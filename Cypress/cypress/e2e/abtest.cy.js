describe('A/B test; result should vary between 2 titles, but never show the second title upon refresh', () => {

/* For this test, we make sure we are on the same A/B variation (we should never get the other variation in such test)
 * We load the page, store the title (which is the variation), reload the page, then assert we are still on the same
 * variation
 * This test fails if the title is different.
 */
  it('A/B Test enabled', () => {
    //goto page and assert we are on the correct page; both variations contains "A/B"
    //we also want to store what the title is to test it after page reload
    let variation = cy.visit('abtest').get('h3').contains("A/B")
    // refresh page
    cy.reload()
    // assert we got the same title
    cy.get('h3') == variation
  })

/* For this test, we opt out of the A/B test with an option passed into the URL. An alert is generated to warn us
 * that we have successfully opted out. The page then reloads with a header saying we are not in a A/B test.
 * This test fails if there is no alert window or that we did not land on the No A/B page.
*/  
  it ('A/B Test opt out', () => {
    //goto page with opt out url
    cy.visit('abtest?optimizely_opt_out=true')
    //catch alert and assert correct alert
    cy.on('window:alert',(txt)=>{
      expect(txt).to.contains('You have successfully opted out of Optimizely for this domain.')
    })
    //assert successful opt out
    cy.get('h3').contains("No A/B Test")
  })
})
