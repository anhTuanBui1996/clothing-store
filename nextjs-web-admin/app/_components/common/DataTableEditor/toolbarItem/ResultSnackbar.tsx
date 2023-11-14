import {
  Alert,
  AlertColor,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import React from "react";

export interface SnackbarContentType {
  type?: AlertColor;
  text?: string;
}

export type SnackbarOnCloseHandler = (
  event?: Event | React.SyntheticEvent<any, Event>,
  reason?: SnackbarCloseReason
) => void;

export interface ResultSnackbarProps {
  open: boolean;
  content?: SnackbarContentType;
  onClose: SnackbarOnCloseHandler;
}

export default function ResultSnackbar(props: ResultSnackbarProps) {
  const { open, content, onClose } = props;

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={onClose}>
      <Alert onClose={onClose} severity={content?.type} sx={{ width: "100%" }}>
        {content?.text}
      </Alert>
    </Snackbar>
  );
}
