import React from "react";
import Navigation from "./Navigation";
import { mount } from "@cypress/react18";
import { BrowserRouter } from "react-router-dom";

describe("Navigation bar", () => {
  it("renders", () => {
    mount(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
    cy.get('[data-testid="navigation-container"]').should("be.visible");
  });

  it("navigates to search page", () => {
    mount(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
    cy.get('a[href="/"]').click();
    cy.url().should("include", "/");
  });

  it("opens the drawer", () => {
    mount(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
    cy.get('[aria-label="menu"]').click();
    cy.get('[data-testid="drawer"]').should("be.visible");
  });

  it("closes the drawer", () => {
    mount(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
    cy.get('[aria-label="menu"]').click();
    cy.get('[data-testid="drawer"]').should("be.visible");
    cy.get('[data-testid="back-button"]').click();
    cy.get('[data-testid="side-navigation"]').should("not.be.visible");
  });

});
