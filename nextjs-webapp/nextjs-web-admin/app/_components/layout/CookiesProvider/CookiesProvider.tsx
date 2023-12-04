"use client";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import React from "react";

export type CustomCookie = {
  name: string;
  value: string;
};

export const CookiesContext = React.createContext<RequestCookie[]>([]);
