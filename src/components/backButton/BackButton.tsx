import React from "react";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { BackButtonProps } from "./BackButton.types";
import CloseIcon from "@mui/icons-material/Close";

const BackButton = ({ linkDetails, label, action }: BackButtonProps) => {
  return (
    <Box
      data-testid="back-button"
      sx={{
        alignItems: "flex-end",
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        paddingBottom: 2,
      }}
    >
      <Button
        variant="text"
        component={Link}
        to={linkDetails}
        startIcon={linkDetails === "#" ? <CloseIcon /> : <ArrowBackIcon />}
        onClick={action}
      >
        {label}
      </Button>
    </Box>
  );
};

export default BackButton;
