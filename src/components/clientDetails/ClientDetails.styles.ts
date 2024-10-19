import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import theme, { customColors } from "../../theme";

export const ClientDescriptionContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  marginTop: theme.spacing(2),
}));

export const ClientDescriptionTitle = styled(Typography)(() => ({
  color: customColors.darkblue,
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  marginBottom: theme.spacing(1),
}));

export const ClientDescriptionLineKey = styled("span")(() => ({
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
}))

export const ClientDescriptionLine = styled(Typography)(() => ({
  fontSize: theme.typography.body1.fontSize,
}));
