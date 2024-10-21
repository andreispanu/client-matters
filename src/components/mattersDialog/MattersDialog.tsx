import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Skeleton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { MatersDialogProps } from "./MattersDialog.types";
import { formatCustomDateTime } from "../../utils";

export const MatersDialog = ({
  open,
  onClose,
  content,
  actions,
  contentError,
  contentLoading,
}: MatersDialogProps) => {
  const { matterName, matterCode, matterDate, matterDescription } = content;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent dividers>
        {contentLoading ? (
          <div>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="rectangular" width="100%" height={100} />
          </div>
        ) : contentError ? (
          <div>Error loading data</div>
        ) : (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body1" fontWeight={'500'}>Matter Name:</Typography>
              <Typography variant="body2">{matterName}</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body1" fontWeight={'500'}>Matter Code:</Typography>
              <Typography variant="body2">{matterCode}</Typography>
            </Grid>
            <Grid size={{ xs: 12}}>
              <Typography variant="body1" fontWeight={'500'}>Inception Date:</Typography>
              <Typography variant="body2">
                {formatCustomDateTime(matterDate)}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body1" fontWeight={'500'}>Matter Description:</Typography>
              <Typography variant="body2">{matterDescription}</Typography>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      {actions ? (
        <DialogActions>{actions}</DialogActions>
      ) : (
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Back
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
