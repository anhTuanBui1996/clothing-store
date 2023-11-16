import { Box, Typography, Button } from "@mui/material";
import { Philosopher } from "next/font/google";
import Image from "next/image";

const philosopher = Philosopher({ subsets: ["latin"], weight: "700" });

export default function Page() {
  return (
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
        width={768}
        height={368}
        style={{ width: "768px", height: "368px" }}
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
  );
}
