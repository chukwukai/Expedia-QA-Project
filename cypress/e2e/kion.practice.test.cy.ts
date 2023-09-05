import {HomeScreen, SearchResultScreen} from '../support/element.enum'

describe('Expedia Test Cases', () => {

    const today = new Date();
    const checkinDate = (today.getDate())
    var checkoutDate = (today.getDate() + 7)
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const monthIndex = new Date();
    var getCurrentMonth = month[monthIndex.getMonth()];
    if((getCurrentMonth === month[0] ||
        getCurrentMonth === month[2] ||
        getCurrentMonth === month[4] ||
        getCurrentMonth === month[6] ||
        getCurrentMonth === month[7] ||
        getCurrentMonth === month[9] ||
        getCurrentMonth === month[11]) 
          && checkoutDate > 31){
            checkoutDate = 31 
    }
    else if((getCurrentMonth === month[3] ||
        getCurrentMonth === month[5] ||
        getCurrentMonth === month[8] ||
        getCurrentMonth === month[10]) 
          && checkoutDate > 30){
            checkoutDate = 30
    }
    else if((getCurrentMonth === month[1]) && checkoutDate > 28){
            checkoutDate = 28 
    }
    beforeEach(() =>{
        cy.visit('/')
    })

    afterEach(() =>{
       cy.clearAllCookies()
    })

    it('Test Case 1', () => {
        cy.selectListOption(HomeScreen.getNavigationBar, 'Flights')
        cy.getAriaControls(HomeScreen.getSearchFormRoundTripTab).then(($el) =>{
            expect($el.text()).to.eq("Roundtrip")
            expect($el).to.have.attr('aria-selected', 'true')
        })
        cy.dataStId(HomeScreen.getOriginInputField).should('have.text', 'Leaving fromLeaving from').and('exist')
        cy.dataStId(HomeScreen.getDestinationInputField).should('have.text', 'Going toGoing to').and('exist')
        cy.dataStId(HomeScreen.getTravelerButton).should('have.text', '1 traveler').and('exist')
        cy.getIdAttr(HomeScreen.getEconomyDropdownButton).click()
        cy.selectListOption(HomeScreen.getEconomyTypeListOption, 'First class')
        cy.getIdAttr(HomeScreen.getEconomyDropdownButton).should('have.text' , 'First class')
    })

    it('Test Case 2', () => {
        cy.selectListOption(HomeScreen.getNavigationBar, 'Flights')
        cy.getAriaControls(HomeScreen.getSearchFormOneWayTab).click()
        cy.getAriaControls(HomeScreen.getSearchFormOneWayTab).then(($el) =>{
            expect($el.text()).to.eq("One-way")
            expect($el).to.have.attr('aria-selected', 'true')
        })
        cy.get(HomeScreen.getDateFormFieldLabel).should('contain', 'Date')
        cy.getAriaControls(HomeScreen.getSearchFormRoundTripTab).click()
        cy.getAriaControls(HomeScreen.getSearchFormRoundTripTab).then(($el) =>{
            expect($el.text()).to.eq("Roundtrip")
            expect($el).to.have.attr('aria-selected', 'true')
        })
        cy.get(HomeScreen.getDateFormFieldLabel).should('contain', 'Dates')
    })

    it('Test Case 3', () => {
        cy.className(HomeScreen.getNavigationBar).each(($el)=>{
           cy.wrap($el).click()
           cy.get('#search_button').should('be.visible')
        }) 
    })

    it('Test Case 4', () => {
        cy.dataStId(HomeScreen.getStayDestinationInputField).type("Universal Orlando Resort")
        cy.dataStId(HomeScreen.getSearchListOption).first().click()
        cy.getIdAttr(HomeScreen.getDateFormField).click()
        cy.dataStId(HomeScreen.getDatePickerModal).should('be.visible')
        cy.get(HomeScreen.getDateMonthYearValue).first().invoke('text').then(($el)=>{
            var previousButton = cy.dataStId(HomeScreen.getDatePickerPaging);
            if(!$el.includes(getCurrentMonth +" "+String(today.getFullYear()))){
                (previousButton).then(($elVal1)=>{
                    cy.wrap($elVal1).first().click( {force: true})
                })
            }else{
                var previousButton = cy.dataStId(HomeScreen.getDatePickerPaging);
                (previousButton).then(($elVal2)=>{
                    expect($elVal2).to.be.disabled
                })
            }
        })
        cy.get(`[data-day='${checkinDate}']`).first().click();
        cy.get(`[data-day='${checkoutDate}']`).first().click();
        cy.dataStId(HomeScreen.getApplyConfirmationButton).click()
        cy.getIdAttr(HomeScreen.getSearchButton).click()
        cy.dataStId(SearchResultScreen.getHotelInfoTitle).should('be.visible')
    })

    it('Test Case 5', () => {
        cy.dataStId(HomeScreen.getStayDestinationInputField).type("Universal Orlando Resort")
        cy.dataStId(HomeScreen.getSearchListOption).first().click()
        cy.getIdAttr(HomeScreen.getDateFormField).click()
        cy.get(HomeScreen.getDateMonthYearValue).first().invoke('text').then(($el)=>{
            var previousButton = cy.dataStId(HomeScreen.getDatePickerPaging);
            if(!$el.includes(getCurrentMonth +" "+String(today.getFullYear()))){
                (previousButton).then(($elVal1)=>{
                    cy.wrap($elVal1).first().click( {force: true})
                })
            }else{
                var previousButton = cy.dataStId(HomeScreen.getDatePickerPaging);
                (previousButton).then(($elVal2)=>{
                    expect($elVal2).to.be.disabled
                })
            }
        })
        cy.get('[data-day='+String(today.getDate())+']').first().click()
        cy.get('[data-day='+String(today.getDate() + 7) +']').first().click()
        cy.dataStId(HomeScreen.getApplyConfirmationButton).click()
        cy.getIdAttr(HomeScreen.getSearchButton).click()
        cy.dataStId(SearchResultScreen.getHotelInfoTitle).should('be.visible')
        cy.dataStId(SearchResultScreen.getOpenRoomPicker).click()
        cy.getIdAttr(SearchResultScreen.getIncreaseChildButton).dblclick({force: true}) 
        cy.get(SearchResultScreen.getChildAgeOption +'-0').select('8')
        cy.get(SearchResultScreen.getChildAgeOption +'-1').select('10')
        cy.getIdAttr(SearchResultScreen.getTravelerDoneButton).click()
        cy.dataStId(SearchResultScreen.getOpenRoomPicker).should('contain', '4 travelers')
    }) 
  })