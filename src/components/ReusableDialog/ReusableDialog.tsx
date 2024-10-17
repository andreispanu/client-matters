import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { ReusableDialogProps } from "./ReusableDialog.types";

const ReusableDialog = ({
  open,
  onClose,
  title,
  content,
  actions,
}: ReusableDialogProps) => {
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

export default ReusableDialog;
