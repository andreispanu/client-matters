import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Skeleton,
  Paper,
  TableContainer,
  Pagination,
  Box,
  Typography,
} from "@mui/material";
import { MattersTableProps } from "./MattersTable.types";
import { formatCustomDate } from "../../utils";

const MattersTable = ({
  mattersLoading,
  mattersData,
  page,
  rowsPerPage,
  totalResults,
  onPageChange,
  onOpenDialog,
}: MattersTableProps) => {
  const totalPages = Math.ceil(totalResults / rowsPerPage);
  const displayedFrom = page * 10 + 1;
  const displayedTo = Math.min((page + 1) * 10, totalResults);

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
              <TableCell>Matter Code</TableCell>
              <TableCell>Matter Name</TableCell>
              <TableCell align="right">Inception Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mattersLoading
              ? Array.from({ length: rowsPerPage }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={3}>
                      <Skeleton variant="text" />
                    </TableCell>
                  </TableRow>
                ))
              : mattersData.results.map((matter) => (
                  <TableRow
                    key={matter.matterId}
                    hover
                    style={{ cursor: "pointer" }}
                    onClick={() => onOpenDialog(matter)}
                  >
                    <TableCell>{matter.matterCode}</TableCell>
                    <TableCell>{matter.matterName}</TableCell>
                    <TableCell align="right">
                      {formatCustomDate(matter.matterDate)}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={(event, value) => onPageChange(event, value - 1)}
          color="primary"
        />
      </Box>
    </>
  );
};

export default MattersTable;
