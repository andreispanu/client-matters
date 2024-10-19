import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import theme from "../../theme";

export const StyledNavigationContainer = styled("nav")({
  backgroundColor: theme.palette.common.white,
  width: "100%",
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: "sticky",
  top: 0,
  zIndex: 100,
});

export const StyledNavigationContent = styled("nav")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  maxWidth: theme.breakpoints.values.lg,
  margin: "auto",
  padding: theme.spacing(0, 3),
});

export const StyledLink = styled(Link)({
  textDecoration: "none",
  color: theme.palette.text.primary,
  "&:hover": {
    color: theme.palette.secondary.main,
  },
});

export const StyedLogoContainer = styled("div")({
  fontSize: "24px",
  padding: "10px",
  paddingLeft: 0,
  textAlign: "left",
  height: "50px",
  width: "300px",
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightMedium,
  "&:hover a": {
    color: theme.palette.text.primary,
  },
});
