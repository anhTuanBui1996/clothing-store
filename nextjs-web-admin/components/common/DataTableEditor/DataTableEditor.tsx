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
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { exactEntityToGridData } from "./utils";

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

interface GridBackdropProps {
  open: boolean;
  handleClose: () => void;
}

function GridBackdrop(props: GridBackdropProps) {
  const { open, handleClose } = props;
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
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

interface DialogContentType {
  title: string;
  content: string;
}

interface SnackbarContentType {
  type?: AlertColor;
  content?: string;
}

function EditToolbar(props: EditToolbarProps) {
  const { rows, rowsSelection, setRows, setRowModesModel } = props;
  const [deletedRows, setDeletedRows] = React.useState(new Set<string>());

  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState<DialogContentType>({
    title: "",
    content: "",
  });

  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackbarContent, setSnackbarContent] =
    React.useState<SnackbarContentType>({});

  const [openBackdrop, setOpenBackdrop] = React.useState(false);

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
      setDialogContent({
        title: "Do you really want to delete these rows?",
        content: "There are some row from the origin table... Continue?",
      });
      setOpenDialog(true);
    } else {
      setRows((oldRows) =>
        oldRows.filter((row) => !selectedRows.includes(row.id))
      );
    }
  };

  const handleDeleteRecordsConfirmation = (isConfirm: boolean) => {
    if (isConfirm) {
      setOpenBackdrop(true);
      setRows((oldRows) =>
        oldRows.filter((row) => !selectedRows.includes(row.id))
      );
      selectedRows.forEach((id) => {
        if (!rows.find((row) => row.id === id)?.isAdded) {
          setDeletedRows(deletedRows.add(id));
        }
      });
      setSnackbarContent({
        type: "info",
        content: `${selectedRows.length} rows deleted!`,
      });
      setOpenSnackBar(true);
    }
    setOpenDialog(false);
    handleCloseBackdrop();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackBar(false);
  };

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
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
        title={dialogContent.title}
        content={dialogContent.content}
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
      <GridBackdrop open={openBackdrop} handleClose={handleCloseBackdrop} />
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
        pageSizeOptions={[{ value: rows.length, label: "Max" }, 25, 50, 100]}
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
