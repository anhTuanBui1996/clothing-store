import React from "react";
import dynamic from "next/dynamic";
const Backdrop = dynamic(() => import("@mui/material/Backdrop"));
const CircularProgress = dynamic(
  () => import("@mui/material/CircularProgress")
);

export default function Loading() {
  return (
    <Backdrop open>
      <CircularProgress sx={{ margin: "auto" }} />
    </Backdrop>
  );
}
