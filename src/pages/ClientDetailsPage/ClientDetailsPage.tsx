import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Container,
  Typography,
  Alert,
  Box,
  Skeleton,
  Tabs,
  Tab,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import MatersDialog from "../../components/mattersDialog";
import { ClientData, Matter } from "./ClientDetailsPage.types";
import MattersTable from "../../components/mattersTable";
import { formatCustomDate } from "../../utils";
import ClientAdress from "../../components/clientAdress";
import ClientDetails from "../../components/clientDetails";
import ClientContacts from "../../components/clientContacts";
import { StyledTab, StyledTabPanel } from "./ClientDetailsPage.styles";

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
  const index = page * rowsPerPage;
  const offset = rowsPerPage;

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

const ClientDetailsPage = () => {
  const { clientId } = useParams<{ clientId: string }>(); // Ensure clientId is a string from the URL parameters
  const [selectedMatter, setSelectedMatter] = useState<Matter | null>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tabIndex, setTabIndex] = useState(0); // Track selected tab

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (matter: Matter) => {
    setSelectedMatter(matter);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedMatter(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  if (clientError || mattersError)
    return <Alert severity="error">Error fetching data</Alert>;

  return (
    <>
      <Container>
        <Grid container spacing={4}>
          <Grid size={12}>
            <StyledTabPanel
              value={tabIndex}
              onChange={handleTabChange}
              aria-label="Client details and matters tabs"
            >
              <StyledTab label="Details" />
              <StyledTab label="Matters" />
            </StyledTabPanel>

            {/* Tab Panel 1: Client Details */}
            {tabIndex === 0 && (
              <Box mt={3}>
                {clientLoading ? (
                  <Grid container spacing={2}>
                    <Grid size={{xs: 12, md:6}}>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={200}
                      />
                    </Grid>
                    <Grid size={{xs: 12, md:6}}>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={200}
                      />
                    </Grid>
                    <Grid size={{xs: 12}}>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={150}
                      />
                    </Grid>
                  </Grid>
                ) : (
                  clientData && (
                    <Grid container spacing={2}>
                      <Grid size={{xs: 12, md:6}}>
                        <ClientDetails
                          clientName={clientData.name}
                          clientDescription={clientData.description}
                          clientInceptionDate={clientData.inceptionDate}
                        />
                      </Grid>
                      <Grid size={{xs: 12, md:6}}>
                        <ClientAdress addressDetails={clientData.address} />
                      </Grid>
                      <Grid size={12}>
                        <ClientContacts clientContacts={clientData.people} />
                      </Grid>
                    </Grid>
                  )
                )}
              </Box>
            )}

            {/* Tab Panel 2: Client Matters */}
            {tabIndex === 1 && (
              <Box mt={3}>
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
              </Box>
            )}
          </Grid>
        </Grid>
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

export default ClientDetailsPage;
