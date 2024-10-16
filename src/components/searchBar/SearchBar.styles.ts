import { TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import theme from "../../theme";

export const SearchBarContainer = styled("div")(() => ({
  display: "flex",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  maxWidth: '550px',
  marginTop: theme.spacing(6),
}));



export const SearchBarInput = styled(TextField)(() => ({
    backgroundColor: theme.palette.common.white,
  }));
  
export const SearchBarButton = styled(Button)(() => ({
  padding: theme.spacing(1, 4),
  fontSize: "1rem",
}));

export const SearchErrorMessage = styled(Typography)(() => ({
  marginTop: theme.spacing(2),
  fontSize: "0.7rem",
  color: theme.palette.error.main,
}));
