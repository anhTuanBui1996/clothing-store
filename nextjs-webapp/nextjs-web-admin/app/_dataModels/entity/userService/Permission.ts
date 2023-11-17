import { RenderCellForReferenceSelect } from "@/app/_components/common/ReferenceSelect/ReferenceSelect";
import { gridDefaults } from "@/app/_dataModels/core/BaseEntity";
import { GridColDef } from "@mui/x-data-grid";

export const gridCols: GridColDef[] = gridDefaults.concat([
  {
    field: "role",
    headerName: "Role",
    headerAlign: "left",
    align: "right",
    type: "referenceSelect:1",
    width: 150,
    editable: true,
    renderCell: RenderCellForReferenceSelect,
    renderEditCell: RenderCellForReferenceSelect,
  },
  {
    field: "menu",
    headerName: "Menu",
    headerAlign: "left",
    align: "right",
    type: "referenceSelect:1",
    width: 150,
    editable: true,
    renderCell: RenderCellForReferenceSelect,
    renderEditCell: RenderCellForReferenceSelect,
  },
  {
    field: "canCreate",
    headerName: "Can Create",
    type: "boolean",
    editable: true,
  },
  {
    field: "canRead",
    headerName: "Can Read",
    type: "boolean",
    editable: true,
  },
  {
    field: "canUpdate",
    headerName: "Can Update",
    type: "boolean",
    editable: true,
  },
  {
    field: "canDelete",
    headerName: "Can Delete",
    type: "boolean",
    editable: true,
  },
]);
