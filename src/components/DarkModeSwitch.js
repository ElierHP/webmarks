import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { DarkModeContext } from "../context/DarkModeProvider";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";

export default function SwitchLabels() {
  const [isDarkMode, setIsDarkMode] = useContext(DarkModeContext);
  const handleClick = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div>
      <Grid container alignItems="center">
        <Box display={{ xs: "none", sm: "block" }}>
          <Typography color="secondary" variant="body2">
            Dark Mode
          </Typography>
        </Box>
        <IconButton onClick={handleClick} style={{ padding: "0.5rem" }}>
          {isDarkMode ? (
            <Brightness7Icon color="secondary" fontSize="large" />
          ) : (
            <Brightness4Icon color="secondary" fontSize="large" />
          )}
        </IconButton>
      </Grid>
    </div>
  );
}
