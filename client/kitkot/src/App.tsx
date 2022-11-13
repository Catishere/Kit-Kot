import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/navbar/SideBar";
import ColorModeContext from "./contexts/ColorModeContext";
import { UserContextProvider } from "./contexts/UserContext";
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

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <div className="App">
      <header className="App-header">
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <UserContextProvider>
              <BrowserRouter>
                <Navbar />
                <SideBar>
                  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/following" element={<Following />} />
                    </Routes>
                  </Box>
                </SideBar>
              </BrowserRouter>
            </UserContextProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </header>
    </div>
  );
}

export default App;
