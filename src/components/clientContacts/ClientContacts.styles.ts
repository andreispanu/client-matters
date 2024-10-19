import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import theme, { customColors } from "../../theme";

export const ClientContactsTitle = styled(Typography)(() => ({
    color: customColors.darkblue,
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(1),
  }));