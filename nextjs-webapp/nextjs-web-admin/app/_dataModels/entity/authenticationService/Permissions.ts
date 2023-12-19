import { gridDefaults } from "@/app/_dataModels/core/BaseEntity";
import {
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import { BooleanSelect } from "@/app/_components/common/DataTableEditor/cellRenderer/BooleanSelect";

export const gridColsForRoleView: GridColDef[] = gridDefaults.concat([
  {
    field: "menuName",
    headerName: "Menu Name",
    type: "string",
    width: 200,
    editable: false,
  },
  {
    field: "canModified",
    headerName: "Can Modified",
    type: "boolean",
    width: 150,
    editable: false,
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) => BooleanSelect(params),
  },
  {
    field: "canView",
    headerName: "Can View",
    type: "boolean",
    width: 150,
    editable: false,
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) => BooleanSelect(params),
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
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) => BooleanSelect(params),
  },
  {
    field: "canView",
    headerName: "Can View",
    type: "boolean",
    width: 200,
    editable: true,
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) => BooleanSelect(params),
  },
]);
