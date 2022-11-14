import { Box, CssBaseline } from "@mui/material";
import { alpha, ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/navbar/SideBar";
import ColorModeContext from "./contexts/ColorModeContext";
import { UserContextProvider } from "./contexts/UserContext";
import getTheme from "./helper/getTheme";
import { Following } from "./views/Following";
import { Home } from "./views/Home";

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
    paddingLeft: { xs: "64px", sm: "64px", md: "240px" },
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

  return (
    <div className="App">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <UserContextProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<SideBar />} />
                <Route path="/following" element={<SideBar />} />
              </Routes>
              <Box max-width="800px" component="main" sx={mainStyle}>
                <CssBaseline />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/following" element={<Following />} />
                </Routes>
              </Box>
            </BrowserRouter>
          </UserContextProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
