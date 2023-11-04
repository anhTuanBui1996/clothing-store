import TopHeaderBar from "@/components/layout/TopHeaderBar/TopHeaderBar";
import "./globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";

const raleWay = Raleway({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Clothing - Your Store",
  description: "Web Store UI by NextJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={raleWay.className}>
        <TopHeaderBar />
        {children}
      </body>
    </html>
  );
}
