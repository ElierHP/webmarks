import React, { useContext } from "react";
import PersonIcon from "@material-ui/icons/Person";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { ContentData, ContentMethods } from "../context/ContentDataProvider";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      padding: "0.5rem 0 0.5rem 0",
    },
    logo: {
      flexGrow: 1,
    },
    gridContainer: {
      padding: "0.25rem 2rem 0.25rem 2rem",
    },
  })
);

function Header() {
  const classes = useStyles();
  const [appState, initialData] = useContext(ContentData);
  const dispatch = useContext(ContentMethods);
  return (
    <nav className={classes.root}>
      <AppBar position="static" className={classes.appBar} elevation={0}>
        <Container>
          <ToolBar>
            <Typography
              variant="h5"
              className={classes.logo}
              onClick={() => dispatch({ type: "home", appState: initialData })}
            >
              WebMarks
            </Typography>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <PersonIcon fontSize="large" />
            </IconButton>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <SettingsIcon fontSize="large" />
            </IconButton>
          </ToolBar>
        </Container>
      </AppBar>
      <Box boxShadow={3} className={classes.secondNav}>
        <Container>
          <Grid
            container
            className={classes.gridContainer}
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Grid container alignItems="center">
                <ArrowBackIcon onClick={() => console.log("clicked")} />
                <Typography variant="h6" style={{ marginLeft: "1rem" }}>
                  Main
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton size="small">
                <AddCircleOutlineIcon className={classes.icon} />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </nav>
  );
}

export default Header;
