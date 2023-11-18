import React, { useEffect, useMemo, useState } from "react";
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
  GridValidRowModel,
  GridColDef,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { Box, Button, Tooltip, PopoverOrigin } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History";
import ConfirmDialog, {
  ConfirmDialogProps,
  DialogConfirmationOnCloseHandler,
  DialogContentType,
} from "./toolbarItem/ConfirmDialog";
import GridBackdrop, { GridBackdropProps } from "./toolbarItem/GridBackdrop";
import AddRecordDropdownMenu, {
  DropdownMenuProps,
} from "./toolbarItem/AddRecordDropdownMenu";
import BaseReponse from "@/app/_dataModels/core/BaseResponse";
import { useSnackbar } from "notistack";
import { gridDefaults } from "@/app/_dataModels/core/BaseEntity";

export interface EditToolbarProps {
  initialRows: GridRowsProp;
  columns: GridColDef[];
  rows: GridValidRowModel[];
  rowsSelection: GridInputRowSelectionModel;
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  setRowsSelection: (newRowsSelection: GridInputRowSelectionModel) => void;
  getPromise?: () => Promise<BaseReponse>;
  createPromise?: (data: any) => Promise<BaseReponse>;
  updatePromise?: (data: any) => Promise<BaseReponse>;
  updateAllPromise?: (data: any[]) => Promise<BaseReponse>;
  deletePromise?: (id: string) => Promise<BaseReponse>;
  deleteAllPromise?: (id: string[]) => Promise<BaseReponse>;
}

type ActionStatus = "idle" | "processing" | "success" | "fail";

