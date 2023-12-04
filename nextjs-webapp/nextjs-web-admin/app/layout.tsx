import React from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import RootLayoutMenu from "@/app/_components/layout/RootLayoutMenu/RootLayoutMenu";
import "./globals.css";
import { Box } from "@mui/material";
import CustomThemeProvider from "@/app/_components/layout/CustomThemeProvider/CustomThemeProvider";
import NextFontProvider from "./_components/layout/NextFontProvider/NextFontProvider";
import { cookies } from "next/headers";
const PageLoadingProvider = dynamic(
  () => import("./_components/layout/PageLoadingProvider/PageLoadingProvider")
);

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
          <NextFontProvider>
            <PageLoadingProvider>
              <Box
                sx={{
                  display: "flex",
                  width: "100vw",
                  minWidth: "100%",
                  background: "inherit",
                }}
              >
                <RootLayoutMenu cookies={cookies()}>{children}</RootLayoutMenu>
              </Box>
            </PageLoadingProvider>
          </NextFontProvider>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
