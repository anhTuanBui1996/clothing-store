import { gridDefaults } from "@/app/_dataModels/core/BaseEntity";
import { GridColDef } from "@mui/x-data-grid";

export const gridCols: GridColDef[] = gridDefaults.concat([
  {
    field: "brandName",
    headerName: "Brand Name",
    headerAlign: "left",
    type: "string",
    editable: true,
    width: 200,
  },
  {
    field: "description",
    headerName: "Description",
    headerAlign: "left",
    type: "string",
    editable: true,
  },
  {
    field: "products",
    headerName: "Products",
    headerAlign: "left",
    type: "referenceSelect",
    editable: true,
  },
]);
