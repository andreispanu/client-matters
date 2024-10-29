import { TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import theme from "../../theme";

export const SearchBarContainer = styled("div")(() => ({
  marginTop: theme.spacing(2),
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