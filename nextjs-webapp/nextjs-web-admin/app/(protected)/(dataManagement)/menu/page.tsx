"use client";
import React from "react";
import DataTableEditor from "@/app/_components/common/DataTableEditor/DataTableEditor";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { gridCols } from "@/app/_dataModels/entity/userService/Menu";
import { GridValidRowModel } from "@mui/x-data-grid";
import useAdminService from "@/app/_utils/service/AdminService";
import { getCookie } from "cookies-next";

export default function Page() {
  const columns = gridCols;
  const [rows, setInitialRows] = React.useState<GridValidRowModel[] | null>(
    null
  );
  const {
    getAllMenu,
    createNewMenu,
    updateExistingMenu,
    updateAllMenus,
    deleteExistingMenu,
    deleteAllMenus,
  } = useAdminService(getCookie("jwt"));

  React.useEffect(() => {
    getAllMenu()
      .then((res) => {
        setInitialRows(res.dataResponse || []);
      })
      .catch((err) => {
        console.error(err);
        setInitialRows([]);
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
            updateAllPromise={updateAllMenus}
            deletePromise={deleteExistingMenu}
            deleteAllPromise={deleteAllMenus}
          />
        </>
      )}
    </Box>
  );
}
