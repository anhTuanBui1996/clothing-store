import { RenderCellForReferenceSelect } from "@/app/_components/common/ReferenceSelect/ReferenceSelect";
import { gridDefaults } from "@/app/_dataModels/core/BaseEntity";
import {
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import {
  getPermissionOfRole,
  setPermissions,
} from "../../../_utils/serverActions/AdminService";
import { gridCols as permissionsGridCols } from "./Permissions";

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
    editable: true,
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) =>
      RenderCellForReferenceSelect({
        params,
        sourceSchema: permissionsGridCols,
        dataSource: getPermissionOfRole,
        uploadMethod: setPermissions,
      }),
    renderEditCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) =>
      RenderCellForReferenceSelect({
        params,
        sourceSchema: permissionsGridCols,
        dataSource: getPermissionOfRole,
        uploadMethod: setPermissions,
      }),
  },
]);
