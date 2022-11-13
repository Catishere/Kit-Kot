import React from "react";

const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  colorMode: "light",
});

export default ColorModeContext;
