import { InputAdornment, IconButton } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { SearchBarProps } from "./SearchBar.types";
import { SearchBarContainer, SearchBarButton, SearchBarInput, SearchErrorMessage } from "./SearchBar.styles";

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
      <SearchBarContainer>
        <SearchBarInput
          label="Search clients by name"
          variant="outlined"
          value={searchTerm}
          onChange={onSearchChange}
          onKeyDown={handleKeyDown}
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
        <SearchBarButton
          variant="contained"
          color="primary"
          onClick={onSearch}
          startIcon={<Search />}
        >
          Search
        </SearchBarButton>
      </SearchBarContainer>
      <SearchErrorMessage>{onErrorMessage ?? ''}</SearchErrorMessage>
    </>
  );
};

export default SearchBar;