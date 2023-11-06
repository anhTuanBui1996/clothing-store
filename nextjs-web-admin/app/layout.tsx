import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LeftSideMenu from "@/components/layout/LeftSideMenu/LeftSideMenu";
import "./globals.css";
import { Box } from "@mui/material";
import CustomThemeProvider from "@/components/layout/CustomThemeProvider/CustomThemeProvider";

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
          <Box sx={{ display: "flex" }}>
            <LeftSideMenu>{children}</LeftSideMenu>
          </Box>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
