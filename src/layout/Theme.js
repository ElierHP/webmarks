import React, { useContext } from "react";
import { createTheme } from "@mui/material/styles";
import { DarkModeContext } from "../context/DarkModeProvider";
import { ThemeProvider } from "@mui/material/styles";

export const palette = {
  colors: {
    primary: "#1e88e5",
    secondary: "#FFFFFF",
    links: "#2b3034",
    hover: "#EAEAEA",
    hoverIcon: "#C5D2E1",
    folderIcon: "#FFA724",
    success: "#43a047",
  },
  darkThemeColors: {
    primary: "#2b3034",
    secondary: "#FFFFFF",
    links: "#90caf9",
    hover: "#414243",
    hoverIcon: "#416287",
    folderIcon: "#FFA724",
    success: "#43a047",
  },
};

function Theme({ children }) {
  const [isDarkMode] = useContext(DarkModeContext);

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: palette.colors.primary,
      },
      secondary: {
        main: palette.colors.secondary,
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: palette.darkThemeColors.primary,
      },
      secondary: {
        main: palette.colors.secondary,
      },
    },
  });
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
      {children}
    </ThemeProvider>
  );
}

export default Theme;
