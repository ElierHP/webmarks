import React, { useContext } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { DarkModeContext } from "../context/DarkModeProvider";
import { ThemeProvider } from "@material-ui/core/styles";

function Dashboard({ children }) {
  const [isDarkMode] = useContext(DarkModeContext);
  const theme = createMuiTheme({
    palette: {
      type: isDarkMode ? "dark" : "light",
      primary: {
        main: isDarkMode ? "#2b3034" : blue[600],
      },
      secondary: {
        main: "#FFFFFF",
      },
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

// const darkTheme = createMuiTheme({
//   palette: {
//     type: "dark",
//     primary: {
//       main: "#2b3034",
//     },
//     secondary: {
//       main: green[600],
//     },
//   },
// });

export default Dashboard;
