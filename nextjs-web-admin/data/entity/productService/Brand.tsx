import BaseEntity from "@/data/core/baseEntity";
import { GridRowId } from "@mui/x-data-grid";
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
