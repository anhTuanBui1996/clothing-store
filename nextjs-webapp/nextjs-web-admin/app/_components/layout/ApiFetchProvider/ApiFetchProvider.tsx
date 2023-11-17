import React from "react";

export const ApiContext = React.createContext({});

export default async function ApiFetchProvider({
  url,
  method,
  data,
  children,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data: any | undefined | null;
  children: React.ReactNode;
}) {
  const fetchAction = await fetch(url, {
    method,
    body: JSON.stringify(data),
  });
  const result = await fetchAction.json();
  const { status, message, dateResponse, dataResponse } = await result;
  return (
    <ApiContext.Provider
      value={{ status, message, dateResponse, dataResponse }}
    >
      {children}
    </ApiContext.Provider>
  );
}
