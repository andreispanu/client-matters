import React, { useState } from "react";
import {
  Container,
  Typography,
  Alert,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
import ReusableTable from "../../components/reusableTable";
import SearchBar from "../../components/searchBar/SearchBar";

// Function to fetch clients from the API with sorting
const fetchClients = async (
  searchTerm,
  page,
  rowsPerPage,
  sortBy,
  sortOrder
) => {
  const filter = searchTerm ? searchTerm : "*"; // Fetch all data if no search term is provided
  const index = page * rowsPerPage;
  const offset = rowsPerPage;
  const order = sortOrder === "asc" ? "ASCENDING" : "DESCENDING";
  const { data } = await axios.get(
    `/clientdata/clientsearch/${filter}/${sortBy}/${order}/${index}/${offset}`,
    {
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    }
  );
  return data;
};

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0); // Track current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Track rows per page
  const [sortBy, setSortBy] = useState("NAME"); // Sort by NAME by default
  const [sortOrder, setSortOrder] = useState("asc"); // Sort order, default to ascending
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  // Fetch data using the query
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["clients", searchTerm, page, rowsPerPage, sortBy, sortOrder],
    queryFn: () =>
      fetchClients(searchTerm, page, rowsPerPage, sortBy, sortOrder),
    enabled: !!searchTerm, // Only run query when there is a search term
    refetchOnWindowFocus: false,
  });

  console.log(data);

  // Handle search button click
  const handleSearch = () => {
    setPage(0); // Reset to the first page when searching
    refetch();
  };

  // Handle clearing the search term
  const handleClearSearch = () => {
    setSearchTerm(""); // Clear search input
    setPage(0); // Reset pagination to the first page
    refetch(); // Trigger refetch to reset search results
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  };

  // Handle sorting by Date
  const handleSortByDate = () => {
    const isAsc = sortBy === "DATE" && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortBy("DATE");
    refetch();
  };

  // Handle sorting by Name
  const handleSortByName = () => {
    const isAsc = sortBy === "NAME" && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortBy("NAME");
    refetch();
  };

  // Handle row click to navigate to the client details page
  const handleRowClick = (clientId) => {
    navigate(`/client/${clientId}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Search Clients
      </Typography>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
      />

      {error && <Alert severity="error">{error.message}</Alert>}

      {!searchTerm && (
        <Typography variant="body1">
          Please enter a search term to find clients.
        </Typography>
      )}

      {data && data.results.length !== 0 && searchTerm && (
        <ReusableTable
          data={data.results}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortByName={handleSortByName}
          onSortByDate={handleSortByDate}
          page={page}
          rowsPerPage={rowsPerPage}
          totalResults={data.totalResults || 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onRowClick={handleRowClick}
          isLoading={isLoading}
        />
      )}

      {data && data.results && data.results.length === 0 && (
        <Typography>No clients found.</Typography>
      )}
    </Container>
  );
};

export default HomePage;
