import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CssBaseline from "@mui/material/CssBaseline";
import Theme from "./Theme";

function Layout({ children }) {
  return (
    <Theme>
      <CssBaseline>
        <Header />
        {children}
        <Footer />
      </CssBaseline>
    </Theme>
  );
}

export default Layout;
