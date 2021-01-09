import React from "react";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

function Footer() {
  return (
    <footer>
      <Appbar position="static" style={{ padding: "0.4rem" }} elevation={0}>
        <Container>
          <Typography align="center">Copyright @2020</Typography>
        </Container>
      </Appbar>
    </footer>
  );
}

export default Footer;
