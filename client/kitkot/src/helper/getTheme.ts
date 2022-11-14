import { createTheme, PaletteMode } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

const getTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode,
      neutral: {
        main: mode === "light" ? "#000" : "#fff",
      },
      secondary: {
        main: "#ff3b5c",
      },
    },
    typography: {
      fontFamily:
        "Segoe UI, Frutiger, Dejavu Sans, Helvetica Neue, Arial, sans-serif",
    },
  });
};

export default getTheme;
