import { TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import theme from "../../theme";

export const SearchBarContainer = styled("div")(() => ({
  display: "flex",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  maxWidth: '750px',
  margin: 'auto',
  marginTop: theme.spacing(6),
}));

export const SearchBarInput = styled(TextField)(() => ({
    backgroundColor: theme.palette.common.white,
    borderRadius: "30px",
    '& .MuiOutlinedInput-root': {
      borderRadius: "30px",
      
    }
  }));
  
export const SearchBarButton = styled(Button)(() => ({
  padding: theme.spacing(1, 4),
  fontSize: "1rem",
  borderRadius: "30px",
}));

export const SearchErrorMessage = styled(Typography)(() => ({
  marginTop: theme.spacing(2),
  fontSize: "0.7rem",
  color: theme.palette.error.main,
  textAlign: "center",
}));
