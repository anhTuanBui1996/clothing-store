import BaseEntity, { gridDefaults } from "@/data/core/baseEntity";
import { GridColDef } from "@mui/x-data-grid";
import Brand from "./Brand";
import Category from "./Category";

export default class Product implements BaseEntity {
  rowId?: string;
  createdDate?: Date;
  createdBy?: string;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;

  productId?: string;
  productName?: string;
  description?: string;
  price?: number;
  quantity?: number;
  brand?: Brand;
  category?: Category;

  constructor(
    rowId?: string,
    createdDate: Date = new Date(),
    createdBy?: string,
    lastModifiedDate: Date = new Date(),
    lastModifiedBy?: string,
    productId?: string,
    productName?: string,
    description?: string,
    price?: number,
    quantity?: number,
    brand?: Brand,
    category?: Category
  ) {
    this.rowId = rowId;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.lastModifiedDate = lastModifiedDate;
    this.lastModifiedBy = lastModifiedBy;
    this.productId = productId;
    this.productName = productName;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.brand = brand;
    this.category = category;
  }
}

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
    type: "referenceSelect",
    editable: true,
  },
  {
    field: "category",
    headerName: "Category",
    type: "referenceSelect",
    editable: true,
  },
]);
