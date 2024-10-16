import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import theme, {  customColors } from '../../theme';

export const MainSearchTextCopy = styled(Typography)(() => ({
    marginTop: theme.spacing(2),
}))

export const MainHeading = styled(Typography)(() => ({
  fontSize: '2rem',
  fontWeight: theme.typography.fontWeightMedium,
  borderLeft: `4px solid ${customColors.brightGreen}`, 
  paddingLeft: theme.spacing(1),
  marginTop: theme.spacing(4),
}));