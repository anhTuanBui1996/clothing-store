import { GridColDef } from "@mui/x-data-grid";

export const gridDefaults: GridColDef[] = [
  {
    field: "lineNo",
    hideable: true,
    sortable: false,
    headerName: "#",
    headerAlign: "left",
    type: "number",
    flex: 0,
    width: 50,
    editable: false,
    align: "left",
  },
];
