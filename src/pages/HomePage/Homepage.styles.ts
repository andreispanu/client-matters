import { Button, Typography } from "@mui/material";
import { Box, Container, styled } from "@mui/system";
import theme, { customColors } from "../../theme";

export const StyledHomepageContainer = styled(Container)(() => ({
  marginTop: theme.spacing(4),
}));

export const StyledHomePageHeading = styled(Typography)(() => ({
  fontSize: "2rem",
  fontWeight: theme.typography.fontWeightMedium,
  borderLeft: `4px solid ${customColors.brightGreen}`,
  paddingLeft: theme.spacing(1),
  marginTop: theme.spacing(4),
}));

export const StyledHomePageCopyContainer = styled(Box)(() => ({
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  }));

export const StyledHomePageCopy = styled(Typography)(() => ({
  marginTop: theme.spacing(1),
}));

export const StyledHomepageButton = styled(Button)(() => ({
  padding: theme.spacing(1, 4),
  fontSize: "1rem",
  backgroundColor: customColors.brightGreen,
  color: customColors.darkblue,
  borderRadius: "3px",
}));
