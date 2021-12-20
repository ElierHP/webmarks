import React from "react";
import { Container, AppBar, Typography } from "@mui/material";

function Footer() {
  return (
    <footer>
      <AppBar position="static" style={{ padding: "0.4rem" }} elevation={0}>
        <Container>
          <Typography align="center">Copyright @2020</Typography>
        </Container>
      </AppBar>
    </footer>
  );
}

export default Footer;
