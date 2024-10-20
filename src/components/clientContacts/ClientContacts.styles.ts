import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import theme, { customColors } from "../../theme";

export const ClientContactsTitle = styled(Typography)(() => ({
    color: customColors.darkblue,
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    marginBottom: theme.spacing(1),
  }));