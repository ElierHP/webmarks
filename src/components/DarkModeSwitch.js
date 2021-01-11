import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { DarkModeContext } from "../context/DarkModeProvider";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { makeStyles, createStyles } from "@material-ui/core/styles";

export default function SwitchLabels() {
  //Styles
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        [theme.breakpoints.down("xs")]: {
          display: "none",
        },
      },
      iconButton: {
        padding: "0.5rem",
      },
    })
  );
  const classes = useStyles();
  //Style End

  const [isDarkMode, setIsDarkMode] = useContext(DarkModeContext);
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
