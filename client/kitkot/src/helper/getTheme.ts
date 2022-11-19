import { createTheme, PaletteMode } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
    modal?: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
    modal?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxs: true;
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
      modal: {
        main: mode === "light" ? "#fff" : "#232323",
      },
    },
    typography: {
      fontFamily:
        "Segoe UI, Frutiger, Dejavu Sans, Helvetica Neue, Arial, sans-serif",
    },
    breakpoints: {
      values: {
        xxs: 0,
        xs: 460,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });
};

export default getTheme;
