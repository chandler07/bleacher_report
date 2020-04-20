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
   })
})

describe('Direct new user to sign up', () => {
  var SIGN_UP = '#app > div > header > div > div > ul > li:nth-child(1) > a'

  it('should go to the sign up webpage', () => {
    selectElementAndVisit(SIGN_UP)
  })
})

describe('Direct existing user to login', () => {
  var LOGIN = '#app > div > header > div > div > ul > li:nth-child(2) > a' 
  
  it('should go to the login webpage', () => {
    selectElementAndVisit(LOGIN)
    })
})

describe('View Main Hero Article', () => {
  var HERO_THUMBNAIL_PATH = "#main-content > article > div:nth-child(1) > div > a"

  it('should display the main hero article and be accessible', () => {
    selectElementAndVisit(HERO_THUMBNAIL_PATH)
    })
})

describe('Scroll to bottom of page', () => {
  it('should allow user to scroll to the bottom of the homepage', () => {
    cy.scrollTo('bottom')
    cy.contains('2020 Bleacher Report, Inc. Turner Broadcasting System, Inc. All Rights Reserved').should('be.visible')
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
  it('should reveal a new element with all teams in that league', () => {
    var leagueLinksDict = {
      'NFL': '#nfl',
      //'NBA': '#nba'
    }
    //for (var key in leagueLinksDict){
    //  cy.get(leagueLinksDict[key]).trigger('mouseover')
    //  cy.wait(2000)
    //  cy.get(leagueLinksDict[key]).trigger('mouseleave')
    //cy.get('#nfl').trigger('mousedown')
    //cy.get('#nfl > section > div.nav-dropdown-header').should('be.hidden')

  
      ['mouseover', 'mouseout', 'mouseenter', 'mouseleave'].forEach((event) => {

          // if your app doesnt use jQuery then we use .trigger()
          // https://on.cypress.io/trigger

          cy.get('#no-jquery').trigger(event)
          cy.get('#messages').should('contain', `the event ${event} was fired`)

    })
    
  })  
})

describe('Play video from Top Ten sections', () => {
  it.only('should play a video when user clicks on the button', () => {
    cy.get('#main-content > article > div:nth-child(7) > section > div > div > div.carouselItems > div.carouselItem.isActive > div.organism.trackVisual > div > a').click()
    cy.get('#bmpui-id-107').should('be.visible') // Only visible once video has started playing

  })
})