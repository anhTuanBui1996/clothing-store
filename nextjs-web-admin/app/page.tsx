import { Box, Typography, Button } from "@mui/material";
import { Philosopher } from "next/font/google";
import Image from "next/image";

const philosopher = Philosopher({ subsets: ["latin"], weight: "700" });

export default function Page() {
  return (
    <Box className="page-content h-fit bg-white">
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
        className="mx-auto"
      />
      <Box>
        <Button color="success">Go to Dashboard</Button>
      </Box>
    </Box>
  );
}
