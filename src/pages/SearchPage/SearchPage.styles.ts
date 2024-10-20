import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import theme, {  customColors } from '../../theme';

export const SearchContainer = styled('div')(() => ({
  backgroundColor: '#eef3f8',
  paddingBottom: theme.spacing(2),
}))

export const SearchContent = styled('div')(() => ({
  maxWidth: theme.breakpoints.values.lg,
  margin: "auto",
}))

export const MainSearchTextCopy = styled(Typography)(() => ({
    marginTop: theme.spacing(2),
}))

export const MainHeading = styled(Typography)(() => ({
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  borderLeft: `4px solid ${customColors.brightGreen}`, 
  paddingLeft: theme.spacing(1),
  marginTop: theme.spacing(2),
}));