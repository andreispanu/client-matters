import React from 'react';
import { Link } from 'react-router-dom';
import { StyedLogoContainer, StyledListItem, StyledNavigationContainer, StyledUnorderedList } from './Navigation.syles';

const Navigation = () => {
  return (
    <StyledNavigationContainer data-testid="navigation-container">
      <StyedLogoContainer>
        Client Matters 
      </StyedLogoContainer>
          <StyledUnorderedList>
          <StyledListItem>
              <Link to="/">Home</Link>
            </StyledListItem>
          </StyledUnorderedList>
        </StyledNavigationContainer>
  );
};

export default Navigation;
