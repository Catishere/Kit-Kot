import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@mui/material";
import headers from "../../helper/headers";
import { UserInfo } from "../../types/types.interface";

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
  justifyContent: "flex-end",
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

export default function MiniDrawer() {
  const theme = useTheme();
  const [extended, setExtended] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = React.useState("Home");
  const [suggestedUsers, setSuggestedUsers] = React.useState<UserInfo[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setExtended(window.innerWidth > 1000);
    };

    setExtended(window.innerWidth > 1000);

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch("/api/user/suggested", {
      method: "GET",
      headers,
    })
      .then((res) => res.json())
      .then((data) => setSuggestedUsers(data))
      .catch((err) => console.log(err));
  }, []);

  const navigations = [
    { name: "Home", icon: <HomeIcon />, link: "/" },
    { name: "Following", icon: <PeopleOutlineIcon />, link: "/following" },
  ];

  return (
    <Box sx={{ display: "flex", zIndex: 5 }}>
      <CssBaseline />
      <Drawer
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onTouchStart={() => {
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
          }, 2000);
        }}
        variant="permanent"
        open={extended || open}
        sx={{ position: "fixed" }}
      >
        <DrawerHeader />
        <Divider />
        <List>
          {navigations.map((nav, index) => (
            <ListItem key={nav.name} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: extended || open ? "initial" : "center",
                  px: 2.5,
                  color:
                    current === nav.name
                      ? theme.palette.secondary.main
                      : theme.palette.text.primary,
                }}
                component={Link}
                to={nav.link}
                onClick={() => setCurrent(nav.name)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: extended || open ? 3 : "auto",
                    justifyContent: "center",
                    color: "inherit",
                  }}
                >
                  {nav.icon}
                </ListItemIcon>
                <ListItemText
                  primary={nav.name}
                  disableTypography
                  sx={{
                    opacity: extended || open ? 1 : 0,
                    fontWeight: "bold",
                    fontSize: theme.typography.h6.fontSize,
                    fontFamily:
                      "'Gotham','Arial','Helvetica Neue',Helvetica,sans-serif",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography
          sx={{
            marginTop: "10px",
            display: extended || open ? "block" : "none",
          }}
          fontSize={12}
          fontWeight="bold"
          color="text.secondary"
        >
          Suggested accounts
        </Typography>
        <List>
          {suggestedUsers.map((user, index) => (
            <ListItem key={index} disablePadding sx={{ display: "flex" }}>
              <ListItemButton
                sx={{
                  justifyContent: extended || open ? "initial" : "center",
                  px: 2.5,
                  py: 0,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: extended || open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    alt={user?.displayName}
                    src={process.env.PUBLIC_URL + user?.photoURL}
                    sx={{ width: 32, height: 32 }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box display={"flex"} flexDirection="column">
                      <Typography fontWeight="bold" fontSize={15}>
                        {user?.username}
                      </Typography>
                      <Typography fontSize={12}>{user?.displayName}</Typography>
                    </Box>
                  }
                  sx={{ opacity: extended || open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
