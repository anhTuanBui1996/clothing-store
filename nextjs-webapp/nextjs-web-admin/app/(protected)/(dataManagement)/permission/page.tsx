import DataTableEditor from "@/app/_components/common/DataTableEditor/DataTableEditor";
import { CookiesContext } from "@/app/_components/layout/CookiesProvider/CookiesProvider";
import { gridCols } from "@/app/_dataModels/entity/adminService/Permissions";
import useAdminService from "@/app/_utils/serverActions/AdminService";
import { GridValidRowModel } from "@mui/x-data-grid";
import { Typography, Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

export default function Page() {
  const [_isMounted, setMounted] = React.useState(true);

  const columns = gridCols;
  const [rows, setInitialRows] = useState<GridValidRowModel[] | null>(null);
  const cookies = useContext(CookiesContext);

  const { getAllPermission, updateAllPermissions } = useAdminService(
    cookies.find((c) => c.name === "jwt")?.value
  );

  useEffect(() => {
    getAllPermission()
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
          <Typography marginBottom={4} fontFamily={"inherit"} fontWeight={500}>
            User
          </Typography>
          <DataTableEditor
            columns={columns}
            initialRows={rows}
            getPromise={getAllPermission}
            updateAllPromise={updateAllPermissions}
          />
        </>
      )}
    </Box>
  );
}
