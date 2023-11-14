// app/not-found.tsx
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      className="not-found-page flex flex-col justify-center items-center"
      p={3}
    >
      <Typography className="font-medium text-2xl mb-4">
        404 - Page not found
      </Typography>
      <Typography className="font-light mb-6">
        There is nothing here...
      </Typography>
      <Button color="success">
        <Link href={"/"}>Go to Home</Link>
      </Button>
    </Box>
  );
}
