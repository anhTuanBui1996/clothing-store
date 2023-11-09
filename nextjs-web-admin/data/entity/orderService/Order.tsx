import BaseEntity from "@/data/core/baseEntity";
import { GridRowId } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import Product from "../productService/Product";

export default class Order implements BaseEntity {
  id?: GridRowId;
  createdDate?: Date;
  createdBy?: string;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;

  orderId?: string;
  orderName?: string;
  description?: string;

  products?: Set<Product>;

  constructor(
    id: GridRowId = randomId(),
    createdDate: Date = new Date(),
    createdBy?: string,
    lastModifiedDate: Date = new Date(),
    lastModifiedBy?: string,
    orderId?: string,
    orderName?: string,
    description?: string,
    products?: Set<Product>
  ) {
    this.id = id;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.lastModifiedDate = lastModifiedDate;
    this.lastModifiedBy = lastModifiedBy;
    this.orderId = orderId;
    this.orderName = orderName;
    this.description = description;
    this.products = products;
  }
}
