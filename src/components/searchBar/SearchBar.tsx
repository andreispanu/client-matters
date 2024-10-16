import React from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { SearchBarProps } from "./SearchBar.types";

const SearchBar = ({
  searchTerm,
  onSearchChange,
  onSearch,
  onClearSearch,
}: SearchBarProps) => {
  return (
    <Box display="flex" gap={2} mb={4}>
      <TextField
        label="Search clients"
        variant="outlined"
        value={searchTerm}
        onChange={onSearchChange}
        fullWidth
        InputProps={{
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton onClick={onClearSearch}>
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" color="primary" onClick={onSearch} startIcon={<Search />}>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
