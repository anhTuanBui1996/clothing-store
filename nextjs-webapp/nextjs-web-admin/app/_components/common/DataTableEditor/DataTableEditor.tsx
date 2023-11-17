import * as React from "react";
import Box from "@mui/material/Box";
import {
  GridRowsProp,
  GridRowModesModel,
  DataGrid,
  GridColDef,
  GridRowModel,
  GridCallbackDetails,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { GridInputRowSelectionModel } from "@mui/x-data-grid";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import EditToolbar from "./EditToolbar";
import { BaseDto } from "@/app/_dataModels/core/BaseEntity";
import BaseReponse from "@/app/_dataModels/core/BaseResponse";

export default function DataTableEditor({
  initialRows,
  columns,
  getPromise,
  createPromise,
  updatePromise,
  deletePromise,
}: {
  initialRows: GridRowsProp;
  columns: GridColDef[];
  getPromise?: () => Promise<BaseReponse>;
  createPromise?: (data: BaseDto) => Promise<BaseReponse>;
  updatePromise?: (data: BaseDto) => Promise<BaseReponse>;
  deletePromise?: (id: string) => Promise<BaseReponse>;
}) {
  const mappedRows: GridRowsProp = React.useMemo(
    () =>
      initialRows.map((row, index) => ({
        ...row,
        lineNo: index + 1,
        isUpdated: false,
        isAdded: false,
      })),
    []
  );
  const [rows, setRows] = React.useState<GridRowsProp>(mappedRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [gridRowSelectionModel, setGridRowSelectionModel] =
    React.useState<GridInputRowSelectionModel>([]);

  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    const initialRow = mappedRows.find(
      (row: GridValidRowModel) => row.id === newRow.id
    );
    let isUpdated = false;
    if (initialRow) {
      isUpdated = JSON.stringify(initialRow) === JSON.stringify(newRow);
    } else {
      isUpdated = JSON.stringify(oldRow) === JSON.stringify(newRow);
    }
    const updatedRow = { ...newRow, isUpdated };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowSelectionModelChange = (
    rowSelectionModel: GridRowSelectionModel,
    _details: GridCallbackDetails<any>
  ) => {
    setGridRowSelectionModel(rowSelectionModel);
  };

  return (
    <Box
      sx={{
        boxShadow:
          "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
        height: 500,
        width: "100%",
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        showColumnVerticalBorder
        showCellVerticalBorder
        rows={rows}
        columns={columns}
        editMode="row"
        initialState={{
          columns: {
            columnVisibilityModel: {
              createdDate: false,
              createdBy: false,
              lastModifiedDate: false,
              lastModifiedBy: false,
            },
          },
        }}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        processRowUpdate={processRowUpdate}
        checkboxSelection
        rowSelectionModel={gridRowSelectionModel}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        disableRowSelectionOnClick
        pageSizeOptions={[{ value: rows.length, label: "Max" }, 25, 50, 100]}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: {
            initialRows,
            rows,
            rowsSelection: gridRowSelectionModel,
            setRows,
            setRowModesModel,
            setRowsSelection: setGridRowSelectionModel,
            getPromise,
            createPromise,
            updatePromise,
            deletePromise,
          },
        }}
        sx={{
          backgroundColor: "Background",
          overflowX: "auto",
          overflowY: "clip",
          position: "relative",
          "& .MuiDataGrid-main": {
            marginTop: "5px",
            borderTop: "1px solid #e0e0e0",
          },
        }}
      />
    </Box>
  );
}
