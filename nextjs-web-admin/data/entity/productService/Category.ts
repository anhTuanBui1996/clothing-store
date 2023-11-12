import BaseEntity, { gridDefaults } from "@/data/core/baseEntity";
import { GridColDef } from "@mui/x-data-grid";
import Product from "./Product";

export default class Category implements BaseEntity {
  rowId?: string;
  createdDate?: Date;
  createdBy?: string;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;

  categoryId?: string;
  categoryName?: string;
  description?: string;
  products?: Set<Product>;

  constructor(
    rowId?: string,
    createdDate: Date = new Date(),
    createdBy?: string,
    lastModifiedDate: Date = new Date(),
    lastModifiedBy?: string,
    categoryName?: string,
    description?: string,
    products?: Set<Product>
  ) {
    this.rowId = rowId;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.lastModifiedDate = lastModifiedDate;
    this.lastModifiedBy = lastModifiedBy;
    this.categoryName = categoryName;
    this.description = description;
    this.products = products;
  }
}

export const gridCols: GridColDef[] = gridDefaults.concat([
  {
    field: "categoryName",
    headerName: "Category Name",
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
