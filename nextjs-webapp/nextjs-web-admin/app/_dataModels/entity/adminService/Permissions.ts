import { gridDefaults } from "@/app/_dataModels/core/BaseEntity";
import { GridColDef } from "@mui/x-data-grid";

export const gridColsForRoleView: GridColDef[] = gridDefaults.concat([
  {
    field: "menuName",
    headerName: "Menu Name",
    type: "string",
    width: 300,
    editable: false,
  },
  {
    field: "canModified",
    headerName: "Can Modified",
    type: "boolean",
    width: 200,
    editable: false,
  },
  {
    field: "canView",
    headerName: "Can View",
    type: "boolean",
    width: 200,
    editable: false,
  },
]);

export const gridCols: GridColDef[] = gridDefaults.concat([
  {
    field: "roleName",
    headerName: "Role Name",
    type: "string",
    width: 300,
    editable: false,
  },
  {
    field: "menuName",
    headerName: "Menu Name",
    type: "string",
    width: 300,
    editable: false,
  },
  {
    field: "canModified",
    headerName: "Can Modified",
    type: "boolean",
    width: 200,
    editable: true,
  },
  {
    field: "canView",
    headerName: "Can View",
    type: "boolean",
    width: 200,
    editable: true,
  },
]);