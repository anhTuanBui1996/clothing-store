import React from "react";
import {
  GridInputRowSelectionModel,
  GridRowModes,
  GridRowId,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { Box, Button, Tooltip, PopoverOrigin } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History";
import ResultSnackbar, {
  SnackbarContentType,
  SnackbarOnCloseHandler,
} from "./toolbarItem/ResultSnackbar";
import ConfirmDialog, {
  DialogConfirmationOnCloseHandler,
  DialogContentType,
} from "./toolbarItem/ConfirmDialog";
import GridBackdrop from "./toolbarItem/GridBackdrop";
import AddRecordDropdownMenu from "./toolbarItem/AddRecordDropdownMenu";

export interface EditToolbarProps {
  initialRows: GridRowsProp;
  rows: GridRowsProp;
  rowsSelection: GridInputRowSelectionModel;
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  setRowsSelection: (newRowsSelection: GridInputRowSelectionModel) => void;
}

interface MenuState {
  anchorEl: null | HTMLElement;
  position?: {
    anchorOrigin: PopoverOrigin | undefined;
    transformOrigin: PopoverOrigin | undefined;
  };
  onOkClick?: (v: any) => void;
  onClose?: (
    event: {},
    reason: "escapeKeyDown" | "backdropClick" | "tabKeyDown"
  ) => void;
}

interface BackdropState {
  open: boolean;
  isFullScreen?: boolean;
}

interface DialogState {
  open: boolean;
  content?: DialogContentType;
  onClose?: DialogConfirmationOnCloseHandler;
}

interface SnackbarState {
  open: boolean;
  content?: SnackbarContentType;
  onClose: SnackbarOnCloseHandler;
}

export default function EditToolbar(props: EditToolbarProps) {
  const {
    initialRows,
    rows,
    rowsSelection,
    setRows,
    setRowModesModel,
    setRowsSelection,
  } = props;
  // Data model states
  const selectedRows = rowsSelection as string[];
  const [deletedRows, setDeletedRows] = React.useState(new Set<string>());

  //#region Menu
  const handleCloseMenu = () => {
    setMenu((oldMenu) => ({ ...oldMenu, anchorEl: null }));
  };

  const handleOpenAddRecordsMenu = (
    e: React.MouseEvent<HTMLButtonElement>,
    position?: {
      anchorOrigin: PopoverOrigin | undefined;
      transformOrigin: PopoverOrigin | undefined;
    },
    onOkClick?: (v: number) => void,
    onClose?: (
      event: {},
      reason: "escapeKeyDown" | "backdropClick" | "tabKeyDown"
    ) => void
  ) => {
    setMenu({
      anchorEl: e.currentTarget,
      position,
      onOkClick,
      onClose,
    });
  };
  const [menu, setMenu] = React.useState<MenuState>({ anchorEl: null });
  //#endregion

  //#region Dialog
  const handleCloseDialog = () => {
    setDialog((oldDialog: DialogState) => ({ ...oldDialog, open: false }));
  };

  const handleOpenDialog = (
    content: DialogContentType,
    onClose: DialogConfirmationOnCloseHandler
  ) => {
    setDialog({ open: true, content, onClose });
  };

  const [dialog, setDialog] = React.useState<DialogState>({
    open: false,
  });
  //#endregion

  //#region Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar((oldSnackbar: SnackbarState) => ({
      ...oldSnackbar,
      open: false,
    }));
  };

  const handleOpenSnackbar = (
    content: SnackbarContentType,
    onClose: SnackbarOnCloseHandler
  ) => {
    setSnackbar({
      open: true,
      content,
      onClose,
    });
  };

  const [snackbar, setSnackbar] = React.useState<SnackbarState>({
    open: false,
    onClose: handleCloseSnackbar,
  });
  //#endregion

  //#region Backdrop
  const [backdrop, setBackdrop] = React.useState<BackdropState>({
    open: false,
  });

  const handleOpenBackdrop = (isFullScreen?: boolean) => {
    setBackdrop({ open: true, isFullScreen });
  };

  const handleCloseBackdrop = () => {
    setBackdrop((oldBackdrop) => ({ ...oldBackdrop, open: false }));
  };
  //#endregion

  // Advance handlers
  //#region Revert origin Button
  const handleRevertHistory = () => {
    handleOpenDialog(
      {
        title: "Revert and refetch the data.",
        body: "Do you really want to revert the origin history and refetch? All changes will be discarded.",
      },
      handleRevertHistoryConfirmation
    );
  };

  const handleRevertHistoryConfirmation = (isConfirm: boolean) => {
    if (isConfirm) {
      handleOpenBackdrop(false);
      handleOpenSnackbar(
        {
          type: "success",
          text: "Data reverted and refetched!",
        },
        handleCloseSnackbar
      );
      setRowsSelection([]);
      setRows(() => [...initialRows]);
    }
    handleCloseDialog();
    handleCloseBackdrop();
  };
  //#endregion

  //#region Save changes Button
  const handleSaveChanges = () => {};
  //#endregion

  //#region Add record Button
  const handleAddRecords = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleOpenAddRecordsMenu(
      e,
      {
        anchorOrigin: { horizontal: "right", vertical: "bottom" },
        transformOrigin: { horizontal: "right", vertical: "top" },
      },
      handleAddRecordsConfirmation,
      handleCloseMenu
    );
  };

  const handleAddRecordsConfirmation = (v: number) => {
    let newIdArr: GridRowId[] = [];
    for (let i = 0; i < v; i++) {
      newIdArr = [...newIdArr, randomId()];
    }
    setRows((oldRows) => [
      ...oldRows,
      ...newIdArr.map((id, index) => ({
        id,
        createdDate: new Date(),
        createdBy: "ANHBT",
        lastModifiedDate: new Date(),
        lastModifiedBy: "ANHBT",
        isNew: true,
        isAdded: true,
        lineNo: oldRows.length + index + 1,
      })),
    ]);
    setRowModesModel((oldModel) => {
      const newModel: GridRowModesModel = Object.create(oldModel);
      newIdArr.forEach(
        (newId) =>
          (newModel[newId] = {
            mode: GridRowModes.View,
          })
      );
      return newModel;
    });
  };
  //#endregion

  //#region Delete records Button
  const handleDeleteRecords = () => {
    let isFoundOriginalRow = false;
    for (let i = 0; i < selectedRows.length; i++) {
      let id: string = selectedRows[i];

      if (!rows.find((row) => row.id === id)?.isAdded) {
        isFoundOriginalRow = true;
        break;
      }
    }
    if (isFoundOriginalRow) {
      handleOpenDialog(
        {
          title: "Detele the selected rows?",
          body: "There are some row from the origin table. Do you want to continue?",
        },
        handleDeleteRecordsConfirmation
      );
    } else {
      setRows((oldRows) =>
        oldRows
          .filter((row) => !selectedRows.includes(row.id))
          .map((row, index) => ({ ...row, lineNo: index + 1 }))
      );
    }
  };

  const handleDeleteRecordsConfirmation = (isConfirm: boolean) => {
    if (isConfirm) {
      handleOpenBackdrop(false);
      setRows((oldRows) =>
        oldRows.filter((row) => !selectedRows.includes(row.id))
      );
      selectedRows.forEach((id) => {
        if (!rows.find((row) => row.id === id)?.isAdded) {
          setDeletedRows(deletedRows.add(id));
        }
      });
      handleOpenSnackbar(
        {
          type: "info",
          text: `${selectedRows.length} rows deleted!`,
        },
        handleCloseSnackbar
      );
    }
    handleCloseDialog();
    handleCloseBackdrop();
  };
  //#endregion

  return (
    <>
      <GridToolbarContainer sx={{ justifyContent: "space-between" }}>
        <Box>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarExport />
        </Box>
        <Box>
          <Tooltip title="Revert origin">
            <Button color="warning" onClick={handleRevertHistory}>
              <HistoryIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Save changes">
            <Button color="primary" onClick={handleSaveChanges}>
              <SaveIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Add record">
            <Button color="info" onClick={handleAddRecords}>
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
      <AddRecordDropdownMenu {...menu} />
      <ConfirmDialog {...dialog} />
      <ResultSnackbar {...snackbar} />
      <GridBackdrop {...backdrop} />
    </>
  );
}
