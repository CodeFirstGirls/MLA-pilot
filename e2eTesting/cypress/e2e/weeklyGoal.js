import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { generateString } from './auth'

Given('I am a logged in user', () => {
  cy.clearCookies()
  cy.clearAllSessionStorage()
  cy.visit('/signup')
  cy.get('input[name="username"]').type(generateString(10))
  cy.get('input[name="password"]').type('test')
  cy.get('button[type="submit"]').click()
})

When('I add an exercise', () => {
  cy.get('button').contains('Add Exercise').click()
  cy.get('[placeholder="Your comment"]').type('Test')
  cy.get('input[inputmode="numeric"]').type('10')
  cy.get('button[type="submit"]').click()
})

Then('it should contribute to my weekly goal', () => {
  cy.get('div[class$=mantine-RingProgress-label]')
    .invoke('text')
    .should('contain', '5')
})

When('I edit my weekly goal target', () => {
  cy.get('svg[class="tabler-icon tabler-icon-edit"]').click({ force: true })
  cy.get('input[placeholder="Enter your weekly goal"]').clear().type('10')
  cy.get('button[data-variant="subtle"]').click()
})

Then('the UI should reflect my updated target', () => {
  cy.get('div[class$=mantine-RingProgress-label]')
    .invoke('text')
    .should('contain', '10')
})

When('I complete my weekly goal', () => {
  cy.get('button').contains('Add Exercise').click()
  cy.get('[placeholder="Your comment"]').type('Test')
  cy.get('input[inputmode="numeric"]').type('400')
  cy.get('button[type="submit"]').click()
})
Then('my weekly goal should show as complete', () => {
  cy.get('svg[class="tabler-icon tabler-icon-check"]').should('exist')
})
