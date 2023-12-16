import {
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useContext, useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/app/_dataModels/serverActions/AuthService";
import { deleteCookie } from "@/app/_utilities/cookieDispatcher";
import { SessionContext } from "../SessionContext/SessionContext";

export default function UserInfoDropdown() {
  const router = useRouter();
  const { userInfo } = useContext(SessionContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => setAnchorEl(null);
  const handleLogout = async () => {
    const res = await signOut();
    if (res === 200) {
      deleteCookie("jwt")
        .then(() => {
          router.replace("/login?signout", { scroll: false });
        })
        .catch((ex) => console.error(ex));
    }
  };

  return (
    <>
      <Avatar
        onClick={handleOpenMenu}
        aria-controls={open ? "user-info-mini" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{ cursor: "pointer" }}
      >
        {userInfo?.lastName[0].toLocaleUpperCase()}
      </Avatar>
      <Menu
        id="user-info-mini"
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        autoFocus={false}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText>User Info</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Sign Out</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
