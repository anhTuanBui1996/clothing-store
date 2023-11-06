import { GridRowId } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";

export default interface BaseEntity {
  id?: GridRowId;
  createdDate?: Date;
  createdBy?: string;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;

  fetchEntity(): boolean;
  renewEntity(): void;
  save(): boolean;
  delete(): boolean;
}
