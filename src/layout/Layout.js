import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CssBaseline from "@mui/material/CssBaseline";
import Theme from "./Theme";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";

function Layout({ children }) {
  return (
    <Theme>
      <CssBaseline>
        <Box sx={{ backgroundColor: "secondary.main" }}>
          <Header />
          <Container
            sx={{
              minHeight: {
                xs: `calc(100vh - 156.7812px)`,
                sm: `calc(100vh - 165px)`,
              },
              padding: {
                xs: "0",
                sm: "0 1.5rem 1rem 1.5rem",
              },
              paddingBottom: "1rem",
            }}
          >
            {children}
          </Container>
          <Footer />
        </Box>
      </CssBaseline>
    </Theme>
  );
}

export default Layout;
