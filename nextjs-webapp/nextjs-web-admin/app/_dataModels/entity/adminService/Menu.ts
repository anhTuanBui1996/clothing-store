import { gridDefaults } from "@/app/_dataModels/core/BaseEntity";
import { GridColDef } from "@mui/x-data-grid";

/**
 * Extended types
 * type: "referenceSelect",
 * * syntax "referenceSelect:tableName:1|n", example "referenceSelect:User:1"
 */
export const gridCols: GridColDef[] = gridDefaults.concat([
  {
    field: "menuCode",
    headerName: "Menu Code",
    type: "string",
    editable: true,
  },
  {
    field: "menuName",
    headerName: "Menu Name",
    type: "string",
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    type: "string",
    width: 350,
    editable: true,
  },
]);
