import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LeftSideMenu from "@/app/_components/layout/LeftSideMenu/LeftSideMenu";
import "./globals.css";
import { Box } from "@mui/material";
import CustomThemeProvider from "@/app/_components/layout/CustomThemeProvider/CustomThemeProvider";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <CustomThemeProvider>
          <Box
            sx={{
              display: "flex",
              width: "100vw",
              minWidth: "100%",
              background: "inherit",
            }}
          >
            <LeftSideMenu>{children}</LeftSideMenu>
          </Box>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
