import React, { useState, useEffect } from "react";
import { Container, Snackbar, Alert } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchTable from "../../components/searchTable";
import SearchBar from "../../components/searchBar/SearchBar";
import { MainHeading, MainSearchTextCopy } from "./SearchPage.styles";

// Function to fetch clients from the API with sorting and pagination
const fetchClients = async (
  searchTerm,
  page,
  rowsPerPage,
  sortBy,
  sortOrder
) => {
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

// Function to fetch client details by clientId
const fetchClientDetails = async (clientId) => {
  const { data } = await axios.get(`/ClientData/client/${clientId}`, {
    headers: {
      Authorization: process.env.REACT_APP_API_KEY,
    },
  });
  return data;
};

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // For input value
  const [fetchedTerm, setFetchedTerm] = useState(""); // For triggering search on button click
  const [page, setPage] = useState(0); // Track current page
  const [sortBy, setSortBy] = useState("NAME"); // Default sort by NAME
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [isSearchTriggered, setIsSearchTriggered] = useState(false); // Track if search button was clicked
  const [clientDetails, setClientDetails] = useState({}); // Store client details for each clientId
  const navigate = useNavigate(); // For navigation

  // Fetch clients data using react-query, but disable auto-fetching
  const {
    data: clientsData,
    error: clientsError,
    isLoading: clientsLoading,
    refetch: refetchClients,
  } = useQuery({
    queryKey: ["clients", fetchedTerm, page, 10, sortBy, sortOrder],
    queryFn: () => fetchClients(fetchedTerm, page, 10, sortBy, sortOrder),
    enabled: false, // Disable automatic fetch
    refetchOnWindowFocus: false,
  });

  // Trigger refetch after fetchedTerm, sortBy, sortOrder, page, or rowsPerPage are updated
  useEffect(() => {
    if (fetchedTerm) {
      refetchClients();
    }
  }, [fetchedTerm, page, sortBy, sortOrder, refetchClients]);

  // Fetch client details when clientsData is available
  useEffect(() => {
    if (clientsData?.results?.length > 0) {
      const fetchDetails = async () => {
        const detailsMap = {};
        for (const client of clientsData.results) {
          const clientDetailsResponse = await fetchClientDetails(
            client.clientId
          );
          detailsMap[client.clientId] = clientDetailsResponse;
        }
        setClientDetails(detailsMap);
      };
      fetchDetails();
    }
  }, [clientsData]);

  // Combine client details into search results
  const combinedResults =
    clientsData?.results?.map((client) => {
      const clientDetail = clientDetails[client.clientId];
      return {
        ...client,
        name: clientDetail?.name || client.name,
        description: clientDetail?.description || "No description available",
        code: clientDetail?.code || "No code available",
      };
    }) || [];

  // Handle search button click
  const handleSearch = () => {
    setPage(0); // Reset to the first page when searching
    if (searchTerm === "") {
      setSnackbarMessage("Please enter a search term."); // Set snackbar message
      setSnackbarOpen(true); // Show the Snackbar
    } else {
      setFetchedTerm(searchTerm); // Update the term used for fetching
      setIsSearchTriggered(true); // Mark that the search button was clicked
    }
  };

  // Handle clearing the search term
  const handleClearSearch = () => {
    setSearchTerm(""); // Clear search input
    setIsSearchTriggered(false); // Reset search triggered flag
  };

  // Handle page change from pagination (converted to 0-based for API)
  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Page is already 0-based in MUI Pagination
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (event) => {
    setPage(0); // Reset to first page when rows per page change
  };

  // Handle sorting by Date
  const handleSortByDate = () => {
    const isAsc = sortBy === "DATE" && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortBy("DATE");
  };

  // Handle sorting by Name
  const handleSortByName = () => {
    const isAsc = sortBy === "NAME" && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortBy("NAME");
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

  // Trigger snackbar when there's an error from react-query or no results from data
  useEffect(() => {
    if (clientsError) {
      setSnackbarMessage(clientsError.message); // Set the snackbar message to the error message
      setSnackbarOpen(true); // Open the snackbar
    } else if (
      clientsData?.searchError &&
      clientsData.searchError !== "Index and Offset out of range."
    ) {
      setSnackbarMessage(clientsData.searchError); // Show custom search error
      setSnackbarOpen(true); // Open the snackbar
    }
  }, [clientsError, clientsData?.searchError]);

  // Get the total number of results from the API data
  const totalResults = clientsData?.totalResults || 0;

  // Calculate the range of currently displayed results
  const displayedFrom = page * 10 + 1;
  const displayedTo = Math.min((page + 1) * 10, totalResults);

  return (
    <Container>
      <>
        <MainHeading>Search Clients</MainHeading>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onSearch={handleSearch}
          onClearSearch={handleClearSearch}
        />

        {searchTerm === "" && !isSearchTriggered && (
          <MainSearchTextCopy sx={{marginTop: '30px'}}>
            Here, you'll find a comprehensive list of clients displayed in a
            well-organized table format. The table allows you to easily sort the
            client entries either by name or by the date they were added,
            offering flexibility in how you view the data. To begin searching,
            simply enter the name of the client you're looking for in the search
            bar and press Search.
          </MainSearchTextCopy>
        )}

        {combinedResults &&
          combinedResults.length !== 0 &&
          isSearchTriggered && (
            <SearchTable
              data={combinedResults} // Use combined client and matter data
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortByName={handleSortByName}
              onSortByDate={handleSortByDate}
              page={page}
              totalResults={totalResults}
              displayedFrom={displayedFrom}
              displayedTo={displayedTo}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleRowsPerPageChange}
              onRowClick={handleRowClick}
              isLoading={clientsLoading}
            />
          )}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          sx={{ borderRadius: "30px" }}
        >
          <Alert severity="error">{snackbarMessage}</Alert>
        </Snackbar>
      </>
    </Container>
  );
};

export default SearchPage;
