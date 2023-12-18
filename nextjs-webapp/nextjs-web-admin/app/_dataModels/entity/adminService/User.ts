import { RenderCellForReferenceSelect } from "@/app/_components/common/DataTableEditor/cellRenderer/ReferenceSelect";
import { gridDefaults } from "@/app/_dataModels/core/BaseEntity";
import {
  GridColDef,
  GridRenderCellParams,
  GridRenderEditCellParams,
  GridTreeNodeWithRender,
  GridValueGetterParams,
  GridValueSetterParams,
} from "@mui/x-data-grid";
import { gridCols as gridColsOfRole } from "./Role";
import { findAllRole } from "@/app/_dataModels/serverActions/AdminService";
import { BooleanSelect } from "@/app/_components/common/DataTableEditor/cellRenderer/BooleanSelect";
import { RenderCellForMediaSelect } from "@/app/_components/common/DataTableEditor/cellRenderer/MediaSelect";

export const gridCols: GridColDef[] = gridDefaults.concat([
  {
    field: "avatar",
    headerName: "Avatar",
    type: "mediaSelect",
    width: 200,
    editable: true,
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) => RenderCellForMediaSelect({ cellParams: params, mediaType: "image" }),
    renderEditCell: (
      params: GridRenderEditCellParams<any, any, any, GridTreeNodeWithRender>
    ) => RenderCellForMediaSelect({ cellParams: params, mediaType: "image" }),
  },
  {
    field: "username",
    headerName: "Username",
    type: "string",
    width: 150,
    editable: true,
  },
  {
    field: "password",
    headerName: "Password",
    type: "string",
    width: 200,
    editable: true,
  },
  {
    field: "admin",
    headerName: "Is Admin",
    headerAlign: "left",
    type: "boolean",
    width: 120,
    editable: true,
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) => BooleanSelect(params),
  },
  {
    field: "accountNonExpired",
    headerName: "Is Account Non-Expired",
    headerAlign: "left",
    type: "boolean",
    width: 220,
    editable: true,
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) => BooleanSelect(params),
  },
  {
    field: "accountNonLocked",
    headerName: "Is Account Non-Locked",
    headerAlign: "left",
    type: "boolean",
    width: 220,
    editable: true,
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) => BooleanSelect(params),
  },
  {
    field: "credentialsNonExpired",
    headerName: "Is Credentials Non-Expired",
    headerAlign: "left",
    type: "boolean",
    width: 240,
    editable: true,
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) => BooleanSelect(params),
  },
  {
    field: "enabled",
    headerName: "Is Enabled",
    headerAlign: "left",
    type: "boolean",
    width: 120,
    editable: true,
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) => BooleanSelect(params),
  },
  {
    field: "email",
    headerName: "Email",
    type: "string",
    width: 100,
    editable: true,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    type: "string",
    width: 150,
    editable: true,
  },
  {
    field: "firstName",
    headerName: "First Name",
    type: "string",
    width: 200,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    type: "string",
    width: 250,
    editable: true,
  },
  {
    field: "male",
    headerName: "Is Male",
    headerAlign: "left",
    type: "boolean",
    width: 120,
    editable: true,
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) => BooleanSelect(params),
  },
  {
    field: "dob",
    headerName: "Date Of Birth",
    type: "date",
    width: 150,
    editable: true,
    valueSetter: (params: GridValueSetterParams<any, any>) => ({
      ...params.row,
      dob: params.value.toString(),
    }),
    valueGetter: (
      params: GridValueGetterParams<any, any, GridTreeNodeWithRender>
    ) => new Date(params.value),
  },
  {
    field: "citizenId",
    headerName: "Citizen Id",
    type: "string",
    width: 150,
    editable: true,
  },
  {
    field: "roles",
    headerName: "Roles",
    headerAlign: "left",
    align: "right",
    type: "referenceSelect:n",
    width: 250,
    editable: true,
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) =>
      RenderCellForReferenceSelect({
        params,
        displayField: "roleCode",
        sourceSchema: gridColsOfRole,
        dataSource: findAllRole,
      }),
    renderEditCell: (
      params: GridRenderEditCellParams<any, any, any, GridTreeNodeWithRender>
    ) =>
      RenderCellForReferenceSelect({
        params,
        displayField: "roleCode",
        sourceSchema: gridColsOfRole,
        dataSource: findAllRole,
      }),
  },
]);
