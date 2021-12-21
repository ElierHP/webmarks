import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import Footer from "./Footer";
import { DarkModeContext } from "../context/DarkModeProvider";
import palette from "../css/palette";

function Layout({ children }) {
  const [isDarkMode] = useContext(DarkModeContext);
  return (
    <Paper
      style={{
        backgroundColor: isDarkMode
          ? palette.colors.primary
          : palette.colors.secondary,
      }}
    >
      <Header />
      {children}
      <Footer />
    </Paper>
  );
}

export default Layout;
