import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export const generateString = (length) => {
  let result = ' '
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

Given('I am not a logged in user', () => {
  cy.clearCookies()
  cy.clearAllSessionStorage()
})

When('I visit the home page', () => {
  cy.visit('/')
})

Then('I should be redirected to the login page', () => {
  cy.url().should('include', '/login')
})

When('I visit the signup page', () => {
  cy.visit('/signup')
})

When('I enter my details', () => {
  cy.get('input[name="username"]').type(generateString(10))
  cy.get('input[name="password"]').type('test')
})

Then('I should sign up and be redirected to the home page', () => {
  cy.get('button[type="submit"]').click()
  cy.url().should('not.include', '/redirect')
})

When('I visit the login page', () => {
  cy.visit('/login')
})

When('I enter my valid details', () => {
  cy.get('input[name="username"]').type('test2')
  cy.get('input[name="password"]').type('test')
})

Then('I should log in and be redirected to the home page', () => {
  cy.get('button[type="submit"]').click()
  cy.url().should('not.include', '/login')
})
