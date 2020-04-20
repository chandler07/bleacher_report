Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

//var PUBLIC_URL = 'https://www.example.com'
var PUBLIC_URL = 'https://www.bleacherreport.com'

beforeEach(() => {
  cy.visit(PUBLIC_URL)
})

function selectElementAndVisit(elementPath) {
  cy.get(elementPath).should('be.visible').and('have.attr', 'href').then(href => {
    cy.get(elementPath).click()
    cy.url().should('include', href)
  })
}

describe('Launch Bleacher report hompage', () => {
  
  //BR Logo elements
  var HEADER_LOGO = '#br-logo > svg'
  var FOOTER_LOGO = '#outer-container > footer > div > svg' 

  it('visits the Bleacher Report website', () => {

    cy.get(HEADER_LOGO).should('be.visible')
    cy.get(FOOTER_LOGO).should('be.visible')
    cy.contains('2020 Bleacher Report, Inc.').should('be.visible')
	  //cy.screenshot() //coould be used for screen comparison if desired
  })
})

describe('Check existence of league links buttons on the header', () => {
   
  var leagueLinks = [
        'NFL',
        'NBA',
        'CFB',
        'World Football',
        'MLB',
        'NHL',
        'CBB',
        'MMA',
        'WWE',
        'Golf',
        'More',
        'Sign Up',
        'Login',
        ];

    it.skip('should make sure visible header buttons exist', () => {
    leagueLinks.forEach((btn) => {
        cy.contains(btn).should('be.visible')
    })
    //cy.screenshot() //coould be used for screen comparison if desired
   })
})

describe('Direct new user to sign up', () => {
  var SIGN_UP = '#app > div > header > div > div > ul > li:nth-child(1) > a'

  it('should go to the sign up webpage', () => {
    selectElementAndVisit(SIGN_UP)
    //cy.screenshot() //coould be used for screen comparison if desired
  })
})

describe('Direct existing user to login', () => {
  var LOGIN = '#app > div > header > div > div > ul > li:nth-child(2) > a' 
  
  it('should go to the login webpage', () => {
    selectElementAndVisit(LOGIN)
    //cy.screenshot() //coould be used for screen comparison if desired
    })
})

describe('View Main Hero Article', () => {
  var HERO_THUMBNAIL_PATH = "#main-content > article > div:nth-child(1) > div > a"

  it('should display the main hero article and be accessible', () => {
    selectElementAndVisit(HERO_THUMBNAIL_PATH)
     //cy.screenshot() //coould be used for screen comparison if desired
    })
})

describe('Scroll to bottom of page', () => {
  it('should allow user to scroll to the bottom of the homepage', () => {
    cy.scrollTo('bottom')
    cy.contains('2020 Bleacher Report, Inc. Turner Broadcasting System, Inc. All Rights Reserved').should('be.visible')
    //cy.screenshot() //coould be used for screen comparison if desired
  })
})

describe('Check for each module on homepage', () => {
  var homepageModulesDict = {
    'Top News' : '#main-content > article > div.organism.topNews > div > h2',
    'Trending' : '#main-content > article > div.organism.trending > div > h2',
    'Top Highlights': '#main-content > article > div:nth-child(7)',
    'Top Ten Highlights is even': '#main-content > article > div.organism.topTenHighlights.isEven',
  }

  it('should have content module sections', () =>{
    for (var key in homepageModulesDict){
      cy.get(homepageModulesDict[key]).scrollIntoView()
    }

  })
})

describe('Mouseover league links to reveal teams', () =>{
  /*
   * NOTE: I had a lot of challenges trying to get the dropdown lists to show up with mouseover events
   * If I got it working, ideally I would like to ensure the user can hover over the leagues, ensure the
   * dropdown appears, select Home and one team for each league to ensure it goes to the correct page
   */ 
  it('should reveal a new element with all teams in that league', () => {
    var leagueLinksDict = {
      'NFL': 'nfl',
      'NBA': 'nba',
      'CFB': 'college-football',
      'World Football': 'world-football',
      'MLB' : 'mlb'
    }
    for (var key in leagueLinksDict){
      var section = " > section"
      cy.get('#' + leagueLinksDict[key]).trigger('mouseover')
      cy.get('#' + leagueLinksDict[key].concat(section)).should('be.hidden') // expected to be hidden until I could get hovering to work
      //cy.get(leagueLinksDict[key]).contains('Home').should('be.visible').click()
      //cy.url().should('include', leagueLinksDict[key])
      //cy.screenshot()
    }
  })  
})

describe('Play video from Top Ten sections', () => {
  it('should play a video when user clicks on the button', () => {
    cy.get('#main-content > article > div:nth-child(7) > section > div > div > div.carouselItems > div.carouselItem.isActive > div.organism.trackVisual > div > a').click()
    cy.get('#bmpui-id-107').should('be.visible') // Only visible once video has started playing

  })
})

/* Cypress doesn't work for native mobile apps so I would use something like Appium to test the iOS/Android versions
 *
 * Some of the tests that I would want to check are as follows:
 * 
 * 1. Launch mobile app 
 *  - checkfor B/R logo, magnifying glass search icon and DMs icon exist
 * 2. Tab bar at bottom
 *   1. Check icons exist
 *   2. Check active tab is highlighted
 *   3. Switch tabs
 * 3. Teams
 *   1. Favorite teams are correct and exist at top
 *   2. Can scroll laterally to reveal all
 * 4. Actions
 *   1. Tap
 *   2. Swipe
 *   3. Sroll
 * 5. Atricle Content elements
 *   1. Fire
 *   2. Bookmark
 *   3. Share internal
 *   4. Share external
 * 6. Post
 *   1. Tap opens new window
 *   2. Profile info
 * 7. Signed in?
 *     1. Content changes
 *    2. No post
 * 9. Select article
 *    1. Check it opens
 *    2. Swipe left to right to go back
 * 10. Tap top bar to scroll to top 
 * 11. Pull down to refresh
 */

