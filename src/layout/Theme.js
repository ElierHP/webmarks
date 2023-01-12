import React, { useContext } from "react";
import { createTheme } from "@mui/material/styles";
import { DarkModeContext } from "../context/DarkModeProvider";
import { ThemeProvider } from "@mui/material/styles";

export const palette = {
  colors: {
    primary: "#1e88e5",
    primaryLight: "#47A3F4",
    secondary: "#FFFFFF",
    secondaryLight: "#E1E5E9",
    secondaryDark: "#C7CDD4",
    folder: "#FFA724",
    error: "#EB2424",
  },
  darkThemeColors: {
    primary: "#0E1B26",
    primaryLight: "#95CBFB",
    secondary: "#586775",
    secondaryLight: "#707F8D",
    secondaryDark: "#455463",
    folder: "#FFA724",
    error: "#FF8A8A",
  },
};

function Theme({ children }) {
  const [isDarkMode] = useContext(DarkModeContext);

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: palette.colors.primary,
        light: palette.colors.primaryLight,
      },
      secondary: {
        main: palette.colors.secondary,
        light: palette.colors.secondaryLight,
        dark: palette.colors.secondaryDark,
      },
      folder: {
        main: palette.colors.folder,
      },
      error: {
        main: palette.colors.error,
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: palette.darkThemeColors.primary,
        light: palette.darkThemeColors.primaryLight,
      },
      secondary: {
        main: palette.darkThemeColors.secondary,
        light: palette.darkThemeColors.secondaryLight,
        dark: palette.darkThemeColors.secondaryDark,
      },
      info: {
        main: palette.darkThemeColors.primaryLight,
      },
      folder: {
        main: palette.darkThemeColors.folder,
      },
      error: {
        main: palette.darkThemeColors.error,
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
