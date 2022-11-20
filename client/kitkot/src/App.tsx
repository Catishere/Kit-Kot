import { Box, CssBaseline } from "@mui/material";
import { alpha, ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CommentSection from "./components/feed/CommentSection";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/navbar/SideBar";
import ColorModeContext from "./contexts/ColorModeContext";
import { UserContextProvider } from "./contexts/UserContext";
import getTheme from "./helper/getTheme";
import { Following } from "./views/Following";
import { Home } from "./views/Home";
import { Profile } from "./views/Profile";
import { Upload } from "./views/Upload";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        localStorage.setItem("colorMode", mode === "light" ? "dark" : "light");
      },
      colorMode: mode,
    }),
    [mode]
  );

  useEffect(() => {
    const localMode = localStorage.getItem("colorMode") as "light" | "dark";
    setMode(localMode ? localMode : "light");
  }, []);

  const theme = useMemo(() => getTheme(mode), [mode]);

  const mainStyle = {
    flexGrow: 1,
    width: "100%",
    paddingLeft: { xxs: "64px", md: "240px" },
    marginTop: "65px",
    backgroundColor: theme.palette.background.default,
    borderRadius: "10px",
    overflowY: "auto",
    listStyle: "none",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: alpha(theme.palette.text.primary, 0.1),
    },
  };

  const pagesWithSidebar = [
    "",
    "following",
    "upload",
    "@:username",
    "settings",
  ];
  const sidebar = <SideBar />;

  return (
    <div className="App">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <UserContextProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                {pagesWithSidebar.map((page) => (
                  <Route path={page} element={sidebar} />
                ))}
              </Routes>
              <Box component="main" sx={mainStyle}>
                <CssBaseline />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/following" element={<Following />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path={`@:username`} element={<Profile />} />
                </Routes>
              </Box>
              <CommentSection />
            </BrowserRouter>
          </UserContextProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
