"use client";
import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

export const PageLoadingContext = React.createContext({
  isLoading: true,
  setLoading: (_v: boolean) => {},
});

const PageLoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const value = { isLoading, setLoading };
  React.useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <PageLoadingContext.Provider value={value}>
      {children}
      <Backdrop component={"div"} open={isLoading} sx={{ zIndex: 1202 }}>
        <CircularProgress />
      </Backdrop>
    </PageLoadingContext.Provider>
  );
};

export default PageLoadingProvider;
