import BaseEntity, { gridDefaults } from "@/data/core/baseEntity";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import Brand from "./Brand";
import Category from "./Category";

export default class Product implements BaseEntity {
  id?: GridRowId;
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
    id: GridRowId = randomId(),
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
    this.id = id;
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
    field: "productId",
    headerName: "Product Id",
    type: "string",
    editable: true,
  },
  {
    field: "productName",
    headerName: "Product Name",
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
    field: "price",
    headerName: "Price",
    type: "number",
    editable: true,
  },
  {
    field: "quantity",
    headerName: "Price",
    type: "number",
    editable: true,
  },
  {
    field: "brand",
    headerName: "Brand",
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
