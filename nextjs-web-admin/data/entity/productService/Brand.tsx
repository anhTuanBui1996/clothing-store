import BaseEntity, { gridDefaults } from "@/data/core/baseEntity";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import Product from "./Product";

export default class Brand implements BaseEntity {
  id?: GridRowId;
  createdDate?: Date;
  createdBy?: string;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;

  brandId?: string;
  brandName?: string;
  description?: string;

  products?: Set<Product>;

  constructor(
    id: GridRowId = randomId(),
    createdDate: Date = new Date(),
    createdBy?: string,
    lastModifiedDate: Date = new Date(),
    lastModifiedBy?: string,
    brandId?: string,
    brandName?: string,
    description?: string,
    products?: Set<Product>
  ) {
    this.id = id;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.lastModifiedDate = lastModifiedDate;
    this.lastModifiedBy = lastModifiedBy;
    this.brandId = brandId;
    this.brandName = brandName;
    this.description = description;
    this.products = products;
  }
}

export const gridCols: GridColDef[] = gridDefaults.concat([
  { field: "brandId", headerName: "Brand Id", type: "string", editable: true },
  {
    field: "brandName",
    headerName: "Brand Name",
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
    field: "products",
    headerName: "Products",
    type: "referenceSelect",
    editable: true,
  },
]);
