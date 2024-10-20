import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { ErrorSnackbarProps } from "./ErrorSnackbar.types";

const ErrorSnackbar = (props: ErrorSnackbarProps) => {
  const { open, message, onClose, autoHideDuration = 3000 } = props;

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{ borderRadius: "30px" }}
    >
      <Alert severity="error" onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
