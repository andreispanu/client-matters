import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SearchDropdownBar from "../../components/searchDropdownBar";
import { formatCustomDate } from "../../utils";
import { useNavigate } from "react-router-dom";
import theme from "../../theme";

export interface ClientResult {
  clientId: string;
  inception: string;
  matterCount: number;
  name: string;
}

export interface Client {
  filter: string;
  index: number;
  offset: number;
  orderBy: string;
  results: ClientResult[];
  returnedResults: number;
  searchError: string | null;
  searcOrder: string;
  totalResults: number;
}

const fetchClients = async (filter: string) => {
  const clientOrderBy = "NAME";
  const order = "ASCENDING";
  const index = 0;
  const offset = 10;

  try {
    const { data } = await axios.get(
      `/clientdata/clientsearch/${filter}/${clientOrderBy}/${order}/${index}/${offset}`,
      {
        headers: {
          Authorization: process.env.REACT_APP_API_KEY,
        },
      }
    );
    return data as Client;
  } catch (error) {
    const err = error as any;
    throw new Error(err.response?.data?.message || "Error fetching data.");
  }
};

const SearchDropdown = () => {
  const [filter, setFilter] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [clientTable, setClientTable] = useState<ClientResult>();
  const navigate = useNavigate();

  const {
    data: clientsData,
    error: clientsError,
    isLoading: clientsLoading,
    refetch: refetchClients,
  } = useQuery({
    queryKey: ["clients", filter],
    queryFn: () => fetchClients(filter),
    enabled: !!filter,
  });

  useEffect(() => {
    if (selectedClient) {
      clientsData?.results.forEach((client) => {
        if (client.name === selectedClient) {
          setClientTable(client);
        }
      });
    }
  }, [selectedClient, clientsData]);

  const handleRowClick = (clientId: string) => {
    navigate(`/client/${clientId}`);
  };

  return (
    <Container maxWidth={false} sx={{ paddingX: 0 }}>
      <SearchDropdownBar
        searchTerm={filter}
        onSearch={refetchClients}
        onSearchChange={(event) => setFilter(event.target.value)}
        onClearSearch={() => setFilter("")}
        suggestions={clientsData?.results || []}
        loading={clientsLoading}
        onChange={(value) => value && setSelectedClient(value)}
      />
      {clientsError && <div>{clientsError.message}</div>}
      {clientsData && clientTable && (
        <TableContainer component={Paper} sx={{ maxWidth: theme.breakpoints.values.md, marginTop: theme.spacing(3), margin: '60px auto' }}>
          <Table sx={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell>Client Name</TableCell>
                <TableCell>Matter Count</TableCell>
                <TableCell align="right">Inception Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={clientTable.clientId}
                onClick={() => handleRowClick(clientTable.clientId)}
                hover
                style={{ cursor: "pointer" }}
              >
                <TableCell>{clientTable.name}</TableCell>
                <TableCell>{clientTable.matterCount}</TableCell>
                <TableCell align="right">
                  {formatCustomDate(clientTable.inception)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default SearchDropdown;
