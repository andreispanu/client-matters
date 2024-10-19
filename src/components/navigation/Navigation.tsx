import React, { useState } from "react";
import {
  StyedLogoContainer,
  StyledNavigationContainer,
  StyledLink,
  StyledNavigationContent,
} from "./Navigation.syles";
import {
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

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
            <StyledLink to="/">Client Matters</StyledLink>
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
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem>
            <StyedLogoContainer>
              <StyledLink to="/">Client Matters</StyledLink>
            </StyedLogoContainer>
          </ListItem>
          <ListItemButton component={Link} href="/">
            <ListItemText primary="Search Clients" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default Navigation;
