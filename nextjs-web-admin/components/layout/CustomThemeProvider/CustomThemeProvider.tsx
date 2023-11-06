"use client"
import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";

const THEME = createTheme({
  typography: {
    fontFamily: "inherit",
  },
});

export default function CustomThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={THEME}>{children}</ThemeProvider>;
}
