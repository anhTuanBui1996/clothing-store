import BaseEntity, { gridDefaults } from "@/data/core/baseEntity";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import Product from "./Product";

export default class Category implements BaseEntity {
  id?: GridRowId;
  createdDate?: Date;
  createdBy?: string;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;

  categoryId?: string;
  categoryName?: string;
  description?: string;

  products?: Set<Product>;

  constructor(
    id: GridRowId = randomId(),
    createdDate: Date = new Date(),
    createdBy?: string,
    lastModifiedDate: Date = new Date(),
    lastModifiedBy?: string,
    categoryId?: string,
    categoryName?: string,
    description?: string,
    products?: Set<Product>
  ) {
    this.id = id;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.lastModifiedDate = lastModifiedDate;
    this.lastModifiedBy = lastModifiedBy;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.description = description;
    this.products = products;
  }
}

export const gridCols: GridColDef[] = gridDefaults.concat([
  { field: "categoryId", type: "string", editable: true },
  { field: "categoryName", type: "string", editable: true },
  { field: "description", type: "string", editable: true },
  { field: "products", type: "referenceSelect", editable: true },
]);
