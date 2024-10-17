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

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Matter Name</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mattersLoading
              ? Array.from({ length: rowsPerPage }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={2}>
                      <Skeleton variant="text" />
                    </TableCell>
                  </TableRow>
                ))
              : mattersData.results.map((matter) => (
                  <TableRow
                    key={matter.matterId}
                    hover
                    onClick={() => onOpenDialog(matter)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>{matter.matterName}</TableCell>
                    <TableCell>
                      {new Date(matter.matterDate).toLocaleDateString()}
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
