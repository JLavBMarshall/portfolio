describe('iFrames; QA worst nightmare', () => {
/* A very common issue in automation; calling an external frame means we lose control! We can't access!
 * Oh no! The robot can't see the iframe! 
 * The challenge is to get what's inside the iframes (ideally, all of them).
 * The test fails if we cannot fetch all 4 words.
 */  
const locators = ['left', 'middle', 'right', 'bottom'];
const content = [];
const assertContent = ['LEFT', 'MIDDLE', 'RIGHT', 'BOTTOM'];
  it('passes', () => {
    //goto page; it doesn't have a title, the rest of the test asserts we are on the "correct page"
    cy.visit('nested_frames')
    //we fetch all frames; top 3 are in "frame_top", so we need to fetch inside frame_top
    //therefore, we loop 
    locators.forEach((locator) => {
      //we don't want this code to execute on the bottom row, since there's nothing nested in it
      if (locator !== 'bottom') {
        cy.get('frame[src="/frame_top"]').within(($frame) => {
          cy.wrap($frame.contents().find(`frame[src="/frame_${locator}"]`),).within((frame) => {
            cy.wrap(frame.contents().find('body')).invoke('text').then((frameBodyText) => {
                content.push(frameBodyText.trim());
              })
          })
        })
      //meanwhile, /frame_bottom only has one frame
      } else {
        cy.get('frame[src="/frame_bottom"]').within(($frame) => {
          cy.wrap($frame.contents()).within((frame) => {
            cy.wrap(frame.contents().find('body')).invoke('text').then((frameBodyText) => {
                content.push(frameBodyText.trim());
              })
          })
        })
      }
    })
    //now that we have fetched what's in the frames, we assert we have what we expect
    cy.wrap(content).should('have.ordered.members', assertContent)
  })
})
