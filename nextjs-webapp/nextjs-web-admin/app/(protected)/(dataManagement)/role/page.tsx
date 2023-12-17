"use client";
import React, { useContext } from "react";
import { GridValidRowModel } from "@mui/x-data-grid";
import DataTableEditor from "@/app/_components/common/DataTableEditor/DataTableEditor";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { gridCols } from "@/app/_dataModels/entity/adminService/Role";
import { CookiesContext } from "@/app/_components/layout/CookiesProvider/CookiesProvider";
import useAdminService from "@/app/_dataModels/serverActions/AdminService";

export default function Page() {
  const [_isMounted, setMounted] = React.useState(true);

  const columns = gridCols;
  const [rows, setInitialRows] = React.useState<GridValidRowModel[] | null>(
    null
  );
  const cookies = useContext(CookiesContext);

  const {
    getAllRole,
    createNewRole,
    updateExistingRole,
    updateAllRoles,
    deleteExistingRole,
    deleteAllRoles,
  } = useAdminService(cookies.find((c) => c.name === "jwt")?.value);

  React.useEffect(() => {
    getAllRole()
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
            Role
          </Typography>
          <DataTableEditor
            columns={columns}
            initialRows={rows}
            getPromise={getAllRole}
            createPromise={createNewRole}
            updatePromise={updateExistingRole}
            updateAllPromise={updateAllRoles}
            deletePromise={deleteExistingRole}
            deleteAllPromise={deleteAllRoles}
          />
        </>
      )}
    </Box>
  );
}
