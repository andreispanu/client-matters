import { Button, Tab, Tabs, Typography } from "@mui/material";
import { borderRadius, height, styled } from "@mui/system";
import theme, { customColors } from "../../theme";

export const PageDescriptionTitle = styled(Typography)(() => ({
  fontSize: "2rem",
  fontWeight: theme.typography.fontWeightMedium,
  borderLeft: `4px solid ${customColors.brightGreen}`,
  paddingLeft: theme.spacing(1),
  marginTop: theme.spacing(4),
}));

export const PageDescriptionCopy = styled(Typography)(() => ({
  marginTop: theme.spacing(2),
}));

export const StyledClientDetailsCopy = styled(Typography)(() => ({
  marginTop: theme.spacing(1),
  fontWeight: theme.typography.fontWeightMedium,
}));

export const StyledTabPanel = styled(Tabs)(() => ({
  borderBottom: `2px solid ${customColors.brightGreen}`,
  '& .MuiTabs-indicator': {
    backgroundColor: customColors.brightGreen,
    height: "3px",
  }
}))

export const StyledTab = styled(Tab)(() => ({
  '&.Mui-selected': {
    borderColor: customColors.brightGreen,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.body1.fontSize,
  }
}))

export const StyledClientDetailsButton = styled(Button)(() => ({
  padding: theme.spacing(1, 4),
  fontSize: "1rem",
  backgroundColor: customColors.brightGreen,
  color: customColors.darkblue,
  borderRadius: "3px",
}));
