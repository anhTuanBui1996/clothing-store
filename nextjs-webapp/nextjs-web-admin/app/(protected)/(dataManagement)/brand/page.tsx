"use client";
import React from "react";
import { GridValidRowModel } from "@mui/x-data-grid";
import DataTableEditor from "@/app/_components/common/DataTableEditor/DataTableEditor";
import Typography from "@mui/material/Typography";
import { Box, Chip } from "@mui/material";
import { gridCols } from "@/app/_dataModels/entity/productService/Brand";

export default function Page() {
  const columns = gridCols;
  const rows: readonly GridValidRowModel[] = [];
  return (
    <Box className="page-content" p={3}>
      <Typography marginBottom={1} fontFamily={"inherit"} fontWeight={500}>
        Brand
      </Typography>
      <DataTableEditor columns={columns} initialRows={rows} />
    </Box>
  );
}
