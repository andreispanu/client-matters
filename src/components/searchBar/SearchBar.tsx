import { InputAdornment, IconButton } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { SearchBarProps } from "./SearchBar.types";
import {
  SearchBarContainer,
  SearchBarButton,
  SearchBarInput,
  SearchErrorMessage,
} from "./SearchBar.styles";
import Grid from "@mui/material/Grid2";
import theme from "../../theme";

const SearchBar = ({
  searchTerm,
  onSearchChange,
  onSearch,
  onClearSearch,
  onErrorMessage,
}: SearchBarProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  return (
    <>
      <SearchBarContainer data-testid="search-bar-container">
        <Grid container spacing={2} mt={theme.spacing(4)}>
          <Grid size={{ xs: 12, sm: 9 }}>
            <SearchBarInput
              data-testid="search-bar-input"
              label="Search clients by name"
              variant="outlined"
              value={searchTerm}
              onChange={onSearchChange}
              onKeyDown={handleKeyDown}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {searchTerm ? (
                      <IconButton onClick={onClearSearch} data-testid="clear">
                        <Clear />
                      </IconButton>
                    ) : (
                      <Search />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 3, lg: 2 }}>
            <SearchBarButton
              variant="contained"
              color="primary"
              onClick={onSearch}
              data-testid="search-bar-button"
            >
              Search
            </SearchBarButton>
          </Grid>
        </Grid>
      </SearchBarContainer>
      <SearchErrorMessage>{onErrorMessage ?? ""}</SearchErrorMessage>
    </>
  );
};

export default SearchBar;
