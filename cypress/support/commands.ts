/// <reference types="cypress" />

import { first } from "cypress/types/lodash"

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

  Cypress.Commands.add('className', (value) => {
    return cy.get(`[class=${value}]`)
  })

  Cypress.Commands.add('dataStId', (value) => {
    return cy.get(`[data-stid=${value}]`)
  })

  Cypress.Commands.add('getAriaControls', (value) => {
    return cy.get(`[aria-controls=${value}]`)
  })

  Cypress.Commands.add('getIdAttr', (value) => {
    return cy.get(`[id=${value}]`)
  })

  Cypress.Commands.add('selectListOption', (elementValue , textValue)=>{
    cy.className(elementValue).each(($el)=>{
      if($el.text() === textValue){
          cy.wrap($el).click()
          return;
      }
  })
  })
  
  Cypress.Commands.add('getDateListOption', (elementValue , textValue)=>{
    cy.get(elementValue).each(($el)=>{
      const firstValue = $el.first()
      if(firstValue.text() === textValue){
          cy.wrap($el).click()
      }
  })
})