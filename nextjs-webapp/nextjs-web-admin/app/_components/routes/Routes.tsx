import {
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Tooltip,
} from "@mui/material";
import React, { ReactElement } from "react";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CategoryIcon from "@mui/icons-material/Category";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContactsIcon from "@mui/icons-material/Contacts";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SellIcon from "@mui/icons-material/Sell";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { usePathname } from "next/navigation";

type RouteItemProps = {
  path: string;
  icon: ReactElement;
  text: string;
};

type RouteGroupProps = {
  text: string;
  itemLinks: RouteItemProps[];
};

const routesArr = [
  {
    text: "Monitoring",
    itemLinks: [
      { path: "/", icon: <HomeIcon />, text: "Home" },
      { path: "/dashboard", icon: <DashboardIcon />, text: "Dashboard" },
    ],
  },
  {
    text: "Data Management",
    itemLinks: [
      { path: "/product", icon: <ShoppingBagIcon />, text: "Product" },
      { path: "/brand", icon: <Diversity3Icon />, text: "Brand" },
      { path: "/category", icon: <CategoryIcon />, text: "Category" },
      { path: "/role", icon: <AdminPanelSettingsIcon />, text: "Role" },
      { path: "/user", icon: <ContactsIcon />, text: "User" },
      { path: "/menu", icon: <MenuBookIcon />, text: "Menu" },
      { path: "/permission", icon: <AccessibilityNewIcon />, text: "Permission" },
      { path: "/order", icon: <SellIcon />, text: "Order" },
    ],
  },
] as RouteGroupProps[];

export default function Routes({
  isDrawerOpened,
}: {
  isDrawerOpened: boolean;
}) {
  const pathname = usePathname();
  return (
    <>
      <CssBaseline />
      {routesArr.map((routeGroup: RouteGroupProps, groupIndex: number) => (
        <List
          disablePadding
          key={groupIndex}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            isDrawerOpened && (
              <ListSubheader
                sx={{ fontWeight: 700 }}
                component="div"
                id="nested-list-subheader"
              >
                {routeGroup.text}
              </ListSubheader>
            )
          }
        >
          {routeGroup.itemLinks.map((routeItem: RouteItemProps) => (
            <Link href={routeItem.path} key={routeItem.path} scroll={false}>
              <Tooltip title={routeItem.text} placement="right">
                <ListItem
                  key={routeItem.path}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: isDrawerOpened ? "initial" : "center",
                      px: 2.5,
                      backgroundColor:
                        routeItem.path === pathname ? "#0000001f" : "",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: isDrawerOpened ? 3 : "auto",
                        justifyContent: "center",
                        color: routeItem.path === pathname ? "#2e7d32" : "",
                      }}
                    >
                      {routeItem.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={routeItem.text}
                      primaryTypographyProps={{
                        fontFamily: "inherit",
                        fontWeight: "inherit",
                        fontSize: 14,
                        color: routeItem.path === pathname ? "#2e7d32" : "",
                      }}
                      sx={{
                        opacity: isDrawerOpened ? 1 : 0,
                        fontWeight: 500,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            </Link>
          ))}
          <Divider />
        </List>
      ))}
    </>
  );
}
