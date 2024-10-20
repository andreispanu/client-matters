import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import theme, { customColors } from "../../theme";

export const ClientAdressContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  marginTop: theme.spacing(2),
}));

export const ClientDescriptionTitle = styled(Typography)(() => ({
  color: customColors.darkblue,
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
}));

export const ClientAdressLine = styled(Typography)(() => ({
  fontSize: "1rem",
}));
