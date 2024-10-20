import React from 'react'
import App from './App'
import { mount } from 'cypress/react'

describe('<App />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<App />)
  })

  it('navigates to search page', () => {
    mount(<App />)
    cy.get('a[href="/"]').click()
    cy.url().should('include', '/')
  })
})
