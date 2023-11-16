import BaseEntity, { gridDefaults } from "@/app/_dataModels/core/BaseEntity";
import { GridColDef } from "@mui/x-data-grid";

export default class Permissions implements BaseEntity {
  rowId?: string;
  createdDate?: Date;
  createdBy?: string;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;

  categoryName?: string;
  description?: string;

  constructor(
    rowId?: string,
    createdDate: Date = new Date(),
    createdBy?: string,
    lastModifiedDate: Date = new Date(),
    lastModifiedBy?: string,
    categoryName?: string,
    description?: string,
  ) {
    this.rowId = rowId;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.lastModifiedDate = lastModifiedDate;
    this.lastModifiedBy = lastModifiedBy;
    this.categoryName = categoryName;
    this.description = description;
  }
}

export const gridCols: GridColDef[] = gridDefaults.concat([
  { field: "categoryName", type: "string", editable: true },
  { field: "description", type: "string", editable: true },
  { field: "products", type: "referenceSelect", editable: true },
]);
