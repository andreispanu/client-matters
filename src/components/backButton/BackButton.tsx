import React from "react";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom"; // Or you can use href for standard links
import { BackButtonProps } from "./BackButton.types";

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
        startIcon={<ArrowBackIcon />}
        onClick={action}
      >
        {label}
      </Button>
    </Box>
  );
};

export default BackButton;
