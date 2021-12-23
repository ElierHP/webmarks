import React, { useContext } from "react";
import { createTheme } from "@mui/material/styles";
import { DarkModeContext } from "../context/DarkModeProvider";
import { ThemeProvider } from "@mui/material/styles";

export const palette = {
  colors: {
    primary: "#1e88e5",
    secondary: "#FFF",
    folder: "#FFA724",
  },
  darkThemeColors: {
    primary: "#0E1B26",
    secondary: "#353D44",
    folder: "#FFA724",
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
      folder: {
        main: palette.colors.folder,
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
        main: palette.darkThemeColors.secondary,
      },
      folder: {
        main: palette.darkThemeColors.folder,
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
