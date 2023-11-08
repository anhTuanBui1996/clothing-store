import { GridColDef } from "@mui/x-data-grid";

export function exactEntityToGridData<T>(
  data: Object[]
): GridColDef[] {
  let fields: GridColDef[] = [];
  Object.getOwnPropertyNames(T)
  return;
}
