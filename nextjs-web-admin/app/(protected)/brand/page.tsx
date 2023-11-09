"use client";
import React from "react";
import { GridValidRowModel } from "@mui/x-data-grid";
import DataTableEditor from "@/components/common/DataTableEditor/DataTableEditor";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { gridCols } from "@/data/entity/productService/Brand";

export default function Page() {
  const columns = gridCols;
  const rows: readonly GridValidRowModel[] = [];
  return (
    <Box>
      <Typography marginBottom={4} fontFamily={"inherit"} fontWeight={500}>
        Product
      </Typography>
      <DataTableEditor columns={columns} initialRows={rows} />
    </Box>
  );
}
