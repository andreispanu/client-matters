import { TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import theme from "../../theme";

export const SearchBarContainer = styled("div")(() => ({
  maxWidth: "60%",
  margin: "auto",
  '@media (max-width: 600px)': {
    maxWidth: "90%",
  },
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
  width: "100%",
  height: "100%",
}));

export const SearchErrorMessage = styled(Typography)(() => ({
  marginTop: theme.spacing(2),
  fontSize: "0.7rem",
  color: theme.palette.error.main,
  textAlign: "center",
}));
