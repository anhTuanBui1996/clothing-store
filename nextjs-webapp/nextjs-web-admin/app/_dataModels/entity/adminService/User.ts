import { RenderCellForReferenceSelect } from "@/app/_components/common/ReferenceSelect/ReferenceSelect";
import { gridDefaults } from "@/app/_dataModels/core/BaseEntity";
import {
  GridColDef,
  GridRenderCellParams,
  GridRenderEditCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import { gridCols as gridColsOfRole } from "./Role";
import { findAllRole } from "@/app/_utils/serverActions/AdminService";

export const gridCols: GridColDef[] = gridDefaults.concat([
  {
    field: "isAdmin",
    headerName: "Is Admin",
    type: "boolean",
    width: 100,
    editable: true,
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
    type: "boolean",
    width: 100,
    editable: true,
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
    width: 150,
    editable: true,
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) =>
      RenderCellForReferenceSelect({
        params,
        sourceSchema: gridColsOfRole,
        dataSource: findAllRole,
      }),
    renderEditCell: (
      params: GridRenderEditCellParams<any, any, any, GridTreeNodeWithRender>
    ) =>
      RenderCellForReferenceSelect({
        params,
        sourceSchema: gridColsOfRole,
        dataSource: findAllRole,
      }),
  },
]);
