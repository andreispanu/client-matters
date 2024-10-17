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
  
  // Handle keydown event to detect "Enter" key
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  return (
    <>
      <SearchBarContainer>
        <SearchBarInput
          label="Search by name"
          variant="outlined"
          value={searchTerm}
          onChange={onSearchChange}
          onKeyDown={handleKeyDown} // Add keydown event listener here
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