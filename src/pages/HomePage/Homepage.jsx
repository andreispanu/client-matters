import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Alert, TablePagination, TableSortLabel, InputAdornment, IconButton } from '@mui/material';
import { Search, Clear } from '@mui/icons-material'; 
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import { format } from 'date-fns';

// Function to fetch clients from the API with sorting
const fetchClients = async (searchTerm, page, rowsPerPage, sortBy, sortOrder) => {
  const filter = searchTerm ? searchTerm : '*'; // Fetch all data if no search term is provided
  const index = page * rowsPerPage;
  const offset = rowsPerPage;
  const order = sortOrder === 'asc' ? 'ASCENDING' : 'DESCENDING';
  const { data } = await axios.get(
    `/clientdata/clientsearch/${filter}/${sortBy}/${order}/${index}/${offset}`,
    {
      headers: {
        Authorization: process.env.REACT_APP_API_KEY, // Ensure the API key is retrieved correctly from your environment
      },
    }
  );
  return data;
};

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0); // Track current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Track rows per page
  const [sortBy, setSortBy] = useState('NAME'); // Sort by NAME by default
  const [sortOrder, setSortOrder] = useState('asc'); // Sort order, default to ascending
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  // Fetch data using the query
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['clients', searchTerm, page, rowsPerPage, sortBy, sortOrder],
    queryFn: () => fetchClients(searchTerm, page, rowsPerPage, sortBy, sortOrder),
    enabled: !!searchTerm, // Only run query when there is a search term
    refetchOnWindowFocus: false,
  });

  // Handle search button click
  const handleSearch = () => {
    setPage(0); // Reset to the first page when searching
    refetch();
  };

  // Handle clearing the search term
  const handleClearSearch = () => {
    setSearchTerm(''); // Clear search input
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
    const isAsc = sortBy === 'DATE' && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy('DATE');
    refetch();
  };

  // Handle sorting by Name
  const handleSortByName = () => {
    const isAsc = sortBy === 'NAME' && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy('NAME');
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
      <Box display="flex" gap={2} mb={4}>
        <TextField
          label="Search clients"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch}>
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {/* Show loading spinner or error */}
      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">{error.message}</Alert>}

      {!searchTerm && (
        <Typography variant="body1">Please enter a search term to find clients.</Typography>
      )}

      {data && data.results && searchTerm && (
        <>
          <Table>
            <TableHead>
              <TableRow>
                {/* Sort by Name */}
                <TableCell sortDirection={sortBy === 'NAME' ? sortOrder : false}>
                  <TableSortLabel
                    active={sortBy === 'NAME'}
                    direction={sortOrder}
                    onClick={handleSortByName}
                  >
                    Client Name
                  </TableSortLabel>
                </TableCell>

                {/* Sort by Date */}
                <TableCell sortDirection={sortBy === 'DATE' ? sortOrder : false}>
                  <TableSortLabel
                    active={sortBy === 'DATE'}
                    direction={sortOrder}
                    onClick={handleSortByDate}
                  >
                    Inception Date
                  </TableSortLabel>
                </TableCell>

                <TableCell>Matter Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.results.map((client) => (
                <TableRow key={client.clientId} onClick={() => handleRowClick(client.clientId)} style={{ cursor: 'pointer' }}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{format(new Date(client.inception), 'MM/dd/yyyy')}</TableCell>
                  <TableCell>{client.matterCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={data.totalResults || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 30, 50]}
          />
        </>
      )}

      {data && data.results && data.results.length === 0 && (
        <Typography>No clients found.</Typography>
      )}
    </Container>
  );
};

export default HomePage;
