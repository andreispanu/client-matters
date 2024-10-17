import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { MatersDialogProps } from "./MattersDialog.types";

export const MatersDialog = ({
  open,
  onClose,
  title,
  content,
  actions,
}: MatersDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent dividers>{content}</DialogContent>
      {actions ? (
        <DialogActions>{actions}</DialogActions>
      ) : (
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
