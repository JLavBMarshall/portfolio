describe('File Upload; allows to upload a file, two ways', () => {
/* On this page, we test a direct upload, and a drag-and-drop upload.
 * The file to be uploaded is at ./cypress/downloads/text.txt (if not available, simply create a text.txt file in that folder)
 * If the upload fails, the test fails.
 */
  const filePath = './cypress/downloads/text.txt'
  const fileName = 'text.txt'

  it('Upload Direct', () => {
    //goto page and asserts correct page
    cy.visit('upload').get('h3').contains("File Uploader")
    //submit file
    cy.get('#file-upload').selectFile(filePath).get('#file-submit').click()
    // assert file is uploaded (it should say the file name)
    cy.get('#uploaded-files').contains(fileName).should('be.visible')
  })

  it('Upload Drag-and-Drop', () => {
    //goto page and asserts correct page
    cy.visit('upload').get('h3').contains("File Uploader")
    //submit file with a drag-drop action
    cy.get('#drag-drop-upload').selectFile(filePath, {action:'drag-drop'})
    // assert file is uploaded (it should say the file name in a <span>)
    cy.contains(fileName).should('be.visible')
  })
})