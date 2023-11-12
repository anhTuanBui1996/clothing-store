import BaseEntity, { gridDefaults } from "@/data/core/baseEntity";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import Permission from "./Permission";

export default class Category implements BaseEntity {
  rowId?: string;
  createdDate?: Date;
  createdBy?: string;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;

  categoryName?: string;
  description?: string;

  products?: Set<Permission>;

  constructor(
    rowId?: string,
    createdDate: Date = new Date(),
    createdBy?: string,
    lastModifiedDate: Date = new Date(),
    lastModifiedBy?: string,
    categoryName?: string,
    description?: string,
    products?: Set<Permission>
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
  { field: "categoryName", type: "string", editable: true },
  { field: "description", type: "string", editable: true },
  { field: "products", type: "referenceSelect", editable: true },
]);
