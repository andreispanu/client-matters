import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Skeleton,
  Paper,
  TableContainer,
  Typography,
  Pagination,
} from "@mui/material";
import { format } from "date-fns";
import { ReusableTableProps } from "./SearchTable.types";

const SearchTable = ({
  data,
  sortBy,
  sortOrder,
  onSortByName,
  onSortByDate,
  page,
  rowsPerPage,
  totalResults,
  onPageChange,
  onRowClick,
  isLoading,
  displayedFrom,
  displayedTo,
}: ReusableTableProps) => {
  // Calculate total number of pages
  const totalPages = Math.ceil(totalResults / rowsPerPage);

  return (
    <>
      <Typography variant="body2" component="div" sx={{ p: 2, width: '100%', textAlign:'right'}}>
        Displaying {displayedFrom}–{displayedTo} of {totalResults} results
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sortDirection={sortBy === "NAME" ? sortOrder : false}>
                <TableSortLabel
                  active={sortBy === "NAME"}
                  direction={sortOrder}
                  onClick={onSortByName}
                >
                  Client Name
                </TableSortLabel>
              </TableCell>

              <TableCell sortDirection={sortBy === "DATE" ? sortOrder : false}>
                <TableSortLabel
                  active={sortBy === "DATE"}
                  direction={sortOrder}
                  onClick={onSortByDate}
                >
                  Inception Date
                </TableSortLabel>
              </TableCell>

              <TableCell align="right">Matter Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? Array.from({ length: rowsPerPage }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                  </TableRow>
                ))
              : data.map((client) => (
                  <TableRow
                    key={client.clientId}
                    onClick={() => onRowClick(client.clientId)}
                    hover
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>{client.name}</TableCell>
                    <TableCell>
                      {format(new Date(client.inception), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell align="right">{client.matterCount}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MUI Pagination Component */}
      <Pagination
        count={totalPages} // Total number of pages
        page={page + 1} // Pagination uses 1-based index, adjust for 0-based page state
        onChange={(event, value) => onPageChange(event, value - 1)} // Adjust back to 0-based index
        color="primary"
        sx={{ mt: 2, display: "flex", justifyContent: "center" }} // Add spacing and centering
      />
    </>
  );
};

export default SearchTable;
