import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export interface DialogContentType {
  title?: string;
  body?: string;
}

export type DialogConfirmationOnCloseHandler = (isConfirm: boolean) => void;

export interface ConfirmDialogProps {
  open: boolean;
  content?: DialogContentType;
  onClose?: (isConfirm: boolean) => void;
}

export default function ConfirmDialog(props: ConfirmDialogProps) {
  const { open, content, onClose } = props;

  const handleCancel = () => {
    if (onClose) {
      onClose(false);
    }
  };

  const handleConfirm = () => {
    if (onClose) {
      onClose(true);
    }
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      keepMounted
    >
      <DialogTitle>{content?.title}</DialogTitle>
      <DialogContent dividers>{content?.body}</DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm}>Yes</Button>
        <Button autoFocus onClick={handleCancel}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
