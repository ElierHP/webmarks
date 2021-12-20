import React, { useContext } from "react";
import { createTheme } from "@mui/material/styles";
import { DarkModeContext } from "../context/DarkModeProvider";
import { ThemeProvider } from "@mui/material/styles";
import palette from "./palette";

function Dashboard({ children }) {
  const [isDarkMode] = useContext(DarkModeContext);
  const theme = createTheme({
    palette: {
      type: isDarkMode ? "dark" : "light",
      primary: {
        main: isDarkMode
          ? palette.colors.primary
          : palette.darkThemeColors.primary,
      },
      secondary: {
        main: palette.colors.secondary,
      },
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Dashboard;
