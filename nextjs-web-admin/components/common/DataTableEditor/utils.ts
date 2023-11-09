import BaseEntity from "@/data/core/baseEntity";
import Product from "@/data/entity/productService/Product";
import { GridColDef } from "@mui/x-data-grid";

export function exactEntityToGridData<BaseEntity>(
  data: readonly BaseEntity[]
): GridColDef[] {
  let fields: GridColDef[] = [
    {
      field: "index",
      headerName: "Index",
      type: "number",
      width: 50,
      filterable: false,
      align: "left",
    },
  ];
  Object.getOwnPropertyNames(data[0]).forEach((prop) => {
    fields.push({ field: prop, headerName: prop, type: "string" });
  });
  return fields;
}
