"use client";
import React from "react";
import DataTableEditor from "@/app/_components/common/DataTableEditor/DataTableEditor";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { gridCols } from "@/app/_dataModels/entity/userService/Menu";
import { GridValidRowModel } from "@mui/x-data-grid";
import {
  getAllMenu,
  createNewMenu,
  updateExistingMenu,
  deleteExistingMenu,
} from "@/app/_dataModels/service/UserService";
import BaseResponse from "@/app/_dataModels/core/BaseResponse";

export default function Page() {
  const columns = gridCols;
  const [rows, setInitialRows] = React.useState<GridValidRowModel[] | null>(
    null
  );

  React.useEffect(() => {
    getAllMenu().then((res: BaseResponse) => {
      setInitialRows(res.dataResponse || []);
    });
  }, []);

  return (
    <Box className="page-content" p={3}>
      {rows && (
        <>
          <Typography marginBottom={4} fontFamily={"inherit"} fontWeight={500}>
            User
          </Typography>
          <DataTableEditor
            columns={columns}
            initialRows={rows}
            getPromise={getAllMenu}
            createPromise={createNewMenu}
            updatePromise={updateExistingMenu}
            deletePromise={deleteExistingMenu}
          />
        </>
      )}
    </Box>
  );
}
