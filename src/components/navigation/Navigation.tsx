import React from "react";
import {
  StyedLogoContainer,
  StyledNavigationContainer,
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
      </StyledNavigationContent>
    </StyledNavigationContainer>
  );
};

export default Navigation;
