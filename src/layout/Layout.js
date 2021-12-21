import React from "react";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <Paper>
      <Header />
      {children}
      <Footer />
    </Paper>
  );
}

export default Layout;
