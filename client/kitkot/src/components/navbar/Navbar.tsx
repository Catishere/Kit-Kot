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
  Modal,
} from "@mui/material";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import ColorModeContext from "../../contexts/ColorModeContext";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { ReactComponent as KitKotLogo } from "../../logo.svg";
import {
  useUserContextState,
  useUserContextUpdater,
} from "../../contexts/UserContext";
import { MenuOptions, State } from "../../types/types.interface";
import LoginModalContent from "../login/LoginModalContent";

export default function Navbar() {
  const user = useUserContextState();
  const setUser = useUserContextUpdater();
  const theme = useTheme();
  const [settings, setSettings] = useState([] as MenuOptions[]);
  const [open, setOpen] = useState(false);
  const colorMode = React.useContext(ColorModeContext);

  useEffect(() => {
    const logout = () => {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      setUser(null);
    };

    if (user) {
      setSettings([
        { key: "Profile", icon: PermIdentityIcon, to: "/profile" },
        { key: "Settings", icon: SettingsIcon, to: "/settings" },
        {
          key: "Dark mode",
          icon: colorMode.colorMode === "dark" ? DarkModeIcon : LightModeIcon,
          content: (
            <Switch
              checked={colorMode.colorMode === "dark"}
              onClick={colorMode.toggleColorMode}
            />
          ),
          keep: true,
        },
        { key: "", content: <Divider />, disabled: true },
        { key: "Logout", icon: LogoutIcon, onClick: logout },
      ]);
    } else {
      setSettings([
        {
          key: "Dark mode",
          icon: colorMode.colorMode === "dark" ? DarkModeIcon : LightModeIcon,
          content: (
            <Switch
              checked={colorMode.colorMode === "dark"}
              onClick={colorMode.toggleColorMode}
            />
          ),
          keep: true,
        },
      ]);
    }
  }, [user, setUser, colorMode]);

  return (
    <AppBar
      color="default"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, width: "100%" }}
      position="fixed"
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
        <Box display={{ xxs: "none", sm: "flex" }}>
          <SearchBar />
        </Box>
        <Box>
          {user ? (
            <UserElements state={{ state: open, setState: setOpen }} />
          ) : (
            <AnonElements state={{ state: open, setState: setOpen }} />
          )}
        </Box>
      </Toolbar>
      <DropDownMenu
        settings={settings}
        state={{ state: open, setState: setOpen }}
      />
    </AppBar>
  );
}

const DropDownMenu = ({
  settings,
  state,
}: {
  settings: MenuOptions[];
  state: State<boolean>;
}) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    state.setState(false);
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
      open={state.state}
      onClose={handleCloseUserMenu}
    >
      {settings.map((setting) => (
        <MenuItem
          disabled={setting.disabled}
          key={setting.key}
          onClick={
            setting.keep
              ? undefined
              : () => {
                  handleCloseUserMenu();
                  if (setting.onClick) setting.onClick();
                }
          }
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

const UserElements = ({ state }: { state: State<boolean> }) => {
  const user = useUserContextState();

  useEffect(() => {
    console.log("asd");
  }, []);

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

    if (tempUser.displayName === undefined) return "";

    const name = tempUser.displayName;
    const nameSplit = name.split(" ");
    if (nameSplit.length > 1) {
      const initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
      return initials.toUpperCase();
    } else {
      return "A";
    }
  };

  return (
    <Box id="user-elements" sx={{ flexGrow: 0, flexWrap: "nowrap" }}>
      <Tooltip title="Settings">
        <IconButton sx={{ p: 0 }} onClick={() => state.setState(true)}>
          <Avatar src={user && user.photoURL ? user.photoURL : undefined}>
            {getDisplayNameInitials()}
          </Avatar>
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const AnonElements = ({ state }: { state: State<boolean> }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "5px" }}>
      <Box display={{ xxs: "none", xs: "flex" }}>
        <Button
          onClick={() => setModalOpen(true)}
          color="neutral"
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{ whiteSpace: "nowrap" }}
        >
          Upload
        </Button>
      </Box>
      <Box display={{ xxs: "none", xs: "flex" }}>
        <Button
          onClick={() => setModalOpen(true)}
          color="secondary"
          variant="contained"
          sx={{ whiteSpace: "nowrap" }}
        >
          Log in
        </Button>
      </Box>
      <Tooltip title="Settings">
        <IconButton sx={{ p: 0 }} onClick={() => state.setState(true)}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <LoginModalContent onClose={() => setModalOpen(false)} />
      </Modal>
    </Box>
  );
};
