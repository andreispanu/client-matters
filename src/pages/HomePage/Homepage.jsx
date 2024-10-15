import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Alert } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch clients from the API
const fetchClients = async (searchTerm) => {
  const filter = searchTerm ? searchTerm : ''; 
  if (!filter) return null; 
  const { data } = await axios.get(
    `/clientdata/clientsearch/${filter}/NAME/ASCENDING/0/10`,
    {
      headers: {
        Authorization: 'Bearer ' + process.env.REACT_APP_API_KEY, 
      },
    }
  );
  return data;
};

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searched, setSearched] = useState(false); 
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['clients', searchTerm],
    queryFn: () => fetchClients(searchTerm),
    enabled: false, 
  });

  // Handle search button click
  const handleSearch = () => {
    setSearched(true);
    if (searchTerm) {
      refetch(); 
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Search Clients
      </Typography>
      <Box display="flex" gap={2} mb={4}>
        <TextField
          label="Client Name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {/* Only show results or error if the user has clicked search */}
      {searched && (
        <>
          {isLoading && <CircularProgress />}
          {error && <Alert severity="error">{error.message}</Alert>}

          {/* Show message if no search term is provided */}
          {!searchTerm && (
            <Typography>Please enter a search term to find clients.</Typography>
          )}

          {data && data.results && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Client Name</TableCell>
                  <TableCell>Inception Date</TableCell>
                  <TableCell>Matter Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.results.map((client) => (
                  <TableRow key={client.clientId}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{new Date(client.inception).toLocaleDateString()}</TableCell>
                    <TableCell>{client.matterCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Show message if no results are found */}
          {data && data.results && data.results.length === 0 && (
            <Typography>No clients found.</Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default HomePage;
