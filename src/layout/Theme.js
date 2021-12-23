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
  },
  darkThemeColors: {
    primary: "#0E1B26",
    primaryLight: "#95CBFB",
    secondary: "#51606E",
    secondaryLight: "#707F8D",
    secondaryDark: "#455463",
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
