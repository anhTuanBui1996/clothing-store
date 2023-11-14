import BaseEntity, { gridDefaults } from "@/app/_dataModels/core/BaseEntity";
import { GridColDef } from "@mui/x-data-grid";
import Permission from "./Permission";

export default class Menu implements BaseEntity {
  rowId?: string;
  createdDate?: Date;
  createdBy?: string;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;

  categoryId?: string;
  categoryName?: string;
  description?: string;
  products?: Set<Permission>;

  constructor(
    rowId?: string,
    createdDate: Date = new Date(),
    createdBy?: string,
    lastModifiedDate: Date = new Date(),
    lastModifiedBy?: string,
    categoryId?: string,
    categoryName?: string,
    description?: string,
    products?: Set<Permission>
  ) {
    this.rowId = rowId;
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
