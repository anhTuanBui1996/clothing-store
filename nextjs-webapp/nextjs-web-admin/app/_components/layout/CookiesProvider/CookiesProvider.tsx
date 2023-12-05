"use client";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import React from "react";

export const CookiesContext = React.createContext<RequestCookie[]>([]);
