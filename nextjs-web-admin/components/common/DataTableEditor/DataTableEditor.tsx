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
  GridCallbackDetails,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { GridInputRowSelectionModel } from "@mui/x-data-grid";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";

interface ConfirmDialogProps {
  title: string;
  content: string;
  onClose: (isConfirm: boolean) => void;
  open: boolean;
}

function ConfirmDialog(props: ConfirmDialogProps) {
  const { title, content, onClose, open } = props;

  const handleCancel = () => {
    onClose(false);
  };

  const handleConfirm = () => {
    onClose(true);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      keepMounted
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm}>Yes</Button>
        <Button autoFocus onClick={handleCancel}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface EditToolbarProps {
  rows: GridRowsProp;
  rowsSelection: GridInputRowSelectionModel;
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

interface SnackbarContentType {
  type?: AlertColor;
  content?: string;
}

function EditToolbar(props: EditToolbarProps) {
  const { rows, rowsSelection, setRows, setRowModesModel } = props;
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackbarContent, setSnackbarContent] =
    React.useState<SnackbarContentType>({});

  const selectedRows = rowsSelection as string[];

  const handleAddRecord = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: "", age: "", role: "", isNew: true, isAdded: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  const handleSaveChanges = () => {};

  const handleDeleteRecords = () => {
    let isFoundOriginalRow = false;
    for (let i = 0; i < selectedRows.length; i++) {
      let rowId: string = selectedRows[i];

      if (!rows.find((row) => row.id === rowId)?.isAdded) {
        isFoundOriginalRow = true;
        break;
      }
    }
    if (isFoundOriginalRow) {
      setOpenDialog(true);
    } else {
      setRows((oldRows) =>
        oldRows.filter((row) => !selectedRows.includes(row.id))
      );
    }
  };

  const handleDeleteRecordsConfirmation = (isConfirm: boolean) => {
    if (isConfirm) {
      setRows((oldRows) =>
        oldRows.filter((row) => !selectedRows.includes(row.id))
      );
      setSnackbarContent({
        type: "info",
        content: `${selectedRows.length} rows deleted!`,
      });
      setOpenSnackBar(true);
    }
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackBar(false);
  };

  return (
    <>
      <GridToolbarContainer sx={{ justifyContent: "space-between" }}>
        <Box>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarExport />
        </Box>
        <Box>
          <Tooltip title="Save changes">
            <Button color="primary" onClick={handleSaveChanges}>
              <SaveIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Add record">
            <Button color="info" onClick={handleAddRecord}>
              <AddBoxIcon />
            </Button>
          </Tooltip>
          {selectedRows.length > 0 && (
            <Tooltip title="Delete records">
              <Button color="error" onClick={handleDeleteRecords}>
                <DeleteIcon />
              </Button>
            </Tooltip>
          )}
        </Box>
      </GridToolbarContainer>
      <ConfirmDialog
        title="Do you really want to delete these rows?"
        content="There are some row from the origin table... Continue?"
        open={openDialog}
        onClose={handleDeleteRecordsConfirmation}
      />
      <Snackbar
        open={openSnackBar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarContent.type}
          sx={{ width: "100%" }}
        >
          {snackbarContent.content}
        </Alert>
      </Snackbar>
    </>
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
        pageSizeOptions={[
          { value: rows.length, label: "Max" },
          25,
          50,
          100,
        ]}
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
