import React from "react";
import Container from "@material-ui/core/Container";
import Appbar from "@material-ui/core/Appbar";
import Typography from "@material-ui/core/Typography";

function Footer() {
  const style = {
    position: "absolute",
    width: "100%",
    bottom: 0,
  };
  return (
    <footer style={style}>
      <Appbar position="static" style={{ padding: "0.25rem" }} elevation={0}>
        <Container>
          <Typography align="center">Copyright @2020</Typography>
        </Container>
      </Appbar>
    </footer>
  );
}

export default Footer;
