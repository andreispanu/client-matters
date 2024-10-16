import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Skeleton,
} from "@mui/material";
import { format } from "date-fns";
import { ReusableTableProps } from "./ReusableTable.types";

const ReusableTable = ({
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
  const rowsPerPageOptions = [5, 10, 30, 50];

  return (
    <>
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

            <TableCell>Matter Count</TableCell>
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
                    {format(new Date(client.inception), "MM/dd/yyyy")}
                  </TableCell>
                  <TableCell>{client.matterCount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={totalResults}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </>
  );
};

export default ReusableTable;
