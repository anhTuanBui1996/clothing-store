import BaseEntity from "@/api/base/baseEntity";
import { GridRowId } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";

export default class Category implements BaseEntity {
  id?: GridRowId;
  createdDate?: Date;
  createdBy?: string;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;
  constructor(
    id: GridRowId = randomId(),
    createdDate: Date = new Date(),
    createdBy?: string,
    lastModifiedDate: Date = new Date(),
    lastModifiedBy?: string
  ) {
    this.id = id;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.lastModifiedDate = lastModifiedDate;
    this.lastModifiedBy = lastModifiedBy;
  }
  fetchEntity(): boolean {
    throw new Error("Method not implemented.");
  }
  renewEntity(): void {
    this.id = randomId();
    this.createdDate = new Date();
    this.createdBy = "";
    this.lastModifiedDate = new Date();
    this.lastModifiedBy = "";
  }
  save(): boolean {
    throw new Error("Method not implemented.");
  }
  delete(): boolean {
    throw new Error("Method not implemented.");
  }
}
