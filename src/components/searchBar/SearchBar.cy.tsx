import React from "react";
import SearchBar from "./SearchBar";
import { mount } from "@cypress/react18";

describe("SearchBar component", () => {
  it("renders correctly", () => {
    const searchProps = {
      searchTerm: "",
      onSearchChange: cy.stub().as("onSearchChange"),
      onSearch: cy.stub().as("onSearch"),
      onClearSearch: cy.stub().as("onClearSearch"),
      onErrorMessage: "",
    };
    mount(<SearchBar {...searchProps} />);
    cy.get('[data-testid="search-bar-container"]').should("be.visible");
    cy.get('[data-testid="search-bar-input"]').should("exist");
    cy.get('[data-testid="search-bar-button"]').should("exist");
  });

  it("clears the search input when the clear button is clicked", () => {
    const searchProps = {
      searchTerm: "John Doe",
      onSearchChange: cy.stub().as("onSearchChange"),
      onSearch: cy.stub().as("onSearch"),
      onClearSearch: cy.stub().as("onClearSearch"),
      onErrorMessage: "",
    };
    mount(<SearchBar {...searchProps} />);
    cy.get('[data-testid="search-bar-input"]').type("John Doe");
    cy.get('[data-testid="clear"]').click();
    cy.get("@onClearSearch").should("have.been.called");
  });

  it("executes search when the search button is clicked", () => {
    const searchProps = {
      searchTerm: "John Doe",
      onSearchChange: cy.stub().as("onSearchChange"),
      onSearch: cy.stub().as("onSearch"),
      onClearSearch: cy.stub().as("onClearSearch"),
      onErrorMessage: "",
    };
    mount(<SearchBar {...searchProps} />);
    cy.get('[data-testid="search-bar-button"]').click();
    cy.get("@onSearch").should("have.been.called");
  });

  it("executes search when pressing the Enter key", () => {
    const searchProps = {
      searchTerm: "John Doe",
      onSearchChange: cy.stub().as("onSearchChange"),
      onSearch: cy.stub().as("onSearch"),
      onClearSearch: cy.stub().as("onClearSearch"),
      onErrorMessage: "",
    };
    mount(<SearchBar {...searchProps} />);
    cy.get('[data-testid="search-bar-input"]').type("{enter}");
    cy.get("@onSearch").should("have.been.called");
  });

  it("displays an error message when provided", () => {
    const searchProps = {
      searchTerm: "",
      onSearchChange: cy.stub().as("onSearchChange"),
      onSearch: cy.stub().as("onSearch"),
      onClearSearch: cy.stub().as("onClearSearch"),
      onErrorMessage: "No results found.",
    };
    mount(<SearchBar {...searchProps} />);
    cy.contains("No results found.").should("be.visible");
  });
});
