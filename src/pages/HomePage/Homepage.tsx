import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  StyledHomepageContainer,
  StyledHomepageButton,
  StyledHomePageHeading,
  StyledHomePageCopyContainer,
  StyledHomePageCopy,
} from "./Homepage.styles";
import {} from "./Homepage.styles";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/clients");
  };

  return (
    <>
      <StyledHomepageContainer>
        <Box mb={4}>
          <StyledHomePageHeading>
            Welcome to the Client Portal
          </StyledHomePageHeading>
          <StyledHomePageCopyContainer>
            <StyledHomePageCopy>
              This platform helps you manage your clients efficiently. You can
              search, view, and edit client details with ease.
            </StyledHomePageCopy>
            <StyledHomePageCopy>
              Use the search functionality to quickly find the clients you're
              looking for, or click the button below to view all clients.
            </StyledHomePageCopy>
          </StyledHomePageCopyContainer>

          <StyledHomepageButton
            variant="contained"
            color="primary"
            size="large"
            onClick={handleNavigate}
          >
            View Clients
          </StyledHomepageButton>
        </Box>
      </StyledHomepageContainer>
    </>
  );
};

export default HomePage;
