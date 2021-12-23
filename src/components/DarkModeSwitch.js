import React, { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeProvider";
import { IconButton, Typography, Box, Grid } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function SwitchLabels() {
  const [isDarkMode, setIsDarkMode] = useContext(DarkModeContext);

  const handleClick = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Box>
      <Grid container alignItems="center">
        <Typography
          color="secondary"
          variant="body2"
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          Dark Mode
        </Typography>
        <IconButton onClick={handleClick}>
          {isDarkMode ? (
            <Brightness7Icon color="secondary" fontSize="large" />
          ) : (
            <Brightness4Icon color="secondary" fontSize="large" />
          )}
        </IconButton>
      </Grid>
    </Box>
  );
}
