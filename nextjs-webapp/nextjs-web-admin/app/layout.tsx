import React from "react";
import type { Metadata } from "next";
import RootLayoutMenu from "@/app/_components/layout/RootLayoutMenu/RootLayoutMenu";
import "./globals.css";
import { Box } from "@mui/material";
import CustomThemeProvider from "@/app/_components/layout/CustomThemeProvider/CustomThemeProvider";

export const metadata: Metadata = {
  title: "Clothing - Your store administrator",
  description: "Web Admin UI by NextJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CustomThemeProvider>
          <Box
            sx={{
              display: "flex",
              width: "100vw",
              minWidth: "100%",
              background: "inherit",
            }}
          >
            <RootLayoutMenu>{children}</RootLayoutMenu>
          </Box>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
