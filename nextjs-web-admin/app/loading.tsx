import { Skeleton } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <Skeleton
      animation="wave"
      variant="rectangular"
      width={"auto"}
      height={"auto"}
    />
  );
}
