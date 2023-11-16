"use client";

import { Box, Button, Typography } from "@mui/material";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Box className="error-page">
      <Typography mb={2}>Something went wrong!</Typography>
      <Button onClick={() => reset()}>Try again</Button>
    </Box>
  );
}
