import React, { useState, useEffect } from "react";
import { Alert, Container, Snackbar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchTable from "../../components/searchTable";
import SearchBar from "../../components/searchBar/SearchBar";
import { MainHeading, MainSearchTextCopy } from "./SearchPage.styles";

// Function to fetch clients from the API with sorting and pagination
const fetchClients = async (searchTerm, page, rowsPerPage, sortBy, sortOrder) => {
  const filter = searchTerm;
  const index = page * rowsPerPage; // Calculate index for API
  const offset = rowsPerPage; // Number of rows per page
  const order = sortOrder === "asc" ? "ASCENDING" : "DESCENDING";

  try {
    const { data } = await axios.get(
      `/clientdata/clientsearch/${filter}/${sortBy}/${order}/${index}/${offset}`,
      {
        headers: {
          Authorization: process.env.REACT_APP_API_KEY,
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching data.");
  }
};

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // For input value
  const [fetchedTerm, setFetchedTerm] = useState(""); // For triggering search on button click
  const [page, setPage] = useState(0); // Track current page
  const rowsPerPage = 10; // Rows per page
  const [sortBy, setSortBy] = useState("NAME"); // Default sort by NAME
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [isSearchTriggered, setIsSearchTriggered] = useState(false); // Track if search button was clicked
  const navigate = useNavigate(); // For navigation

  // Fetch data using react-query, but disable auto-fetching
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["clients", fetchedTerm, page, rowsPerPage, sortBy, sortOrder],
    queryFn: () => fetchClients(fetchedTerm, page, rowsPerPage, sortBy, sortOrder),
    enabled: false, // Disable automatic fetch
    refetchOnWindowFocus: false,
  });

  // Trigger refetch after fetchedTerm is updated
  useEffect(() => {
    if (fetchedTerm) {
      refetch();
    }
  }, [fetchedTerm, refetch]);

  // Handle search button click
  const handleSearch = () => {
    setPage(0); // Reset to the first page when searching
    if (searchTerm === "") {
      setSnackbarMessage("Please enter a search term.");
      setSnackbarOpen(true); // Show the Snackbar
    } else {
      setFetchedTerm(searchTerm); // Update the term used for fetching
      setIsSearchTriggered(true); // Mark that the search button was clicked
      // refetch() will be triggered by the useEffect when fetchedTerm is updated
    }
  };

  // Handle clearing the search term
  const handleClearSearch = () => {
    setSearchTerm(""); // Clear search input
    setIsSearchTriggered(false); // Reset search triggered flag
    // Do not refetch when clearing input; wait for an explicit search action
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (isSearchTriggered) refetch(); // Trigger refetch only if the search button was clicked
  };

  // Handle sorting by Date
  const handleSortByDate = () => {
    const isAsc = sortBy === "DATE" && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortBy("DATE");
    if (isSearchTriggered) refetch(); // Trigger refetch only if the search button was clicked
  };

  // Handle sorting by Name
  const handleSortByName = () => {
    const isAsc = sortBy === "NAME" && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortBy("NAME");
    if (isSearchTriggered) refetch(); // Trigger refetch only if the search button was clicked
  };

  // Handle row click to navigate to client details page
  const handleRowClick = (clientId) => {
    navigate(`/client/${clientId}`);
  };

  // Handle Snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  // Get the total number of results from the API data
  const totalResults = data?.totalResults || 0;

  return (
    <Container>
      <>
        <div>
          <MainHeading>Search Clients</MainHeading>
          <MainSearchTextCopy>
            Here, you'll find a comprehensive list of clients displayed in a
            well-organized table format. The table allows you to easily sort the
            client entries either by name or by the date they were added,
            offering flexibility in how you view the data. To begin searching,
            simply enter the name of the client you're looking for in the search
            bar.
          </MainSearchTextCopy>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)} // Update input value
          onSearch={handleSearch}
          onClearSearch={handleClearSearch}
          onErrorMessage={data?.searchError || ""}
        />

        {data && data.results.length !== 0 && isSearchTriggered && (
          <SearchTable
            data={data.results}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortByName={handleSortByName}
            onSortByDate={handleSortByDate}
            page={page}
            rowsPerPage={rowsPerPage}
            totalResults={totalResults}
            onPageChange={handleChangePage}
            onRowClick={handleRowClick}
            isLoading={isLoading}
          />
        )}

        {error && <Alert severity="error">{error.message}</Alert>}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </>
    </Container>
  );
};

export default SearchPage;
