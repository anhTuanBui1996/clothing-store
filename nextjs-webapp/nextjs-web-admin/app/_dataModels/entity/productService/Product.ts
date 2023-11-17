import { gridDefaults } from "@/app/_dataModels/core/BaseEntity";
import { GridColDef } from "@mui/x-data-grid";
import { RenderCellForReferenceSelect } from "@/app/_components/common/ReferenceSelect/ReferenceSelect";

export const gridCols: GridColDef[] = gridDefaults.concat([
  {
    field: "productName",
    headerName: "Product Name",
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
    field: "price",
    headerName: "Price",
    headerAlign: "left",
    type: "number",
    editable: true,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    headerAlign: "left",
    type: "number",
    editable: true,
  },
  {
    field: "brand",
    headerName: "Brand",
    headerAlign: "left",
    align: "right",
    type: "referenceSelect:1",
    width: 150,
    editable: true,
    renderCell: RenderCellForReferenceSelect,
    renderEditCell: RenderCellForReferenceSelect,
  },
  {
    field: "category",
    headerName: "Category",
    headerAlign: "left",
    align: "right",
    type: "referenceSelect:n",
    width: 150,
    editable: true,
    renderCell: RenderCellForReferenceSelect,
    renderEditCell: RenderCellForReferenceSelect,
  },
]);
