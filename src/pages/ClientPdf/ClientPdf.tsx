import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import theme from "../../theme";

interface PdfViewerProps {
  fileUrl: string;
}
pdfjs.GlobalWorkerOptions.workerSrc = `./pdf.worker.min.mjs`;

const ClientPdf = ({ fileUrl }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <Container sx={{ backgroundColor: theme.palette.background.default, py: 4 }}>
      <Grid container direction="column" alignItems="center">
        <Grid
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[3],
            p: 2,
            mb: 2,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            maxHeight: "800px",
            overflowY: "auto",
          }}
        >
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            renderMode="canvas"
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              width={600}
              height={800}
              scale={1.2}
            />
          </Document>
        </Grid>

        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Grid>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              Page {pageNumber} of {numPages}
            </Typography>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setPageNumber(pageNumber > 1 ? pageNumber - 1 : 1)}
              disabled={pageNumber === 1}
              sx={{ mx: 1 }}
            >
              Previous
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                setPageNumber(
                  numPages && pageNumber < numPages ? pageNumber + 1 : pageNumber
                )
              }
              disabled={numPages === null || pageNumber === numPages}
              sx={{ mx: 1 }}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClientPdf;
