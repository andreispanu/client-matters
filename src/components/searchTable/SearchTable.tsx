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
import { ReusableTableProps } from "./SearchTable.types";
import { formatCustomDate } from "../../utils";

const SearchTable = ({
  data,
  sortBy,
  sortOrder,
  onSortByName,
  onSortByDate,
  page,
  totalResults,
  onPageChange,
  onRowClick,
  isLoading,
  displayedFrom,
  displayedTo,
}: ReusableTableProps) => {
  const totalPages = Math.ceil(totalResults / 10);

  return (
    <>
      <Typography
        variant="body2"
        component="div"
        sx={{ p: 2, width: "100%", textAlign: "right" }}
      >
        Displaying {displayedFrom} - {displayedTo} of {totalResults} results
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
              <TableCell>Client Description</TableCell>
              <TableCell>Client Code</TableCell>
              <TableCell
                sortDirection={sortBy === "DATE" ? sortOrder : false}
                align="right"
              >
                <TableSortLabel
                  active={sortBy === "DATE"}
                  direction={sortOrder}
                  onClick={onSortByDate}
                >
                  Inception Date
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
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
                    <TableCell>{client.description}</TableCell>
                    <TableCell>{client.code}</TableCell>
                    <TableCell align="right">
                      {formatCustomDate(client.inception)}
                    </TableCell>
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
