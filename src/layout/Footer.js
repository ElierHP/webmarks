import React from "react";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

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
