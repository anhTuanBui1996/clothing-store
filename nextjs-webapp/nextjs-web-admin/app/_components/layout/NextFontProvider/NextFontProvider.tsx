"use client"
import React from "react";
import { Philosopher, Inter } from "next/font/google";

const philosopher = Philosopher({ subsets: ["latin"], weight: "700" });
const inter = Inter({ subsets: ["latin"] });

export const NextFontContext = React.createContext({
  philosopher,
  inter,
});

export default function NextFontProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextFontContext.Provider value={{ philosopher, inter }}>
      {children}
    </NextFontContext.Provider>
  );
}
