import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import theme from "../../theme";

export const StyledNavigationContainer = styled("nav")({
  backgroundColor: theme.palette.common.white,
  width: "100%",
});

export const StyledNavigationContent = styled("nav")({
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: theme.breakpoints.values.lg,
  margin: "auto",
});

export const StyledUnorderedList = styled("ul")({
  listStyle: "none",
  display: "flex",
  gap: "20px",
  margin: 0,
  padding: 0,
});

export const StyledListItem = styled("li")({
  fontSize: "18px",
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightMedium,
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
  textAlign: "left",
  height: "50px",
  width: "300px",
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightMedium,
  "&:hover a": {
    color: theme.palette.text.primary,
  },
});
