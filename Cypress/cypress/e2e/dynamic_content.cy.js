describe('Dynamic Content; pictures and text change on reload', () => {
/* A "table" with dynamic content; the structure is the same, the content changes.
 * We test that the content changes upon a page reload by storing the content then doing a compare.
 * This test fails if there is no content to store or the new content is the same.
*/
  it('Dynamic Content', () => {
    //goto page and asserts correct page
    cy.visit('dynamic_content').get('h3').contains("Dynamic Content")
    //create arrays to store content
    let imgFirst = []
    let textFirst = []
    let imgSecond = []
    let textSecond = []
    //store content
    cy.get('.large-2 img').then(($firstImages) => {
      imgFirst = Array.from($firstImages, (img) => img.src)
    })
    cy.get('.large-2 + .large-10').then(($firstStrings) => {
      textFirst = Array.from($firstStrings, (element) => element.innerText)
    })
    //refresh page to generate new content
    cy.reload()
    //fetch new content and assert it is different from old
    cy.get('.large-2 img').then(($secondImages) => {
      imgSecond = Array.from($secondImages, (img) => img.src)
      expect(imgFirst).not.to.deep.eq(imgSecond)
    })
    cy.get('.large-2 + .large-10').then(($secondStrings) => {
      textSecond = Array.from(
        $secondStrings, 
        (element) => element.innerText)
        expect(textFirst).not.to.deep.eq(textSecond)
    })
  })
})