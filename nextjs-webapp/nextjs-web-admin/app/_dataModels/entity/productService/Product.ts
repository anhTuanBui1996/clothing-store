import { gridDefaults } from "@/app/_dataModels/core/BaseEntity";
import { GridColDef, GridRenderCellParams, GridRenderEditCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { RenderCellForReferenceSelect } from "@/app/_components/common/DataTableEditor/cellRenderer/ReferenceSelect";
import { gridCols as gridColsOfBrand } from "./Brand";
import { gridCols as gridColsOfCategory } from "./Category";
import { getBrands as findAllBrands, getCategories as findAllCategories } from "@/app/_hooks/serverActions/ProductService";

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
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) =>
      RenderCellForReferenceSelect({
        params,
        displayField: "brandName",
        sourceSchema: gridColsOfBrand,
        dataSource: findAllBrands,
      }),
    renderEditCell: (
      params: GridRenderEditCellParams<any, any, any, GridTreeNodeWithRender>
    ) =>
      RenderCellForReferenceSelect({
        params,
        displayField: "brandName",
        sourceSchema: gridColsOfBrand,
        dataSource: findAllBrands,
      }),
  },
  {
    field: "category",
    headerName: "Category",
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
        displayField: "categoryName",
        sourceSchema: gridColsOfCategory,
        dataSource: findAllCategories,
      }),
    renderEditCell: (
      params: GridRenderEditCellParams<any, any, any, GridTreeNodeWithRender>
    ) =>
      RenderCellForReferenceSelect({
        params,
        displayField: "categoryName",
        sourceSchema: gridColsOfCategory,
        dataSource: findAllCategories,
      }),
  },
]);
