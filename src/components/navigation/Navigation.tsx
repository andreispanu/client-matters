import React, { useState } from "react";
import {
  StyedLogoContainer,
  StyledNavigationContainer,
  StyledLink,
  StyledNavigationContent,
} from "./Navigation.syles";
import {
  Box,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BackButton from "../backButton";

const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean | ((prevState: boolean) => boolean)) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        "key" in event &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  return (
    <>
      <StyledNavigationContainer data-testid="navigation-container">
        <StyledNavigationContent>
          <StyedLogoContainer>
            <StyledLink to="/">Client Portal</StyledLink>
          </StyedLogoContainer>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </StyledNavigationContent>
      </StyledNavigationContainer>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        data-testid="drawer"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <List data-testid="side-navigation">
            <ListItem>
              <StyedLogoContainer>
                <StyledLink to="/">Client Portal</StyledLink>
              </StyedLogoContainer>
            </ListItem>
            <ListItemButton component={Link} href="/">
              <ListItemText primary="Search Clients" />
            </ListItemButton>
          </List>
          <Box m={2}>
            <BackButton
              label="Close"
              linkDetails="#"
              action={toggleDrawer(false)}
            />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navigation;
