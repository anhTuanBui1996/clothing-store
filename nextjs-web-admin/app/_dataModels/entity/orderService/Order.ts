import BaseEntity from "@/app/_dataModels/core/BaseEntity";
import Product from "../productService/Product";

export default class Order implements BaseEntity {
  rowId?: string;
  createdDate?: Date;
  createdBy?: string;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;

  orderId?: string;
  orderName?: string;
  description?: string;

  products?: Set<Product>;

  constructor(
    rowId?: string,
    createdDate: Date = new Date(),
    createdBy?: string,
    lastModifiedDate: Date = new Date(),
    lastModifiedBy?: string,
    orderId?: string,
    orderName?: string,
    description?: string,
    products?: Set<Product>
  ) {
    this.rowId = rowId;
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
