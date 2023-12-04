"use client";
import "animate.css";
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Image from "next/image";
import Routes from "@/app/_components/routes/Routes";
import TopHeaderBar from "../TopHeaderBar/TopHeaderBar";
import { CssBaseline, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { unprotectedRoutes } from "@/app/_utils/constants";
import { CookiesContext } from "../CookiesProvider/CookiesProvider";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function RootLayoutMenu({
  cookies,
  children,
}: {
  cookies: any;
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const route = usePathname();

  const [open, setOpen] = React.useState<boolean>(false);
  const [isInUnprotectedRoutes, setInUnprotectedRoutes] =
    React.useState<boolean>(true);

  React.useEffect(() => {
    if (unprotectedRoutes.includes(route)) {
      setInUnprotectedRoutes(true);
    } else {
      setInUnprotectedRoutes(false);
    }
  }, [route]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <CookiesContext.Provider value={cookies}>
      {isInUnprotectedRoutes ? (
        <Box component="main" sx={{ minWidth: "1px", flexGrow: 1 }}>
          {children}
        </Box>
      ) : (
        <>
          <CssBaseline />
          <TopHeaderBar
            isDrawerOpened={open}
            handleDrawerOpen={handleDrawerOpen}
          />
          <Drawer
            className="animate__animated animate__slideInLeft"
            variant="permanent"
            elevation={20}
            open={open}
            sx={{
              flexGrow: 0,
              boxShadow:
                "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);",
            }}
          >
            <DrawerHeader>
              <Link
                href={"/"}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Image
                  alt="logo"
                  src={`/images/retina-logo1.png`}
                  width={250}
                  height={256}
                  style={{ width: "40px", height: "40px" }}
                />{" "}
                <Typography variant="h6" noWrap component="div" marginLeft={2}>
                  BTAWebApp
                </Typography>
              </Link>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <Routes isDrawerOpened={open} />
          </Drawer>
          <Box component="main" sx={{ minWidth: "1px", flexGrow: 1 }}>
            <DrawerHeader />
            {children}
          </Box>
        </>
      )}
    </CookiesContext.Provider>
  );
}
