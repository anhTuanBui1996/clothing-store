import { GridRenderCellParams } from "@mui/x-data-grid";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";

export function BooleanSelect(params: GridRenderCellParams) {
  const { value } = params;
  return value ? (
    <CheckCircleIcon color="success" />
  ) : (
    <CancelIcon color="error" />
  );
}
