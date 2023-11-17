import React from "react";
import DataTableEditor from "@/app/_components/common/DataTableEditor/DataTableEditor";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { gridCols } from "@/app/_dataModels/entity/userService/Menu";
import { GridValidRowModel } from "@mui/x-data-grid";
import ApiFetchProvider, {
  ApiContext,
} from "@/app/_components/layout/ApiFetchProvider/ApiFetchProvider";

export default function Page() {
  const columns = gridCols;
  const ctx = React.useContext(ApiContext);
  const rows: readonly GridValidRowModel[] = [];

  return (
    <Box className="page-content" p={3}>
      <Typography marginBottom={4} fontFamily={"inherit"} fontWeight={500}>
        User
      </Typography>
      <ApiFetchProvider
        url={`${process.env.USER_SERVICE_ORIGIN}/menu/`}
        method="GET"
        data={undefined}
      >
        <DataTableEditor columns={columns} initialRows={rows} />
      </ApiFetchProvider>
    </Box>
  );
}
