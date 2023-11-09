import { DataGrid } from "@mui/x-data-grid";
import { Dialog } from "@mui/material";
import React from "react";

export default function ReferenceSelectEditor({ open }: { open: boolean }) {
  return (
    <Dialog open={open}>
      <DataGrid columns={[]} rows={[]} checkboxSelection />
    </Dialog>
  );
}
