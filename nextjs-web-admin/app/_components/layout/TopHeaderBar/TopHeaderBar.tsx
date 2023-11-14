import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Image from "next/image";
import Link from "next/link";
import UserInfoDropdown from "../UserInfoDropdown/UserInfoDropdown";
import { Box } from "@mui/material";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function TopHeaderBar({
  isDrawerOpened,
  handleDrawerOpen,
}: {
  isDrawerOpened: boolean;
  handleDrawerOpen: () => void;
}) {
  return (
    <AppBar
      position="fixed"
      open={isDrawerOpened}
      variant="elevation"
      color="success"
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display={"flex"} flexDirection={"row"}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(isDrawerOpened && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {!isDrawerOpened && (
            <Link href={"/"} style={{ display: "flex", alignItems: "center" }}>
              <Image
                alt="logo"
                src={`/images/retina-logo.png`}
                width={250}
                height={256}
                style={{ width: "40px", height: "40px" }}
              />
              <Typography variant="h6" noWrap component="div" marginLeft={2}>
                BTAWebApp
              </Typography>
            </Link>
          )}
        </Box>
        <UserInfoDropdown />
      </Toolbar>
    </AppBar>
  );
}
