import { RenderCellForReferenceSelect } from "@/app/_components/common/DataTableEditor/cellRenderer/ReferenceSelect";
import { gridDefaults } from "@/app/_dataModels/core/BaseEntity";
import {
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import {
  findPermissionOfRole,
  updatePermissions,
} from "../../../_hooks/serverActions/AdminService";
import { gridColsForRoleView as permissionsGridCols } from "./Permissions";
import { RenderCellForCompositeSelect } from "@/app/_components/common/DataTableEditor/cellRenderer/CompositeSelect";

export const gridCols: GridColDef[] = gridDefaults.concat([
  {
    field: "roleCode",
    headerName: "Role Code",
    type: "string",
    editable: true,
  },
  {
    field: "roleName",
    headerName: "Role Name",
    type: "string",
    width: 300,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    type: "string",
    width: 400,
    editable: true,
  },
  {
    field: "permissions",
    headerName: "Permissions",
    headerAlign: "left",
    align: "right",
    type: "compositeSelect:n",
    width: 150,
    editable: false,
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) =>
      RenderCellForCompositeSelect({
        params,
        sourceSchema: permissionsGridCols,
        dataSource: findPermissionOfRole,
      }),
    renderEditCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) =>
      RenderCellForCompositeSelect({
        params,
        sourceSchema: permissionsGridCols,
        dataSource: findPermissionOfRole,
      }),
  },
]);
