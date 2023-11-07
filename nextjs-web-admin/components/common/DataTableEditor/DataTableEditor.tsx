import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridRowModel,
  GridValidRowModel,
  GridCallbackDetails,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { GridInputRowSelectionModel } from "@mui/x-data-grid";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";

interface EditToolbarProps {
  rows: GridValidRowModel[];
  rowsSelection: GridInputRowSelectionModel;
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { rows, rowsSelection, setRows, setRowModesModel } = props;

  const selectedRows = rowsSelection as string[];

  const handleAddRecord = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: "", age: "", role: "", isNew: true, isAddedFromUi: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  const handleSaveChanges = () => {};

  const handleDeleteRecords = () => {
    console.log(rows);
  };

  return (
    <GridToolbarContainer>
      <Tooltip title="Add record">
        <Button color="info" onClick={handleAddRecord}>
          <AddBoxIcon />
        </Button>
      </Tooltip>
      <Tooltip title="Save changes">
        <Button color="primary" onClick={handleSaveChanges}>
          <SaveIcon />
        </Button>
      </Tooltip>
      {selectedRows.length > 0 && (
        <Tooltip title="Delete records">
          <Button color="error" onClick={handleDeleteRecords}>
            <DeleteIcon />
          </Button>
        </Tooltip>
      )}
    </GridToolbarContainer>
  );
}

export default function DataTableEditor({
  initialRows,
  columns,
}: {
  initialRows: GridRowsProp;
  columns: GridColDef[];
}) {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [rowSelectionModel, setRowSelectionModel] =
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
    details: GridCallbackDetails<any>
  ) => {
    setRowSelectionModel(rowSelectionModel);
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
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        processRowUpdate={processRowUpdate}
        checkboxSelection
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        disableRowSelectionOnClick
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: {
            rows,
            rowsSelection: rowSelectionModel,
            setRows,
            setRowModesModel,
          },
        }}
        sx={{ backgroundColor: "Background", overflowX: "auto" }}
      />
    </Box>
  );
}
