import { RenderCellForReferenceSelect } from "@/app/_components/common/DataTableEditor/cellRenderer/ReferenceSelect";
import { gridDefaults } from "@/app/_dataModels/core/BaseEntity";
import {
  GridColDef,
  GridRenderCellParams,
  GridRenderEditCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import { gridCols as gridColsOfRole } from "./Role";
import { findAllRole } from "@/app/_dataModels/serverActions/AdminService";
import { BooleanSelect } from "@/app/_components/common/DataTableEditor/cellRenderer/BooleanSelect";

export const gridCols: GridColDef[] = gridDefaults.concat([
  {
    field: "isAdmin",
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
    field: "isMale",
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
    field: "dbo",
    headerName: "Date Of Birth",
    type: "date",
    width: 150,
    editable: true,
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
