import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import theme from '../theme';

export const StyledNavigationContainer = styled('nav')({
  backgroundColor: theme.palette.background.default, 
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const StyedLogoContainer = styled('div')({
  fontSize: '24px',
  padding: '10px',
  textAlign: 'left',
  height: '50px',
  width: '300px',
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightMedium,
});

export const StyledUnorderedList = styled('ul')({
  listStyle: 'none',
  display: 'flex',
  gap: '20px',
  margin: 0,
  padding: 0,
});

export const StyledListItem = styled('li')({
  fontSize: '18px',
  color: theme.palette.common.white,
});

export const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: theme.palette.common.white,
  '&:hover': {
    color: '#ff4081', 
  },
});