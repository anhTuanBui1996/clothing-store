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
  {
    field: "createdDate",
    headerName: "Created Date",
    type: "dateTime",
    flex: 0,
    width: 200,
    editable: false,
  },
  {
    field: "createdBy",
    headerName: "Created By",
    type: "string",
    flex: 0,
    width: 120,
    editable: false,
  },
  {
    field: "lastModifiedDate",
    headerName: "Last Modified Date",
    type: "dateTime",
    flex: 0,
    width: 200,
    editable: false,
  },
  {
    field: "lastModifiedBy",
    headerName: "Last Modified By",
    type: "string",
    flex: 0,
    width: 160,
    editable: false,
  },
];
