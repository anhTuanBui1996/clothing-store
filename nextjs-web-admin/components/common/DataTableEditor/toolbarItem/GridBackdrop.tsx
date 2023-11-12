import { Backdrop, CircularProgress } from "@mui/material";

export interface GridBackdropProps {
  open: boolean;
  isFullScreen?: boolean;
}

export default function GridBackdrop(props: GridBackdropProps) {
  const { open, isFullScreen } = props;
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: !isFullScreen ? "absolute" : undefined,
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
