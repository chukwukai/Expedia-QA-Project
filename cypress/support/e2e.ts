// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import './element.enum'

// Alternatively you can use CommonJS syntax:
// require('./commands')

declare global {
    namespace Cypress {
      interface Chainable {
        dataTest(value: string): Chainable<JQuery<HTMLElement>>
        className(value: string): Chainable<JQuery<HTMLElement>>
        dataStId(value: string): Chainable<JQuery<HTMLElement>>
        getIdAttr(value: string): Chainable<JQuery<HTMLElement>>
        getAriaControls(value: string): Chainable<JQuery<HTMLElement>>
        selectListOption(elementValue: string , textValue: string): Chainable<JQuery<HTMLElement>>
        getDateListOption(elementValue: string , textValue: string): Chainable<JQuery<HTMLElement>>
      }
    }
  }