import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import theme, { customColors } from "../../theme";

export const ClientAdressContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  marginTop: theme.spacing(2),
}));

export const ClientAdressTitle = styled(Typography)(() => ({
  color: customColors.darkblue,
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  marginBottom: theme.spacing(1),
}));

export const ClientAdressLine = styled(Typography)(() => ({
  fontSize: "1rem",
}));
