import { GridColDef, GridRenderCellParams, GridRowId } from "@mui/x-data-grid";

export default interface BaseEntity {
  id?: GridRowId;
  createdDate?: Date;
  createdBy?: string;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;
}

export const gridDefaults: GridColDef[] = [
  {
    field: "lineNo",
    hideable: true,
    sortable: false,
    headerName: "#",
    type: "number",
    flex: 0,
    width: 50,
    editable: false,
    renderCell: (params: GridRenderCellParams) =>
      params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
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
