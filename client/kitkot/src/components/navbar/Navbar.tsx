import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Tooltip,
  Typography,
  SvgIcon,
  useTheme,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";
import SearchBar from "./SearchBar";
import ColorModeContext from "../../contexts/ColorModeContext";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ReactComponent as KitKotLogo } from "../../logo.svg";
import { useUserContextState } from "../../contexts/UserContext";
import { DropMenuProps } from "../../types/types.interface";

export default function Navbar() {
  const user = useUserContextState();

  const AnonElements = () => {
    return (
      <Box>
        <Button> Upload </Button>
        <Button> Log in </Button>
        <Tooltip title="Login">
          <IconButton color="inherit" href="/login">
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Box>
    );
  };

  const DropDownMenu = ({ settings, state }: DropMenuProps) => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
      state.setOpen(false);
    };

    return (
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={state.open}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem
            disabled={setting.disabled}
            key={setting.key}
            onClick={handleCloseUserMenu}
          >
            {setting.icon ? <setting.icon /> : null}
            <Typography sx={{ marginLeft: "5px" }} textAlign="center">
              {setting.key}
            </Typography>
            {setting.content ? setting.content : null}
          </MenuItem>
        ))}
      </Menu>
    );
  };

  const UserElements = () => {
    const [open, setOpen] = useState(false);
    const getDisplayNameInitials = () => {
      const tempUser =
        user == null
          ? {
              displayName: "Anonymous",
              photoURL: "",
              id: -1,
              email: "",
            }
          : user;

      const name = tempUser.displayName;
      const nameSplit = name.split(" ");
      if (nameSplit.length > 1) {
        const initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
        return initials.toUpperCase();
      } else {
        return "A";
      }
    };

    const colorMode = React.useContext(ColorModeContext);
    const settings = [
      { key: "Profile", icon: PermIdentityIcon },
      { key: "Settings", icon: SettingsIcon },
      {
        key: "Dark mode",
        icon: colorMode.colorMode === "dark" ? DarkModeIcon : LightModeIcon,
        content: (
          <Switch
            checked={colorMode.colorMode === "dark"}
            onClick={colorMode.toggleColorMode}
          />
        ),
      },
      { key: "", content: <Divider />, disabled: true },
      { key: "Logout", icon: LogoutIcon },
    ];

    return (
      <Box id="user-elements" sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={() => setOpen(true)} sx={{ p: 0 }}>
            <Avatar src={user && user.photoURL ? user.photoURL : undefined}>
              {getDisplayNameInitials()}
            </Avatar>
          </IconButton>
        </Tooltip>
        <DropDownMenu settings={settings} state={{ open, setOpen }} />
      </Box>
    );
  };

  const theme = useTheme();
  return (
    <AppBar
      color="default"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      position="static"
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginRight: "10px",
          }}
        >
          <SvgIcon
            sx={{ fontSize: "60px" }}
            htmlColor={theme.palette.text.primary}
          >
            <KitKotLogo />
          </SvgIcon>
          <Typography variant="h6" noWrap component="div">
            KitKot
          </Typography>
        </Box>
        <Box display={{ xs: "none", sm: "flex" }}>
          <SearchBar />
        </Box>
        {user ? <UserElements /> : <AnonElements />}
      </Toolbar>
    </AppBar>
  );
}
