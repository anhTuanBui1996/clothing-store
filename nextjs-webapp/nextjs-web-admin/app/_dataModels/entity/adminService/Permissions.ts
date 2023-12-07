import { gridDefaults } from "@/app/_dataModels/core/BaseEntity";
import { GridColDef } from "@mui/x-data-grid";

export const gridCols: GridColDef[] = gridDefaults.concat([
  {
    field: "menuName",
    headerName: "Menu Name",
    type: "string",
    editable: true,
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
