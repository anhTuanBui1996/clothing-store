import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridInputRowSelectionModel,
  GridRenderCellParams,
  GridRowId,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { Box, Button, ButtonGroup, Dialog, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import RefreshIcon from "@mui/icons-material/Refresh";
import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GridApiCommunity, GridStateColDef } from "@mui/x-data-grid/internals";
import { CookiesContext } from "../../../layout/CookiesProvider/CookiesProvider";

export function RenderCellForReferenceSelect({
  params,
  sourceSchema,
  dataSource,
  displayField,
  isManyToManyRef,
  uploadMethod,
}: {
  params: GridRenderCellParams;
  sourceSchema: GridColDef[];
  dataSource: (token: string, option?: any) => Promise<any>;
  displayField?: string;
  isManyToManyRef?: boolean;
  uploadMethod?: (token: string, options?: any) => Promise<any>;
}): ReactNode {
  const [_isMounted, setMounted] = useState(true);

  const { isEditable, colDef, api, id, cellMode, value } = params;

  const [openEditor, setOpenEditor] = useState(false);
  const [openViewer, setOpenViewer] = useState(false);
  const [source, setSource] = useState([]);
  const cookies = useContext(CookiesContext);
  const token = cookies.find((c) => c.name === "jwt")?.value;
  const [displayValue, setDisplayValue] = useState<string>("");

  useEffect(() => {
    if (token) {
      dataSource(token, isManyToManyRef ? id : undefined)
        .then((data) => {
          if (_isMounted) {
            setSource(
              data.map((o: any, i: number) => ({ ...o, _lineNo: i + 1 })) || []
            );
          }
        })
        .catch((ex) => console.error(ex));
    } else {
      console.warn("No jwt found in cookies at ReferrenceSelect");
    }
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (value && displayField) {
      console.log(value, displayField, source);
      const joinedDisplayValue = value
        .map((id: string) => {
          let foundRow = source.find((r: any) => r.id === id);
          if (foundRow) {
            return foundRow[displayField];
          } else {
            return "";
          }
        })
        .join(", ");
      setDisplayValue(joinedDisplayValue);
    }
  }, [value, source]);

  const handleOpenEditor = () => {
    setOpenEditor(true);
    if (cellMode === "view") {
      api.startRowEditMode({ id, fieldToFocus: colDef.field });
    }
  };
  const handleCloseEditor = () => {
    setOpenEditor(false);
    if (cellMode === "edit") {
      api.stopRowEditMode({ id, field: colDef.field });
    }
  };
  const handleOpenViewer = () => setOpenViewer(true);
  const handleCloseViewer = () => setOpenViewer(false);

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={1}
    >
      {displayValue}
      <ButtonGroup variant="text">
        <Tooltip title="View">
          <Button color="info" onClick={handleOpenViewer}>
            <InfoIcon />
          </Button>
        </Tooltip>
        {isEditable && (
          <Tooltip title="Edit">
            <Button color="warning" onClick={handleOpenEditor}>
              <EditIcon />
            </Button>
          </Tooltip>
        )}
      </ButtonGroup>
      <ReferenceSelectEditor
        idSelected={id}
        setDisplayValueCell={setDisplayValue}
        open={openEditor}
        onClose={handleCloseEditor}
        colDef={colDef}
        cellApi={api}
        schema={sourceSchema}
        source={source}
        currentValue={value}
      />
      <ReferenceSelectViewer
        open={openViewer}
        onClose={handleCloseViewer}
        schema={sourceSchema}
        source={source}
        currentValue={value}
      />
    </Box>
  );
}

export function ReferenceSelectEditor({
  idSelected,
  currentValue,
  open,
  onClose,
  colDef,
  cellApi,
  schema,
  source,
}: {
  idSelected: GridRowId;
  currentValue: any[];
  setDisplayValueCell: (v: string) => void;
  open: boolean;
  onClose: () => void;
  colDef: GridStateColDef;
  cellApi: GridApiCommunity;
  schema: GridColDef[];
  source: any[];
}) {
  // 1 is single, n is multiple selection
  const isMultiple = useMemo(() => {
    switch (colDef.type?.at(colDef.type?.length - 1)) {
      case "1":
        return false;
      default:
        return true;
    }
  }, [colDef.type]);
  const [gridRowSelectionModel, setGridRowSelectionModel] =
    useState<GridInputRowSelectionModel>([]);
  const handleRowSelectionModelChange = (
    rowSelectionModel: GridRowSelectionModel,
    _details: GridCallbackDetails<any>
  ) => {
    setGridRowSelectionModel(
      rowSelectionModel.length > 0
        ? isMultiple
          ? rowSelectionModel
          : [rowSelectionModel[rowSelectionModel.length - 1]]
        : []
    );
  };

  useEffect(() => {
    if (currentValue) {
      setGridRowSelectionModel(currentValue);
    } else {
      setGridRowSelectionModel([]);
    }
  }, [currentValue]);

  const handleOkButtonClicked = () => {
    cellApi.setEditCellValue({
      id: idSelected,
      field: colDef.field,
      value: gridRowSelectionModel,
    });
    onClose();
  };

  const handleOnCloseEditor = () => {
    if (currentValue) {
      setGridRowSelectionModel(currentValue);
    } else {
      setGridRowSelectionModel([]);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleOnCloseEditor}>
      <DataGrid
        showColumnVerticalBorder
        showCellVerticalBorder
        columns={schema.map((col) => ({ ...col, editable: false }))}
        rows={source}
        checkboxSelection
        rowSelectionModel={gridRowSelectionModel}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        autoHeight
      />
      <Box display="flex" justifyContent="space-between" gap={1}>
        <Button fullWidth onClick={handleOkButtonClicked}>
          Ok
        </Button>
        <Tooltip title="Refresh">
          <Button>
            <RefreshIcon />
          </Button>
        </Tooltip>
        <Button fullWidth onClick={handleOnCloseEditor}>
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
}

export function ReferenceSelectViewer({
  open,
  onClose,
  currentValue,
  schema,
  source,
}: {
  open: boolean;
  onClose: () => void;
  currentValue: any[];
  schema: GridColDef[];
  source: any[];
}) {
  const selectedIds = useMemo(() => {
    if (currentValue) {
      return source.filter((r) => currentValue.includes(r.id));
    } else {
      return [];
    }
  }, [currentValue, source]);
  return (
    <Dialog open={open} onClose={onClose}>
      <DataGrid
        showColumnVerticalBorder
        showCellVerticalBorder
        columns={schema.map((col) => ({ ...col, editable: false }))}
        rows={selectedIds}
        disableRowSelectionOnClick
        autoHeight
      />
    </Dialog>
  );
}
