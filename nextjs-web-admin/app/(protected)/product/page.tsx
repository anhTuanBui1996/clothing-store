"use client";
import React from "react";
import { GridColDef, GridRowsProp, GridValidRowModel } from "@mui/x-data-grid";
import DataTableEditor from "@/components/common/DataTableEditor/DataTableEditor";
import Typography from "@mui/material/Typography";
import { randomId } from "@mui/x-data-grid-generator";
import { Box } from "@mui/material";
import { gridCols } from "@/data/entity/productService/Product";

export default function Page() {
  const columns = gridCols;
  const rows: readonly GridValidRowModel[] = [
    { id: randomId(), productId: "Test product" },
  ];
  return (
    <Box>
      <Typography marginBottom={4} fontFamily={"inherit"} fontWeight={500}>
        Product
      </Typography>
      <DataTableEditor columns={columns} initialRows={rows} />
    </Box>
  );
}
