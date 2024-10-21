import React, { useState, useEffect } from "react";
import { Container, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchTable from "../../components/searchTable";
import SearchBar from "../../components/searchBar/SearchBar";
import { SearchContainer, SearchContent } from "./SearchPage.styles";
import Grid from "@mui/material/Grid2";
import ErrorSnackbar from "../../components/errorSnackbar";

const fetchClients = async (
  searchTerm,
  page,
  rowsPerPage,
  sortBy,
  sortOrder
) => {
  const filter = searchTerm;
  const index = page * rowsPerPage;
  const offset = rowsPerPage;
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

const fetchClientDetails = async (clientId) => {
  const { data } = await axios.get(`/ClientData/client/${clientId}`, {
    headers: {
      Authorization: process.env.REACT_APP_API_KEY,
    },
  });
  return data;
};

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchedTerm, setFetchedTerm] = useState("");
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState("NAME");
  const [sortOrder, setSortOrder] = useState("asc");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const [clientDetails, setClientDetails] = useState({});
  const navigate = useNavigate();

  const {
    data: clientsData,
    error: clientsError,
    isLoading: clientsLoading,
    refetch: refetchClients,
  } = useQuery({
    queryKey: ["clients", fetchedTerm, page, 10, sortBy, sortOrder],
    queryFn: () => fetchClients(fetchedTerm, page, 10, sortBy, sortOrder),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (fetchedTerm) {
      refetchClients();
    }
  }, [fetchedTerm, page, sortBy, sortOrder, refetchClients]);

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

  const combinedResults =
    clientsData?.results?.map((client) => {
      const clientDetail = clientDetails[client.clientId];
      return {
        ...client,
        name: clientDetail?.name || client.name,
        description: clientDetail?.description || <Skeleton type="text" />,
        code: clientDetail?.code || "No code available",
      };
    }) || [];

  const handleSearch = () => {
    setPage(0);
    if (searchTerm === "") {
      setSnackbarMessage("Please enter a search term.");
      setSnackbarOpen(true);
    } else {
      setFetchedTerm(searchTerm);
      setIsSearchTriggered(true);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setIsSearchTriggered(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSortByDate = () => {
    const isAsc = sortBy === "DATE" && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortBy("DATE");
  };

  const handleSortByName = () => {
    const isAsc = sortBy === "NAME" && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortBy("NAME");
  };

  const handleRowClick = (clientId) => {
    navigate(`/client/${clientId}`);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (clientsError) {
      setSnackbarMessage(clientsError.message);
      setSnackbarOpen(true);
    } else if (
      clientsData?.searchError &&
      clientsData.searchError !== "Index and Offset out of range."
    ) {
      setSnackbarMessage(clientsData.searchError);
      setSnackbarOpen(true);
    }
  }, [clientsError, clientsData?.searchError]);

  const totalResults = clientsData?.totalResults || 0;
  const displayedFrom = page * 10 + 1;
  const displayedTo = Math.min((page + 1) * 10, totalResults);

  return (
    <Container>
      <SearchContainer>
        <SearchContent>
          <Grid container spacing={4}>
            <Grid size={12}>
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                onSearch={handleSearch}
                onClearSearch={handleClearSearch}
              />
            </Grid>
          </Grid>
        </SearchContent>
      </SearchContainer>

      {combinedResults && combinedResults.length !== 0 && isSearchTriggered && (
        <SearchTable
          data={combinedResults}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortByName={handleSortByName}
          onSortByDate={handleSortByDate}
          page={page}
          totalResults={totalResults}
          displayedFrom={displayedFrom}
          displayedTo={displayedTo}
          onPageChange={handleChangePage}
          onRowClick={handleRowClick}
          isLoading={clientsLoading}
        />
      )}
      <ErrorSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default SearchPage;
