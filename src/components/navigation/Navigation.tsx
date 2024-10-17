import React from "react";
import {
  StyedLogoContainer,
  StyledListItem,
  StyledNavigationContainer,
  StyledUnorderedList,
  StyledLink,
  StyledNavigationContent,
} from "./Navigation.syles";

const Navigation = () => {
  return (
    <StyledNavigationContainer data-testid="navigation-container">
      <StyledNavigationContent>
        <StyedLogoContainer>
          <StyledLink to="/">Client Matters</StyledLink>
        </StyedLogoContainer>

        <StyledUnorderedList>
        <StyledListItem>
            <StyledLink to="/">Home</StyledLink>
          </StyledListItem>
          <StyledListItem>
            <StyledLink to="/clients">Clients</StyledLink>
          </StyledListItem>
        </StyledUnorderedList>
      </StyledNavigationContent>
    </StyledNavigationContainer>
  );
};

export default Navigation;
