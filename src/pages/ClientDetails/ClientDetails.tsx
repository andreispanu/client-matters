import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Container, Typography, CircularProgress, Alert, Box, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import ReusableDialog from '../../components/reusableDialog'; // Import the reusable dialog
import { ClientData, Matter } from './ClientDetails.types';

// Fetch client data by clientId
const fetchClientData = async (clientId: string): Promise<ClientData> => {
  const { data } = await axios.get(
    `/clientdata/client/${clientId}`,
    {
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    }
  );
  return data;
};

// Fetch matters associated with the client
const fetchClientMatters = async (clientId: string): Promise<{ results: Matter[] }> => {
  const { data } = await axios.get(
    `/clientdata/mattersearch/${clientId}/DATE/ASCENDING/0/10`,
    {
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    }
  );
  return data;
};

const ClientDetails: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>(); // Ensure clientId is a string from the URL parameters
  const [selectedMatter, setSelectedMatter] = useState<Matter | null>(null); // Track the selected matter
  const [open, setOpen] = useState(false); // Track dialog open state

  // Fetch client data
  const { data: clientData, isLoading: clientLoading, error: clientError } = useQuery({
    queryKey: ['client', clientId],
    queryFn: () => fetchClientData(clientId!),
    enabled: !!clientId,
  });

  // Fetch matters data
  const { data: mattersData, isLoading: mattersLoading, error: mattersError } = useQuery({
    queryKey: ['matters', clientId],
    queryFn: () => fetchClientMatters(clientId!),
    enabled: !!clientId,
  });

  // Handle dialog open and close
  const handleOpenDialog = (matter: Matter) => {
    setSelectedMatter(matter);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedMatter(null); // Reset selected matter
  };

  if (clientLoading || mattersLoading) return <CircularProgress />;
  if (clientError || mattersError) return <Alert severity="error">Error fetching data</Alert>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Client Details
      </Typography>

      {/* Client Information */}
      {clientData && (
        <>
          <Typography variant="h6">{clientData.name}</Typography>
          <Typography>{clientData.description}</Typography>

          {/* People Associated with the Client */}
          <Box my={4}>
            <Typography variant="h6">People</Typography>
            {clientData.people.map((person) => (
              <Typography key={person.email}>
                {person.title} {person.firstName} {person.lastName} - {person.email} ({person.phone})
              </Typography>
            ))}
          </Box>
        </>
      )}

      {/* Matters Table */}
      <Typography variant="h6">Matters</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Matter Name</TableCell>
            <TableCell>Matter Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mattersData && mattersData.results.map((matter) => (
            <TableRow key={matter.matterId}>
              <TableCell>{matter.matterName}</TableCell>
              <TableCell>{new Date(matter.matterDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => handleOpenDialog(matter)}>
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Reusable Dialog for Matter Details */}
      <ReusableDialog
        open={open}
        onClose={handleCloseDialog}
        title="Matter Details"
        content={
          selectedMatter && (
            <>
              <Typography>
                <strong>Name:</strong> {selectedMatter.matterName}
              </Typography>
              <Typography>
                <strong>Date:</strong> {new Date(selectedMatter.matterDate).toLocaleDateString()}
              </Typography>
              {selectedMatter.matterDescription && (
                <Typography>
                  <strong>Description:</strong> {selectedMatter.matterDescription}
                </Typography>
              )}
            </>
          )
        }
      />
    </Container>
  );
};

export default ClientDetails;
