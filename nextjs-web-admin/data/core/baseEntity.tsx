import { GridRowId } from "@mui/x-data-grid";

export default class BaseEntity extends Object {
  id?: GridRowId;
  createdDate?: Date;
  createdBy?: string;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;
}
