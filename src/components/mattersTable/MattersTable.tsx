import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
  Skeleton,
  Paper,
  TableContainer,
} from "@mui/material";
import { MattersTableProps } from "./MattersTable.types";

const MattersTable = ({
  mattersLoading,
  mattersData,
  onOpenDialog,
}: MattersTableProps) => {
  return (
    <div>
      {mattersLoading ? (
        <Box>
          {Array.from(new Array(3)).map((_, index) => (
            <Box key={index} mb={2}>
              <Skeleton variant="rectangular" height={40} />
            </Box>
          ))}
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Matter Name</TableCell>
                <TableCell>Matter Date</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mattersData &&
                mattersData.results.map((matter) => (
                  <TableRow key={matter.matterId}>
                    <TableCell>{matter.matterName}</TableCell>
                    <TableCell>
                      {new Date(matter.matterDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        onClick={() => onOpenDialog(matter)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default MattersTable;
