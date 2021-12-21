import React, { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeProvider";
import { IconButton, Typography, Box, Grid } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { makeStyles, createStyles } from "@mui/styles";
import palette from "../layout/palette";

export default function SwitchLabels() {
  //Styles
  const [isDarkMode, setIsDarkMode] = useContext(DarkModeContext);
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        [theme.breakpoints.down("xs")]: {
          display: "none",
        },
      },
      iconButton: {
        padding: "0.5rem",
        "&:hover": {
          backgroundColor: isDarkMode && palette.darkThemeColors.hoverIcon,
        },
      },
    })
  );
  const classes = useStyles();
  //Style End

  const handleClick = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div>
      <Grid container alignItems="center">
        <Box className={classes.root}>
          <Typography color="secondary" variant="body2">
            Dark Mode
          </Typography>
        </Box>
        <IconButton onClick={handleClick} className={classes.iconButton}>
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
