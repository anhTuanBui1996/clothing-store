"use client";
import React from "react";
import { GridValidRowModel } from "@mui/x-data-grid";
import DataTableEditor from "@/app/_components/common/DataTableEditor/DataTableEditor";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { gridCols } from "@/app/_dataModels/entity/productService/Product";

export default function Page() {
  const columns = gridCols;
  const rows: readonly GridValidRowModel[] = [];
  return (
    <Box className="page-content" p={3}>
      <Typography marginBottom={4} fontFamily={"inherit"} fontWeight={500}>
        Product
      </Typography>
      <DataTableEditor columns={columns} initialRows={rows} />
    </Box>
  );
}
