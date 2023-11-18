import { RenderCellForReferenceSelect } from "@/app/_components/common/ReferenceSelect/ReferenceSelect";
import { gridDefaults } from "@/app/_dataModels/core/BaseEntity";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

/**
 * Extended types
 * type: "referenceSelect",
 * * syntax "referenceSelect:tableName:1|n", example "referenceSelect:User:1"
 */
export const gridCols: GridColDef[] = gridDefaults.concat([
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
  {
    field: "permissions",
    headerName: "Permissions",
    headerAlign: "left",
    align: "right",
    type: "referenceSelect:Permission:n",
    width: 150,
    editable: true,
    renderCell: RenderCellForReferenceSelect,
    renderEditCell: RenderCellForReferenceSelect,
  },
]);
