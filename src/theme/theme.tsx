import { createTheme } from "@mui/material/styles";

export const customColors = {
  darkblue: "#0f1c44",
  brightGreen: "#0c8",
  lightBlue: "#eef3f8",
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#003F5C",
    },
    secondary: {
      main: "#0c8",
    },

    error: {
      main: "#E74C3C",
    },

    background: {
      default: "#F5F5F5",
    },
    text: {
      primary: "#1e2f3f",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
    },
    button: {
      textTransform: "none",
    },
  },
  spacing: 8,
});

export default theme;
