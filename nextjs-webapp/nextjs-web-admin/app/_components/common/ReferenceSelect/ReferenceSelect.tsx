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
import React from "react";
import { GridApiCommunity, GridStateColDef } from "@mui/x-data-grid/internals";
import { CookiesContext } from "../../layout/CookiesProvider/CookiesProvider";

export function RenderCellForReferenceSelect({
  params,
  sourceSchema,
  dataSource,
  uploadMethod,
}: {
  params: GridRenderCellParams;
  sourceSchema: GridColDef[];
  dataSource: (token: string, options?: any) => Promise<any>;
  uploadMethod: (token: string, options?: any) => Promise<any>;
}): React.ReactNode {
  const [_isMounted, setMounted] = React.useState(true);

  const { isEditable, colDef, api, id } = params;

  const [openEditor, setOpenEditor] = React.useState(false);
  const [openViewer, setOpenViewer] = React.useState(false);
  const [source, setSource] = React.useState([]);
  const cookies = React.useContext(CookiesContext);
  const token = cookies.find((c) => c.name === "jwt")?.value;

  React.useEffect(() => {
    if (token) {
      dataSource(token, id)
        .then((data) => {
          _isMounted && setSource(data);
        })
        .catch((ex) => console.error(ex));
    } else {
      console.warn("No jwt found in cookies at ReferrenceSelect");
    }
    return () => setMounted(false);
  });

  const handleOpenEditor = () => {
    setOpenEditor(true);
    api.startRowEditMode({ id, fieldToFocus: colDef.field });
  };
  const handleCloseEditor = () => {
    setOpenEditor(false);
    api.stopRowEditMode({ id, field: colDef.field });
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
        open={openEditor}
        onClose={handleCloseEditor}
        colDef={colDef}
        cellApi={api}
        schema={sourceSchema}
        source={source}
      />
      <ReferenceSelectViewer
        open={openViewer}
        onClose={handleCloseViewer}
        schema={sourceSchema}
        source={source}
      />
    </Box>
  );
}

export function ReferenceSelectEditor({
  idSelected,
  open,
  onClose,
  colDef,
  cellApi,
  schema,
  source,
}: {
  idSelected: GridRowId;
  open: boolean;
  onClose: () => void;
  colDef: GridStateColDef;
  cellApi: GridApiCommunity;
  schema: GridColDef[];
  source: any[];
}) {
  // 1 is single, n is multiple selection
  const isMultiple = React.useMemo(() => {
    switch (colDef.type?.at(colDef.type?.length - 1)) {
      case "1":
        return false;
      default:
        return true;
    }
  }, [colDef.type]);
  const [gridRowSelectionModel, setGridRowSelectionModel] =
    React.useState<GridInputRowSelectionModel>([]);
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

  const handleOkButtonClicked = () => {
    cellApi.setEditCellValue({
      id: idSelected,
      field: colDef.field,
      value: gridRowSelectionModel,
    });
    onClose();
  };

  return (
    <Dialog open={open}>
      <DataGrid
        showColumnVerticalBorder
        showCellVerticalBorder
        columns={[
          { field: "row", headerName: "Row" },
          { field: "value", headerName: "Value" },
          { field: "value1", headerName: "Value" },
          { field: "value2", headerName: "Value" },
          { field: "value3", headerName: "Value" },
          { field: "value4", headerName: "Value" },
        ]}
        rows={[
          { id: 0, row: 1, value: "Test value" },
          { id: 1, row: 2, value: "Test value" },
          { id: 2, row: 3, value: "Test value" },
          { id: 3, row: 4, value: "Test value" },
          { id: 4, row: 5, value: "Test value" },
          { id: 5, row: 6, value: "Test value" },
          { id: 6, row: 7, value: "Test value" },
          { id: 7, row: 8, value: "Test value" },
          { id: 8, row: 9, value: "Test value" },
          { id: 9, row: 10, value: "Test value" },
        ]}
        checkboxSelection
        rowSelectionModel={gridRowSelectionModel}
        onRowSelectionModelChange={handleRowSelectionModelChange}
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
        <Button fullWidth onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
}

export function ReferenceSelectViewer({
  open,
  onClose,
  schema,
  source,
}: {
  open: boolean;
  onClose: () => void;
  schema: GridColDef[];
  source: any[];
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DataGrid
        showColumnVerticalBorder
        showCellVerticalBorder
        columns={[
          { field: "row", headerName: "Row" },
          { field: "value", headerName: "Value" },
          { field: "value1", headerName: "Value" },
          { field: "value2", headerName: "Value" },
          { field: "value3", headerName: "Value" },
          { field: "value4", headerName: "Value" },
        ]}
        rows={[
          { id: 0, row: 1, value: "Test value" },
          { id: 1, row: 2, value: "Test value" },
          { id: 2, row: 3, value: "Test value" },
          { id: 3, row: 4, value: "Test value" },
          { id: 4, row: 5, value: "Test value" },
          { id: 5, row: 6, value: "Test value" },
          { id: 6, row: 7, value: "Test value" },
          { id: 7, row: 8, value: "Test value" },
          { id: 8, row: 9, value: "Test value" },
          { id: 9, row: 10, value: "Test value" },
        ]}
        disableRowSelectionOnClick
      />
    </Dialog>
  );
}
