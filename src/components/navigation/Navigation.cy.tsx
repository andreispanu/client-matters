import Navigation from "./Navigation";
import { mount } from '@cypress/react18';
import { BrowserRouter } from 'react-router-dom';

describe('Navigation bar', () => {
  it('renders', () => {
    mount(<BrowserRouter><Navigation /></BrowserRouter>)
    cy.get('[data-testid="navigation-container"]').should('be.visible')
  })

    it('navigates to form page', () => {
        mount(<BrowserRouter><Navigation /></BrowserRouter>)
        cy.get('a[href="/form"]').click()
        cy.url().should('include', '/form')
    })

    it('navigates to test page', () => {
        mount(<BrowserRouter><Navigation /></BrowserRouter>)
        cy.get('a[href="/test"]').click()
        cy.url().should('include', '/test')
    })

    it('navigates to home page', () => {
        mount(<BrowserRouter><Navigation /></BrowserRouter>)
        cy.get('a[href="/"]').click()
        cy.url().should('not.include', '/form')
        cy.url().should('not.include', '/test')
    })

    it('navigates to form page and back to home page', () => {
        mount(<BrowserRouter><Navigation /></BrowserRouter>)
        cy.get('a[href="/form"]').click()
        cy.url().should('include', '/form')
        cy.get('a[href="/"]').click()
        cy.url().should('not.include', '/form')
    })
})
