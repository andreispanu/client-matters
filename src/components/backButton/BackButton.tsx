import React from "react";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom"; // Or you can use href for standard links
import { BackButtonProps } from "./BackButton.types";

const BackButton = ({ linkDetails, label }: BackButtonProps) => {
  return (
    <Box
      sx={{
        alignItems: "flex-end",
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button
        variant="text"
        component={Link}
        to={linkDetails}
        startIcon={<ArrowBackIcon />}
      >
        {label}
      </Button>
    </Box>
  );
};

export default BackButton;
