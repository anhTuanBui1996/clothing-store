"use client";
import React, { useContext } from "react";
import DataTableEditor from "@/app/_components/common/DataTableEditor/DataTableEditor";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { gridCols } from "@/app/_dataModels/entity/adminService/Menu";
import { GridValidRowModel } from "@mui/x-data-grid";
import useAdminService from "@/app/_dataModels/serverActions/AdminService";
import { CookiesContext } from "@/app/_components/layout/CookiesProvider/CookiesProvider";

export default function Page() {
  const [_isMounted, setMounted] = React.useState(true);

  const columns = gridCols;
  const [rows, setInitialRows] = React.useState<GridValidRowModel[] | null>(
    null
  );
  const cookies = useContext(CookiesContext);

  const {
    getAllMenu,
    createNewMenu,
    updateExistingMenu,
    updateAllMenus,
    deleteExistingMenu,
    deleteAllMenus,
  } = useAdminService(cookies.find((c) => c.name === "jwt")?.value);

  React.useEffect(() => {
    getAllMenu()
      .then((res) => {
        _isMounted && setInitialRows(res);
      })
      .catch((err) => {
        console.error(err);
        _isMounted && setInitialRows([]);
      });
    return () => setMounted(false);
  }, []);

  return (
    <Box className="page-content" p={3}>
      {rows && (
        <>
          <Typography marginBottom={1} fontFamily={"inherit"} fontWeight={500}>
            Menu
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
