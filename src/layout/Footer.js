import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <footer>
      <Box sx={{ backgroundColor: "primary.main", padding: "0.4rem" }}>
        <Typography align="center" color="common.white">
          Copyright @2021
        </Typography>
      </Box>
    </footer>
  );
}

export default Footer;
