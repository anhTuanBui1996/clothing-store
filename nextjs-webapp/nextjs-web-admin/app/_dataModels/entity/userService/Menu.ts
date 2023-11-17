import { RenderCellForReferenceSelect } from "@/app/_components/common/ReferenceSelect/ReferenceSelect";
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
    field: "description",
    headerName: "Description",
    type: "string",
    editable: true,
  },
  {
    field: "permissions",
    headerName: "Permissions",
    headerAlign: "left",
    align: "right",
    type: "referenceSelect:n",
    width: 150,
    editable: true,
    renderCell: RenderCellForReferenceSelect,
    renderEditCell: RenderCellForReferenceSelect,
  },
]);
