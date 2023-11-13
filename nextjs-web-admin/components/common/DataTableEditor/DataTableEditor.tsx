import * as React from "react";
import Box from "@mui/material/Box";
import {
  GridRowsProp,
  GridRowModesModel,
  DataGrid,
  GridColDef,
  GridRowModel,
  GridCallbackDetails,
} from "@mui/x-data-grid";
import { GridInputRowSelectionModel } from "@mui/x-data-grid";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import EditToolbar from "./EditToolbar";

export default function DataTableEditor({
  initialRows,
  columns,
}: {
  initialRows: GridRowsProp;
  columns: GridColDef[];
}) {
  const [rows, setRows] = React.useState<GridRowsProp>(
    initialRows.map((row, index) => ({ ...row, lineNo: index + 1 }))
  );
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [gridRowSelectionModel, setGridRowSelectionModel] =
    React.useState<GridInputRowSelectionModel>([]);

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
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
          },
        }}
        sx={{
          backgroundColor: "Background",
          overflowX: "auto",
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
