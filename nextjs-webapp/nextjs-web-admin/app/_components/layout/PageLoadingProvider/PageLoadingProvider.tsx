"use client";
import React from "react";
import dynamic from "next/dynamic";
const Backdrop = dynamic(() => import("@mui/material/Backdrop"));
const CircularProgress = dynamic(
  () => import("@mui/material/CircularProgress")
);

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
      <Backdrop open={isLoading} sx={{ zIndex: 1202 }}>
        <CircularProgress />
      </Backdrop>
    </PageLoadingContext.Provider>
  );
};

export default PageLoadingProvider;
