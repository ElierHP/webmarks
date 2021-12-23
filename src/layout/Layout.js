import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CssBaseline from "@mui/material/CssBaseline";
import Theme from "./Theme";
import Box from "@mui/material/Box";

function Layout({ children }) {
  return (
    <Theme>
      <CssBaseline>
        <Box sx={{ backgroundColor: "secondary.main" }}>
          <Header />
          {children}
          <Footer />
        </Box>
      </CssBaseline>
    </Theme>
  );
}

export default Layout;
