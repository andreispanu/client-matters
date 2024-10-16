import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Container, Typography, Alert, Box, Skeleton } from "@mui/material";
import ReusableDialog from "../../components/reusableDialog";
import { ClientData, Matter } from "./ClientDetails.types";
import MattersTable from "../../components/mattersTable";
import {
  StyledClientDetailsPageHeading,
  StyledClientDetailsContainer,
  StyledClientDetailsCopy,
} from "./ClientDetails.styles";

// Fetch client data by clientId
const fetchClientData = async (clientId: string): Promise<ClientData> => {
  const { data } = await axios.get(`/clientdata/client/${clientId}`, {
    headers: {
      Authorization: process.env.REACT_APP_API_KEY,
    },
  });
  return data;
};

// Fetch matters associated with the client
const fetchClientMatters = async (
  clientId: string
): Promise<{ results: Matter[] }> => {
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

const ClientDetails = () => {
  const { clientId } = useParams<{ clientId: string }>(); // Ensure clientId is a string from the URL parameters
  const [selectedMatter, setSelectedMatter] = useState<Matter | null>(null); // Track the selected matter
  const [open, setOpen] = useState(false); // Track dialog open state

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

  // Fetch matters data
  const {
    data: mattersData,
    isLoading: mattersLoading,
    error: mattersError,
  } = useQuery({
    queryKey: ["matters", clientId],
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

  if (clientError || mattersError)
    return <Alert severity="error">Error fetching data</Alert>;

  return (
    <Container>
      <StyledClientDetailsContainer>
        <StyledClientDetailsPageHeading>
          Client Details
        </StyledClientDetailsPageHeading>
      </StyledClientDetailsContainer>

      {/* Client Information */}
      {clientLoading ? (
        <>
          <Skeleton variant="text" width="50%" height={40} />
          <Skeleton variant="text" width="80%" height={30} />
        </>
      ) : (
        clientData && (
          <>
            <StyledClientDetailsCopy>{clientData.name}</StyledClientDetailsCopy>
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
        mattersData={mattersData}
        onOpenDialog={handleOpenDialog}
      />

      {/* Dialog for matter details */}
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
                <strong>Date:</strong>{" "}
                {new Date(selectedMatter.matterDate).toLocaleDateString()}
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
    </Container>
  );
};

export default ClientDetails;
