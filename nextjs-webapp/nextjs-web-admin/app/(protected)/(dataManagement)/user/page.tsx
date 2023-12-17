"use client";
import React, { useContext } from "react";
import { GridValidRowModel } from "@mui/x-data-grid";
import DataTableEditor from "@/app/_components/common/DataTableEditor/DataTableEditor";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { gridCols } from "@/app/_dataModels/entity/adminService/User";
import useAdminService from "@/app/_dataModels/serverActions/AdminService";
import { CookiesContext } from "@/app/_components/layout/CookiesProvider/CookiesProvider";

export default function Page() {
  const columns = gridCols;
  const [rows, setInitialRows] = React.useState<GridValidRowModel[] | null>(
    null
  );
  const cookies = useContext(CookiesContext);

  const {
    getAllUser,
    createNewUser,
    updateExistingUser,
    updateAllUsers,
    deleteExistingUser,
    deleteAllUsers,
  } = useAdminService(cookies.find((c) => c.name === "jwt")?.value);

  React.useEffect(() => {
    getAllUser()
      .then((res) => {
        setInitialRows(res);
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
          <Typography marginBottom={1} fontFamily={"inherit"} fontWeight={500}>
            User
          </Typography>
          <DataTableEditor
            columns={columns}
            initialRows={rows}
            getPromise={getAllUser}
            createPromise={createNewUser}
            updatePromise={updateExistingUser}
            updateAllPromise={updateAllUsers}
            deletePromise={deleteExistingUser}
            deleteAllPromise={deleteAllUsers}
          />
        </>
      )}
    </Box>
  );
}
