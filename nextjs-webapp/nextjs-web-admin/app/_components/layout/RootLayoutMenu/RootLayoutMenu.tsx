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
import { unprotectedRoutes } from "@/app/_utilities/constants";
import { CookiesContext } from "../CookiesProvider/CookiesProvider";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { SessionContext, UserInfo } from "../SessionContext/SessionContext";
import { SnackbarProvider } from "notistack";
import { getCurrentUserInfo } from "@/app/_hooks/serverActions/AuthService";

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
  children,
  cookieArray,
}: {
  children: React.ReactNode;
  cookieArray: RequestCookie[];
}) {
  const theme = useTheme();
  const route = usePathname();

  const [open, setOpen] = React.useState<boolean>(false);
  const [isInUnprotectedRoutes, setInUnprotectedRoutes] =
    React.useState<boolean>(true);

  const [userInfo, setUserInfo] = React.useState<UserInfo | undefined>(
    undefined
  );
  const [jwt, setJwt] = React.useState<string | undefined>(undefined);
  React.useEffect(() => {
    setJwt(cookieArray.find((t) => t.name === "jwt")?.value);
  }, [cookieArray]);
  React.useEffect(() => {
    if (jwt) {
      getCurrentUserInfo(jwt)
        .then((resp) => {
          if (resp?.status === 200) {
            setUserInfo &&
              setUserInfo({
                isAdmin: resp?.content?.admin || false,
                firstName: resp?.content?.firstName || undefined,
                lastName: resp?.content?.lastName || undefined,
                isMale: resp?.content?.male || undefined,
                authorities: resp?.content?.roles || undefined,
                avatar: resp?.content.avatar || undefined,
              });
          } else {
            console.warn("Can't get the current User Info");
          }
        })
        .catch((ex) => console.error(ex));
    }
  }, [jwt]);

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
    <CookiesContext.Provider value={cookieArray}>
      <SessionContext.Provider
        value={{
          userInfo,
          setUserInfo,
        }}
      >
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
                position: "fixed",
                zIndex: 1,
                flexGrow: 0,
                height: "100%",
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
                    priority
                  />{" "}
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    marginLeft={2}
                  >
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
              <SnackbarProvider>{children}</SnackbarProvider>
            </Box>
          </>
        )}
      </SessionContext.Provider>
    </CookiesContext.Provider>
  );
}
