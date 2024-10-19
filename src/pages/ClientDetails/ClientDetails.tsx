import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Container, Typography, Alert, Box, Skeleton } from "@mui/material";
import MatersDialog from "../../components/mattersDialog";
import { ClientData, Matter } from "./ClientDetails.types";
import MattersTable from "../../components/mattersTable";
import {
  StyledClientDetailsPageHeading,
  StyledClientDetailsContainer,
  StyledClientDetailsCopy,
} from "./ClientDetails.styles";
import { formatCustomDate } from "../../utils";

// Fetch client data by clientId
const fetchClientData = async (clientId: string): Promise<ClientData> => {
  const { data } = await axios.get(`/clientdata/client/${clientId}`, {
    headers: {
      Authorization: process.env.REACT_APP_API_KEY,
    },
  });
  return data;
};

// Fetch matters associated with the client with pagination
const fetchClientMatters = async (
  clientId: string,
  page: number,
  rowsPerPage: number,
  sortBy: string = "DATE",
  sortOrder: string = "ASCENDING"
): Promise<{ results: Matter[]; totalResults: number }> => {
  const index = page * rowsPerPage; // Calculate index for API
  const offset = rowsPerPage; // Number of rows per page

  const { data } = await axios.get(
    `/clientdata/mattersearch/${clientId}/${sortBy}/${sortOrder}/${index}/${offset}`,
    {
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    }
  );
  return data;
};

const ClientDetails = () => {
  const { clientId } = useParams<{ clientId: string }>(); // Ensure clientId is a string from the URL parameters
  const [selectedMatter, setSelectedMatter] = useState<Matter | null>(null); // Track the selected matter
  const [open, setOpen] = useState(false); // Track dialog open state

  // Pagination state
  const [page, setPage] = useState(0); // Current page, 0-based index
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page

  // Fetch client data
  const {
    data: clientData,
    isLoading: clientLoading,
    error: clientError,
  } = useQuery({
    queryKey: ["client", clientId],
    queryFn: () => fetchClientData(clientId!),
    enabled: !!clientId,
  });

  // Fetch matters data with pagination
  const {
    data: mattersData,
    isLoading: mattersLoading,
    error: mattersError,
  } = useQuery({
    queryKey: ["matters", clientId, page, rowsPerPage],
    queryFn: () => fetchClientMatters(clientId!, page, rowsPerPage),
    enabled: !!clientId,
  });

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  // Handle dialog open and close
  const handleOpenDialog = (matter: Matter) => {
    setSelectedMatter(matter);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedMatter(null);
  };

  if (clientError || mattersError)
    return <Alert severity="error">Error fetching data</Alert>;

  return (
    <>
      <Container>
        <StyledClientDetailsContainer>
          <StyledClientDetailsPageHeading>
            Client Details
          </StyledClientDetailsPageHeading>
        </StyledClientDetailsContainer>

        {clientLoading ? (
          <>
            <Skeleton variant="text" width="50%" height={40} />
            <Skeleton variant="text" width="80%" height={30} />
          </>
        ) : (
          clientData && (
            <>
              <StyledClientDetailsCopy>
                {clientData.name}
              </StyledClientDetailsCopy>
              <Typography>{clientData.description}</Typography>

              {/* People Associated with the Client */}
              <Box my={4}>
                <Typography variant="h6">People</Typography>
                {clientData.people.map((person) => (
                  <Typography key={person.email}>
                    {person.title} {person.firstName} {person.lastName} -{" "}
                    {person.email} ({person.phone})
                  </Typography>
                ))}
              </Box>
            </>
          )
        )}

        <StyledClientDetailsContainer>
          <StyledClientDetailsPageHeading>
            Client Matters
          </StyledClientDetailsPageHeading>
        </StyledClientDetailsContainer>

        <MattersTable
          mattersLoading={mattersLoading}
          mattersData={mattersData || { results: [], totalResults: 0 }}
          page={page}
          rowsPerPage={rowsPerPage}
          totalResults={mattersData?.totalResults || 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleRowsPerPageChange}
          onOpenDialog={handleOpenDialog}
        />
      </Container>

      {/* Dialog for matter details */}
      <MatersDialog
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
                <strong>Date:</strong>{" "}
                {formatCustomDate(selectedMatter.matterDate)}
              </Typography>
              {selectedMatter.matterDescription && (
                <Typography>
                  <strong>Description:</strong>{" "}
                  {selectedMatter.matterDescription}
                </Typography>
              )}
            </>
          )
        }
      />
    </>
  );
};

export default ClientDetails;
