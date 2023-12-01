"use client";
import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { NextFontContext } from "./_components/layout/NextFontProvider/NextFontProvider";
import Image from "next/image";

const Box = dynamic(() => import("@mui/material/Box"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const Button = dynamic(() => import("@mui/material/Button"));

const Page = () => {
  const { philosopher } = useContext(NextFontContext);
  const [initialLoaded, setInitialLoaded] = useState(false);
  useEffect(() => {
    setInitialLoaded(true);
  }, []);
  return (
    initialLoaded && (
      <Box
        className="page-content flex flex-col justify-center items-center bg-inherit"
        p={3}
      >
        <Typography
          marginBottom={1}
          fontFamily={"inherit"}
          fontWeight={500}
          fontSize={50}
          textAlign={"center"}
          className={philosopher.className}
        >
          Welcome to Administrator Pages
        </Typography>
        <Typography
          marginBottom={4}
          fontFamily={"inherit"}
          fontWeight={300}
          textAlign={"center"}
        >
          Manage your Clothing - Your Store
        </Typography>
        <Image
          alt="welcome-image"
          src="/images/welcome-img.png"
          width={1000}
          height={1000}
          style={{ width: "768px", height: "auto" }}
          priority
          className="mx-auto"
        />
        <Button
          className="bg-[#2e7d32]"
          color="success"
          variant="contained"
          sx={{ my: 5 }}
        >
          Go to Dashboard
        </Button>
      </Box>
    )
  );
};

export default Page;
