import { RenderCellForReferenceSelect } from "@/app/_components/common/ReferenceSelect/ReferenceSelect";
import { gridDefaults } from "@/app/_dataModels/core/BaseEntity";
import {
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import {
  findPermissionOfRole,
  updatePermissions,
} from "../../../_utils/serverActions/AdminService";
import { gridColsForRoleView as permissionsGridCols } from "./Permissions";

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
    editable: false,
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) =>
      RenderCellForReferenceSelect({
        params,
        sourceSchema: permissionsGridCols,
        dataSource: findPermissionOfRole,
      }),
    renderEditCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) =>
      RenderCellForReferenceSelect({
        params,
        sourceSchema: permissionsGridCols,
        dataSource: findPermissionOfRole,
      }),
  },
]);
