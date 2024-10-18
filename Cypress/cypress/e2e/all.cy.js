describe('Runs every tests', () => {

  it('Website Online', () => { //asserts website is up
    cy.visit('/')
  })

  it('A/B Test', () => {
    //goto page and assert we are on the correct page; both variations contains "A/B"
    //we also want to store what the title is to test it after page reload
    let variation = cy.visit('abtest').get('h3').contains("A/B")
    // refresh page
    cy.reload()
    // assert we got the same title
    cy.get('h3') == variation
  })

  it ('A/B Test Opt Out', () => {
    //goto page with opt out url
    cy.visit('abtest?optimizely_opt_out=true')
    //catch alert and assert correct alert
    cy.on('window:alert',(txt)=>{
      expect(txt).to.contains('You have successfully opted out of Optimizely for this domain.')
    })
    //assert successful opt out
    cy.get('h3').contains("No A/B Test")
  })

  it('Add/Remove', () => {
    //goto page and assert correct page
    cy.visit('add_remove_elements/').get('h3').contains("Add/Remove Elements")
    //assert Delete button doesn't exists
    cy.get('[class=added-manually]').should('not.exist')
    //assert Add Element button exists and click on it
    cy.get('button').contains("Add Element").click()
   
    //asserts both buttons exist and add new button
    cy.get('[class=added-manually]')
    cy.get('button').contains("Add Element").click()
  
    // asserts both buttons exists and delete first element
    cy.get('[class=added-manually]:nth-child(2)')
    cy.get('[class=added-manually]:first').click()
    
    // asserts both buttons exists and delete remaining element
    cy.get('button').contains("Add Element")
    cy.get('[class=added-manually]').click()
    
    // assert only Add Element exists
    cy.get('button').contains("Add Element")
    
  })

  it('Basic Auth', () => {
    //goto page with login info, both username and password are set to admin
    cy.visit('basic_auth/', {
      auth: {
        username: 'admin',
        password: 'admin',
      },
    })
    //assert we loaded the correct page
    cy.get('h3').contains("Basic Auth")
  })

  it('Broken Images', () => {
    //goto page and assert correct page
    cy.visit('broken_images').get('h3').contains("Broken Images")
  
    /* We have 3 images, first 2 (asdf.jpg and hjkl.jpg) are broken, while third one (img/avatar-blank.jpg) is valid
    *  We assert all 3 are present, and we assert that the first two are broken by checking for the 'naturalWidth' property
    *  An image is broken if its naturalWidth is == 0 */
  
    cy.get('img[src="asdf.jpg"]').should('have.prop', 'naturalWidth').and('equal', 0)
    cy.get('img[src="hjkl.jpg"]').should('have.prop', 'naturalWidth').and('equal', 0)
    cy.get('img[src="img/avatar-blank.jpg"]').should('have.prop', 'naturalWidth').and('be.greaterThan', 0)
  
  })

  it('Challenging DOM', () => {
    //goto page and assert correct page
    cy.visit('challenging_dom').get('h3').contains("Challenging DOM")
    //click on the red button (doesn't do anything)
    cy.get('a[class="button alert"]').click()
    //get the text inside the cell at 3rd column, 6th row (text5)
    cy.get('tbody tr:nth-child(6) td:nth-child(3)').contains("5")
    //click on the delete link of the 7th row (link doesn't do anything)
    cy.get('tbody tr:nth-child(7) td:nth-child(7)').contains("delete").click()
  })

  it('Checkboxes', () => {
    //goto page and asserts correct page
    cy.visit('checkboxes').get('h3').contains("Checkboxes")
    //asserts both boxes are present and that second is checked
    cy.get('form input:first').should('not.be.checked')
    cy.get('form input:nth-child(3)').should('be.checked')
    //reverse the checks then assert them
    cy.get('form input:first').click().should('be.checked')
    cy.get('form input:nth-child(3)').click().should('not.be.checked')
  })
  
  it('Context Menu', () => {
    //goto page and assert correct page
    cy.visit('context_menu').get('h3').contains("Context Menu")
    //rightclick the div
    cy.get('div[id="hot-spot"]').rightclick()
    //assert alert window to appear and contain the correct text
    cy.on('window:alert',(txt)=>{
      expect(txt).to.contains('You selected a context menu')
    })
  })

  const dataTransfer = new DataTransfer()
  it('Drag and Drop', () => {
    //goto page and asserts correct page
    cy.visit('drag_and_drop').get('h3').contains("Drag and Drop")
    //drag A to B
    cy.get('#column-a').trigger('dragstart', {dataTransfer})
    cy.get('#column-b').trigger('drop', {dataTransfer})
    // assert the transfer
    cy.get('#column-a').contains("B")
    cy.get('#column-b').contains("A")
  })

  it('Dropdown', () => {
    //goto page and asserts correct page
    cy.visit('dropdown').get('h3').contains("Dropdown List")
    //assert dropdown exists and that it's on the default selection
    cy.get('#dropdown option:selected').should('not.have.value')
    //select and assert first option
    cy.get('select').select('1').should('have.value', '1')
    //select and assert second option
    cy.get('select').select('2').should('have.value', '2')
  })

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

  it('Dynamic Controls - Remove/add', () => {
    //goto page and asserts correct page -> this page has a nice catch; it's a not a h3, it's a h4
    cy.visit('dynamic_controls').get('h4').contains("Dynamic Controls")
    //assert checkbox and remove are present, then click on remove
    cy.get('#checkbox')
    cy.get('button').contains("Remove").click()
    //assert checkbox is gone (aka the actual feature we would want to test in practice)
    cy.get('#checkbox').should('not.exist')
    //let's add it back in
    cy.get('button').contains("Add").click()
    cy.get('#checkbox').should('exist')
  })

  it('Dynamic Controls - Enable/disable', () => {
    //goto page and asserts correct page
    cy.visit('dynamic_controls').get('h4').contains("Dynamic Controls")
    //assert input field is disabled
    cy.get('#input-example > input').should('be.disabled')
    //click on enable
    cy.get('button').contains("Enable").click()
    //assert input field is enabled and type hello in
    cy.get('#input-example > input').should('not.be.disabled').type("Hello, World")
  })

  it('Dynamic Loaded Hidden Element', () => {
    //goto page and asserts correct page
    cy.visit('dynamic_loading').get('h3').contains("Dynamically Loaded")
    //click on link
    cy.get('[href="/dynamic_loading/1"]').click()
    //and assert we are on correct page
    .get('h4').contains("Example 1")
    //assert hidden element is hidden
    cy.get('#finish').should('not.be.visible')
    //click on start to load the hidden element
    cy.contains("Start").click()
    //unlike the previous test, this needs a timeout
    cy.get('#finish',{timeout:6000}).should('be.visible')
  })

  it('Dynamic Loaded Rendered Element', () => {
    //goto page and asserts correct page
    cy.visit('dynamic_loading').get('h3').contains("Dynamically Loaded")
    //click on link
    cy.get('[href="/dynamic_loading/2"]').click()
    //and assert we are on correct page
    .get('h4').contains("Example 2")
    // assert element does not exist
    cy.contains("Hello World!").should('not.exist')
    //start the load
    cy.contains("Start").click()
    //assert it loaded
    cy.contains("Hello World!", {timeout:6000}).should('be.visible')
  })

  it('Entry Ad', () => {
    //goto page and asserts correct page
    cy.visit('entry_ad').get('h3').contains("Entry Ad")
    //assert modal is active
    cy.get('.modal-title').should('be.visible')
    //close it
    cy.get('.modal-footer').contains("Close").click()
    //assert modal is not present
    cy.get('.modal-title').should('not.be.visible')
  })

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

  it('Floating Menu', () => {
    //goto page and asserts correct page
    cy.visit('floating_menu').get('h3').contains("Floating Menu")
    // scroll to the bottom of the page
    cy.get('#page-footer').scrollIntoView()
    // check if menu is visible and functioning
    cy.contains("Home").should('be.visible').click()
    // check if the url has the hash ("#about") concatenated to it
    cy.hash().should('contains','#home')
  })

  it('Forgot Password', () => {
    //goto page and asserts correct page -> surprise, we have a h2
    cy.visit('forgot_password').get('h2').contains("Forgot Password")
    // assert the field is available and type in an email
    // (we do not test if the field validates email format because it's not an unit test)
    cy.get('#email').type('test@test.com')
    // click the button and skip the error
    cy.contains('Retrieve password').click({failOnStatusCode: false})
  })

  it('Form Auth', () => {
    //goto page and asserts correct page
    cy.visit('login').get('h2').contains("Login")
    //fill the form
    cy.get('#username').type("tomsmith")
    cy.get('#password').type("SuperSecretPassword!")
    //send the form
    cy.get('.radius').click()
    //assert we are in
    cy.get('h2').contains("Secure Area")
  })

  it('Form Auth Error', () => {
    //goto page and asserts correct page
    cy.visit('login').get('h2').contains("Login")
    //fill the form
    cy.get('#username').type("toto")
    cy.get('#password').type("popo")
    //send the form
    cy.get('.radius').click()
    //assert the error
    cy.get('#flash').should('be.visible')
  })

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

  it('Horizontal Slider Key', () => {
    //goto page and asserts correct page
    cy.visit('horizontal_slider').get('h3').contains("Horizontal Slider")
    //move the slider 4 times -> we expect a value of 2
    cy.get('input').focus().type(Cypress._.repeat('{rightarrow}-{enter}',4)).trigger('change')
    //assert we have 2
     .get('#range').contains("2")
  })

  it('Horizontal Silder Slider Click', () => {
    //goto page and asserts correct page
    cy.visit('horizontal_slider').get('h3').contains("Horizontal Slider")
    //click on the value 2
    cy.get('input').invoke('val', '2').trigger('change')
    //assert the value
      .get('#range').should('have.text', '2')
  })

  it('Hovers', () => {
    //goto page and asserts correct page
    cy.visit('hovers').get('h3').contains("Hovers")
    //assert the hidden elements are not visible
    cy.get('.figcaption').should('not.be.visible')
    //make the first one visible
    .first().invoke('show')
    //assert so
    .contains('name: user1').should('be.visible')
  })

  const arraySize = 5
  const iteArray = [...Array(arraySize).keys()]

  it('Infinite Scroll', () => {
    //API call, intercept into an alias
    cy.intercept('infinite_scroll/**').as('page')
    //goto page and asserts correct page
    cy.visit('infinite_scroll').get('h3').contains("Infinite Scroll")
    //there's a <small>Loading</small> element in viewport to show that we are loading more content
    //might not be manually visible if you have fast speed
    cy.get('small')
    //create a wrap on which we loop (a 'for each')
    //the loop goes down arraySize times the infinite scroll
    // we wait to intercept the paragraph
    cy.wrap(iteArray).each((index)=> {
      cy.wait('@page')
      cy.window().scrollTo('bottom')
    })
    //we assert we got the same amount of pages 
    cy.get('.jscroll-added').its('length').should('eq', arraySize)
  })

  it('Inputs', () => {
    //goto page and asserts correct page
    cy.visit('inputs').get('h3').contains("Inputs")
    //test non-numbers
    cy.get('input').type("Hello").should('not.have.value')
    //test numbers
    cy.get('input').type(123).should('have.value', 123)
    //and that's it
  })

  it('JS Alert', () => {
    //goto page and asserts correct page
    cy.visit('javascript_alerts').get('h3').contains("JavaScript Alerts")
    //click on the button to generate the alert
    cy.contains("Click for JS Alert").click()
    //catch the alert; we assert what the text in it is, and Cypress closes it for us
    cy.on('window:alert', (alertText)=> {
      expect(alertText).eq("I am a JS Alert")
    })
    //a text will spawn to say we have generated the alert, we assert it is present
    cy.get('#result').contains("You successfully clicked an alert").should('be.visible')
  })

  it('JS Confirm', () => {
    //goto page and asserts correct page
    cy.visit('javascript_alerts').get('h3').contains("JavaScript Alerts")
    //click on the button to generate the alert
    cy.contains("Click for JS Confirm").click()
    //catch the alert; by default, Cypress always confirms
    cy.on('window:alert', (alertText)=> {
      expect(alertText).eq("I am a JS Confirm")
      //we can make Cypress cancel the prompt by adding return false
    })
    //a text will spawn to say we have generated the alert, we assert it is present
    cy.get('#result').contains('You clicked: Ok').should('be.visible')
  })

  it('JS Prompt', () => {
    //goto page and asserts correct page
    cy.visit('javascript_alerts').get('h3').contains("JavaScript Alerts")
    //for this test, we need to create a stub so that we can send in text to the prompt
    cy.window().then(($window) => {
      cy.stub($window, 'prompt').returns("Hello")
      cy.contains('Click for JS Prompt').click()
    })
    //assert we sent our text correctly
    cy.get('#result').contains('You entered: Hello').should('be.visible')
  })

  const path = require('path')
  const downloadsFolder = Cypress.config('downloadsFolder')

  it('JQueryUI', () => {
    //goto page and asserts correct page
    cy.visit('jqueryui/menu').get('h3').contains("JQueryUI")
    //click listener 
    cy.window().document().then((doc) => {
      doc.addEventListener('click', () => {
        setTimeout(() => {doc.location.reload()}, 3000)
      })
    })
    //travel to the download link in the JQueryUI Menu
    cy.contains("Enabled").trigger('mouseover')
    cy.contains("Downloads").trigger('mouseover').next('ul.ui-menu')
      .then(($thirdMenu) => {
        cy.wrap($thirdMenu).invoke('show')
        cy.wrap($thirdMenu).contains("CSV").click()
      })
     //verify we have downloaded the CSV
     //you can change the extension to PDF or XLS (on below and above line) as all 3 downloads are called menu
    cy.readFile(path.join(downloadsFolder,'menu.csv')).should('exist')
  })

  it('Key Presses', () => {
    //goto page and asserts correct page
    cy.visit('key_presses').get('h3').contains("Key Presses")
    cy.get('#target').type('{backspace}')
    cy.get('#result').contains("You entered: BACK_SPACE")
    //to test a different character, simply change what's after "You entered:" and in type()
  })

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

  it('New Tab', () => {
    //goto page and asserts correct page
    cy.visit('windows').get('h3').contains("Opening a new window")
    //force the link to open in the same window
    cy.contains("Click Here").invoke('removeAttr', 'target').click()
    //and assert we got there
    .url().should('include', '/windows/new').get('h3').contains("New Window")
    //then navigate back and assert we went to the same previous page
    cy.go('back')
    cy.contains("Click Here").should('be.visible')
  })

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

  /*it('Status Codes', () => {
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
  })*/
})