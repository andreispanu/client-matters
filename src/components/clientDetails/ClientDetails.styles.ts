import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import theme, { customColors } from "../../theme";

export const ClientDescriptionTitle = styled(Typography)(() => ({
  color: customColors.darkblue,
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
}));

export const ClientDescriptionLineKey = styled("span")(() => ({
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
}))

export const ClientDescriptionLine = styled(Typography)(() => ({
  fontSize: theme.typography.body1.fontSize,
  marginTop: theme.spacing(1),
}));
