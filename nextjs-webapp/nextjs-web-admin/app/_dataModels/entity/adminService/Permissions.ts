import { gridDefaults } from "@/app/_dataModels/core/BaseEntity";
import { GridColDef } from "@mui/x-data-grid";

export const gridColsForRoleView: GridColDef[] = gridDefaults.concat([
  {
    field: "menuName",
    headerName: "Menu Name",
    type: "string",
    editable: false,
  },
  {
    field: "canModified",
    headerName: "Can Modified",
    type: "boolean",
    editable: true,
  },
  {
    field: "canView",
    headerName: "Can View",
    type: "boolean",
    editable: true,
  },
]);

export const gridCols: GridColDef[] = gridDefaults.concat([
  {
    field: "roleName",
    headerName: "Role Name",
    type: "string",
    editable: false,
  },
  {
    field: "menuName",
    headerName: "Menu Name",
    type: "string",
    editable: false,
  },
  {
    field: "canModified",
    headerName: "Can Modified",
    type: "boolean",
    editable: true,
  },
  {
    field: "canView",
    headerName: "Can View",
    type: "boolean",
    editable: true,
  },
]);