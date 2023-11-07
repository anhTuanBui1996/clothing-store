"use client";
import React from "react";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import DataTableEditor from "@/components/common/DataTableEditor/DataTableEditor";
import Typography from "@mui/material/Typography";
import { randomId } from "@mui/x-data-grid-generator";
import { Box } from "@mui/material";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 180, editable: true },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 80,
    align: "left",
    headerAlign: "left",
    editable: true,
  },
  {
    field: "joinDate",
    headerName: "Join date",
    type: "dateTime",
    width: 180,
    editable: true,
  },
  {
    field: "joinDate1",
    headerName: "Join date",
    type: "dateTime",
    width: 180,
    editable: true,
  },
  {
    field: "joinDate2",
    headerName: "Join date",
    type: "dateTime",
    width: 180,
    editable: true,
  },
  {
    field: "joinDate3",
    headerName: "Join date",
    type: "dateTime",
    width: 180,
    editable: true,
  },
  {
    field: "joinDate4",
    headerName: "Join date",
    type: "dateTime",
    width: 180,
    editable: true,
  },
  {
    field: "joinDate5",
    headerName: "Join date",
    type: "dateTime",
    width: 180,
    editable: true,
  },
  {
    field: "joinDate6",
    headerName: "Join date",
    type: "dateTime",
    width: 180,
    editable: true,
  },
  {
    field: "joinDate7",
    headerName: "Join date",
    type: "dateTime",
    width: 180,
    editable: true,
  },
  {
    field: "joinDate8",
    headerName: "Join date",
    type: "dateTime",
    width: 180,
    editable: true,
  },
  {
    field: "role",
    headerName: "Department",
    width: 220,
    editable: true,
    type: "singleSelect",
    valueOptions: [
      "Market",
      "Finance",
      "Development",
      { value: null, label: "" },
    ],
  },
];

const rows: GridRowsProp = [
  {
    id: randomId(),
    name: "Test",
    joinDate: new Date(),
    age: 12,
    role: "Finance",
  },
];

export default function Page() {
  return (
    <Box>
      <Typography marginBottom={4} fontFamily={"inherit"} fontWeight={500}>
        Product
      </Typography>
      <DataTableEditor columns={columns} initialRows={rows} />
    </Box>
  );
}
