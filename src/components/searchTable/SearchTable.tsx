import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Skeleton,
  Paper,
  TableContainer,
  Typography,
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
  onRowsPerPageChange,
  onRowClick,
  isLoading
}: ReusableTableProps) => {

  return (
    <>
    <Typography variant="body2" component="div" sx={{ p: 2 }}>{totalResults} results</Typography>
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
    </>
  );
};

export default SearchTable;