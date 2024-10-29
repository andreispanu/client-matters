import React from "react";
import { Autocomplete, CircularProgress } from "@mui/material";
import { SearchDropdownBarProps } from "./SearchBar.types";
import {
  SearchBarInput,
  SearchBarContainer,
} from "../searchBar/SearchBar.styles";
import theme from "../../theme";
import Grid from "@mui/material/Grid2";
import Popper from "@mui/material/Popper";
import { PopperProps } from "@mui/material/Popper";

const CustomPopper = (props: PopperProps) => {
  return (
    <Popper
      {...props}
      modifiers={[{ name: "offset", options: { offset: [0, 15] } }]}
    />
  );
};

const SearchDropdownBar = ({
  onSearchChange,
  suggestions,
  loading,
  onChange,
}: SearchDropdownBarProps) => {
  return (
    <SearchBarContainer data-testid="search-bar-container">
      <Grid container spacing={2} mt={theme.spacing(4)}>
        <Grid size={{ xs: 12, sm: 8 }} sx={{margin: 'auto'}}>
          <Autocomplete
            freeSolo
            loading={loading}
            options={suggestions && suggestions.map((option) => option.name)}
            onChange={(event, value) => {
              onChange && value && onChange(value);
            }}
            onInputChange={(event, newInputValue) => {
              const syntheticEvent = {
                target: {
                  value: newInputValue,
                  addEventListener: () => {},
                  dispatchEvent: () => false,
                  removeEventListener: () => {},
                },
              } as unknown as React.ChangeEvent<HTMLInputElement>;
              onSearchChange(syntheticEvent);
            }}
            PopperComponent={CustomPopper}
            renderInput={(params) => (
              <SearchBarInput
                {...params}
                label="Search Clients"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </SearchBarContainer>
  );
};

export default SearchDropdownBar;