export default function EditToolbar(props: EditToolbarProps) {
  const {
    initialRows,
    columns,
    rows,
    rowsSelection,
    setRows,
    setRowModesModel,
    setRowsSelection,
    getPromise,
    createPromise,
    updatePromise,
    updateAllPromise,
    deletePromise,
    deleteAllPromise,
  } = props;
  //#region Data model states
  const selectedRows = rowsSelection as string[];
  const [deletedRows, setDeletedRows] = React.useState(new Set<string>());
  const newRowModel = useMemo(() => {
    const resModel = columns.reduce((result, key) => {
      const { field, type } = key;
      (result as any)[field] = type?.startsWith("referenceSelect") ? [] : null;
      return result;
    }, {});
    gridDefaults.forEach((col) => {
      delete (resModel as any)[col.field];
    });
    return resModel;
  }, [columns]);
  //#endregion

  //#region CRUD action statuses
  const [deletedActionStatus, setDeletedActionStatus] =
    useState<ActionStatus>("idle");
  const [updatedActionStatus, setUpdateddActionStatus] =
    useState<ActionStatus>("idle");
  //#endregion

  //#region Menu
  const handleCloseMenu = () => {
    setMenu((oldMenu: DropdownMenuProps) => ({ ...oldMenu, anchorEl: null }));
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
  const [menu, setMenu] = React.useState<DropdownMenuProps>({ anchorEl: null });
  //#endregion

  //#region Dialog
  const handleCloseDialog = () => {
    setDialog((oldDialog: ConfirmDialogProps) => ({
      ...oldDialog,
      open: false,
    }));
  };

  const handleOpenDialog = (
    content: DialogContentType,
    onClose: DialogConfirmationOnCloseHandler
  ) => {
    setDialog({ open: true, content, onClose });
  };

  const [dialog, setDialog] = React.useState<ConfirmDialogProps>({
    open: false,
  });
  //#endregion

  //#region Snackbar
  const { enqueueSnackbar } = useSnackbar();
  const handleOpenSnackbar = (
    content: string,
    variant: "default" | "error" | "success" | "warning" | "info"
  ) => {
    enqueueSnackbar(content, { variant });
  };
  //#endregion

  //#region Backdrop
  const [backdrop, setBackdrop] = React.useState<GridBackdropProps>({
    open: false,
  });

  const handleOpenBackdrop = (isFullScreen?: boolean) => {
    setBackdrop({ open: true, isFullScreen });
  };

  const handleCloseBackdrop = () => {
    setBackdrop((oldBackdrop: GridBackdropProps) => ({
      ...oldBackdrop,
      open: false,
    }));
  };
  //#endregion

  // Background effect async
  //#region Backdrop for CRUD actions
  useEffect(() => {
    if (
      deletedActionStatus === "processing" ||
      updatedActionStatus === "processing"
    ) {
      handleOpenBackdrop(false);
    } else {
      handleCloseBackdrop();
      if (
        deletedActionStatus === "success" &&
        updatedActionStatus === "success"
      ) {
        handleOpenSnackbar("Save changes successfully", "success");
      } else if (
        deletedActionStatus === "fail" ||
        updatedActionStatus === "fail"
      ) {
        handleOpenSnackbar("Save changes failed", "error");
      }
      setDeletedActionStatus("idle");
      setUpdateddActionStatus("idle");
    }
  }, [deletedActionStatus, updatedActionStatus]);
  //#endregion

  //#region Rows changes event listener
  const [saveChangesDisabled, setSaveChangesDisabled] = useState(false);
  useEffect(() => {
    if (
      rows.filter((row) => row.isUpdated).length > 0 ||
      deletedRows.size > 0
    ) {
      setSaveChangesDisabled(false);
    } else {
      setSaveChangesDisabled(true);
    }
  }, [rows]);
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
      handleOpenSnackbar("Refreshed data and discarded changes", "success");
      getPromise
        ? getPromise().then((obj: BaseReponse) =>
            setRows(
              obj.dataResponse.map((v: any, i: number) => ({
                ...v,
                lineNo: i + 1,
              }))
            )
          )
        : setRows(() => initialRows);
      setRowsSelection([]);
      setDeletedRows(new Set<string>());
    }
    handleCloseDialog();
    handleCloseBackdrop();
  };
  //#endregion

  //#region Save changes Button
  const handleSaveChanges = () => {
    if (
      rows.filter((row) => row.isUpdated).length > 0 ||
      deletedRows.size > 0
    ) {
      handleOpenDialog(
        {
          title: "Save all changes",
          body: "All deleted rows and modified changes will be committed",
        },
        handleSaveChangesConfirmation
      );
    }
  };

  const handleSaveChangesConfirmation = (isConfirm: boolean) => {
    if (isConfirm) {
      handleOpenBackdrop(false);
      if (deletedRows.size > 0) {
        setDeletedActionStatus("processing");
        deleteAllPromise &&
          deleteAllPromise(Array.from(deletedRows)).then((obj: BaseReponse) => {
            if (typeof obj.status === "string") {
              setDeletedRows(new Set<string>());
              if (obj.status.endsWith("Successfully")) {
                setDeletedActionStatus("success");
              } else {
                setDeletedActionStatus("fail");
              }
            } else {
              setDeletedActionStatus("fail");
              console.log(obj);
            }
          });
      }
      if (rows.filter((row) => row.isUpdated).length > 0) {
        updateAllPromise &&
          updateAllPromise(rows).then((obj: BaseReponse) => {
            if (typeof obj.status === "string") {
              if (obj.status.endsWith("Successfully")) {
                setUpdateddActionStatus("success");
              } else {
                setDeletedActionStatus("fail");
              }
              handleRevertHistory();
            } else {
              setDeletedActionStatus("fail");
              console.log(obj);
            }
          });
      }
    }
  };
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
      newIdArr.push(randomId());
    }
    setRows((oldRows) => [
      ...oldRows,
      ...newIdArr.map((id, index) => ({
        ...newRowModel,
        id,
        createdDate: new Date(),
        createdBy: "ANHBT",
        lastModifiedDate: new Date(),
        lastModifiedBy: "ANHBT",
        lineNo: oldRows.length + index + 1,
        isAdded: true,
        isUpdated: true,
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
    handleCloseMenu();
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
      handleOpenSnackbar(`${selectedRows.length} rows deleted!`, "info");
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
            <Button
              color="primary"
              onClick={handleSaveChanges}
              disabled={saveChangesDisabled}
            >
              <SaveIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Add record">
            <Button color="success" onClick={handleAddRecords}>
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
      <GridBackdrop {...backdrop} />
    </>
  );
}
