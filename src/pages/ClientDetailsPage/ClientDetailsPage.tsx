import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Container, Alert, Box, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MatersDialog from "../../components/mattersDialog";
import { ClientData, Matter, MattersData } from "./ClientDetailsPage.types";
import MattersTable from "../../components/mattersTable";
import ClientDetails from "../../components/clientDetails";
import ClientContacts from "../../components/clientContacts";
import { StyledTab, StyledTabPanel } from "./ClientDetailsPage.styles";
import theme from "../../theme";
import BackButton from "../../components/backButton";

const fetchClientData = async (clientId: string): Promise<ClientData> => {
  const { data } = await axios.get(`/clientdata/client/${clientId}`, {
    headers: {
      Authorization: process.env.REACT_APP_API_KEY,
    },
  });
  return data;
};

const fetchClientMatters = async (
  clientId: string,
  page: number,
  sortBy: string = "DATE",
  sortOrder: string = "ASCENDING",
  rowsPerPage: number = 10
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

const fetchMatterDetails = async (matterId: string): Promise<MattersData> => {
  const { data } = await axios.get(`/clientdata/matter/${matterId}`, {
    headers: {
      Authorization: process.env.REACT_APP_API_KEY,
    },
  });
  return data;
};

const ClientDetailsPage = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [selectedMatter, setSelectedMatter] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [tabIndex, setTabIndex] = useState(0);

  const rowsPerPage = 10;

  const {
    data: clientData,
    isLoading: clientLoading,
    error: clientError,
  } = useQuery({
    queryKey: ["client", clientId],
    queryFn: () => fetchClientData(clientId!),
    enabled: !!clientId,
  });

  const {
    data: mattersData,
    isLoading: mattersLoading,
    error: mattersError,
  } = useQuery({
    queryKey: ["matters", clientId, page, sortBy, sortOrder],
    queryFn: () =>
      fetchClientMatters(
        clientId!,
        page,
        sortBy === "name" ? "NAME" : "DATE",
        sortOrder === "asc" ? "ASCENDING" : "DESCENDING",
        rowsPerPage
      ),
    enabled: !!clientId,
  });

  const {
    data: matterDetails,
    isLoading: matterDetailsLoading,
    error: matterDetailsError,
  } = useQuery({
    queryKey: ["matterDetails", selectedMatter],
    queryFn: () => fetchMatterDetails(selectedMatter),
    enabled: !!selectedMatter,
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSortChange = (column: string) => {
    const isAsc = sortBy === column && sortOrder === "asc";
    setSortBy(column);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  const handleOpenDialog = (matterId: string) => {
    setSelectedMatter(matterId);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedMatter("");
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  if (clientError || mattersError)
    return <Alert severity="error">Error fetching data</Alert>;

  return (
    <>
      <Container>
        <Grid container spacing={4} mt={theme.spacing(2)}>
          <Grid size={12}>
            <StyledTabPanel
              value={tabIndex}
              onChange={handleTabChange}
              aria-label="Client details and matters tabs"
            >
              <StyledTab label="Client Details" />
              <StyledTab label="Matters" />
            </StyledTabPanel>

            {tabIndex === 0 && (
              <Box mt={3}>
                {clientLoading ? (
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={200}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={200}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
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
                      <Grid size={{ xs: 12 }}>
                        <ClientDetails
                          clientName={clientData.name}
                          clientDescription={clientData.description}
                          clientInceptionDate={clientData.inceptionDate}
                          address={clientData.address}
                        />
                      </Grid>
                      <Grid size={12} p={theme.spacing(2)}>
                        <ClientContacts clientContacts={clientData.people} />
                      </Grid>
                    </Grid>
                  )
                )}
              </Box>
            )}

            {tabIndex === 1 && (
              <Box mt={3} p={theme.spacing(2)}>
                <MattersTable
                  mattersLoading={mattersLoading}
                  mattersData={mattersData || { results: [], totalResults: 0 }}
                  page={page}
                  totalResults={mattersData?.totalResults || 0}
                  onPageChange={handleChangePage}
                  onOpenDialog={handleOpenDialog}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSortChange={handleSortChange}
                />
              </Box>
            )}

            <BackButton linkDetails="/" label="Back to Search" />
          </Grid>
        </Grid>
      </Container>

      <MatersDialog
        open={open}
        onClose={handleCloseDialog}
        content={
          matterDetails ?? {
            clientId: "",
            matterId: selectedMatter,
            matterCode: "",
            matterName: "",
            matterDescription: "",
            matterDate: "",
          }
        }
        contentLoading={matterDetailsLoading}
        contentError={
          matterDetailsError ? matterDetailsError.message : undefined
        }
      />
    </>
  );
};

export default ClientDetailsPage;
