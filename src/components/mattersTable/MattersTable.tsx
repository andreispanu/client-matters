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

  console.log(mattersData);

  return (
    <>
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
                    <TableCell>
                    {matter.matterName}
                    </TableCell>
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
