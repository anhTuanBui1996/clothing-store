import { RenderCellForReferenceSelect } from "@/app/_components/common/ReferenceSelect/ReferenceSelect";
import { gridDefaults } from "@/app/_dataModels/core/BaseEntity";
import {
  GridColDef,
  GridRenderCellParams,
  GridRenderEditCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import { gridCols as gridColsForRole } from "./Role";
import { findAllRole } from "@/app/_utils/serverActions/AdminService";

export const gridCols: GridColDef[] = gridDefaults.concat([
  {
    field: "isAdmin",
    headerName: "Is Admin",
    type: "boolean",
    editable: true,
  },
  { field: "email", headerName: "Email", type: "string", editable: true },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    type: "string",
    editable: true,
  },
  {
    field: "firstName",
    headerName: "First Name",
    type: "string",
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    type: "string",
    editable: true,
  },
  {
    field: "isMale",
    headerName: "Is Male",
    type: "boolean",
    editable: true,
  },
  { field: "dbo", headerName: "Date Of Birth", type: "date", editable: true },
  {
    field: "citizenId",
    headerName: "Citizen Id",
    type: "string",
    editable: true,
  },
  {
    field: "role",
    headerName: "Role",
    headerAlign: "left",
    align: "right",
    type: "referenceSelect:1",
    width: 150,
    editable: true,
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) =>
      RenderCellForReferenceSelect({
        params,
        sourceSchema: gridColsForRole,
        dataSource: findAllRole,
      }),
    renderEditCell: (
      params: GridRenderEditCellParams<any, any, any, GridTreeNodeWithRender>
    ) =>
      RenderCellForReferenceSelect({
        params,
        sourceSchema: gridColsForRole,
        dataSource: findAllRole,
      }),
  },
]);
