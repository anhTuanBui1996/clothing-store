import React from "react";
import dynamic from "next/dynamic";
const Box = dynamic(() => import("@mui/material/Box"));
const CircularProgress = dynamic(
  () => import("@mui/material/CircularProgress")
);

export default function Loading() {
  return (
    <Box width={"100vw"} height={"100vh"}>
      <CircularProgress sx={{ margin: "auto" }} />
    </Box>
  );
}
