import React, { useContext } from "react";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  ContentData,
  ContentMethods,
  HeaderContext,
} from "../context/ContentDataProvider";
import NewItemMenu from "../components/NewItemMenu";
import DarkModeSwitch from "../components/DarkModeSwitch";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";

function Header() {
  //Styles
  const useStyles = makeStyles((theme) =>
    createStyles({
      appBar: {
        padding: "0.5rem 0 0.5rem 0",
      },
      toolBar: {
        display: "flex",
        padding: "0",
        justifyContent: "space-between",
        [theme.breakpoints.down("xs")]: {
          padding: "0 0.5rem 0 0.5rem",
        },
      },
      logo: {
        cursor: "pointer",
      },
      gridContainer: {
        padding: "0.25rem 0.5rem 0.25rem 1rem",
        [theme.breakpoints.down("xs")]: {
          padding: "0.25rem 0.8rem 0.25rem 0.8rem",
        },
      },
      arrowButton: {
        padding: "3px",
      },
      directoryText: {
        marginLeft: "1rem",
        userSelect: "none",
      },
      alphabetIcon: {
        padding: "0.2rem",
        marginRight: "0.5rem",
      },
    })
  );
  const classes = useStyles();
  //Styles

  const [data, appState] = useContext(ContentData);
  const [dispatch, setAppState] = useContext(ContentMethods);
  const [directory, setDirectory] = useContext(HeaderContext);

  const logoClickHandler = () => {
    setAppState(0);
    setDirectory("Main");
  };

  //Go Back Button
  const prevClickHandler = () => {
    //Find parent folder & setAppState to it's parents ID
    const parentFolder = data.find((folder) => folder.id === appState);
    parentFolder ? setAppState(parentFolder.parentId) : setAppState(0);

    //Find the new directory title based on parentFolder
    const newDirectory = data.find(
      (folder) => parentFolder.parentId === folder.id
    );
    newDirectory ? setDirectory(newDirectory.title) : setDirectory("Main");
  };

  return (
    <nav>
      <AppBar
        position="static"
        className={classes.appBar}
        elevation={0}
        color="primary"
      >
        <Container>
          <Toolbar className={classes.toolBar}>
            <Typography
              variant="h5"
              className={classes.logo}
              onClick={logoClickHandler}
            >
              WebMarks
            </Typography>
            <DarkModeSwitch />
          </Toolbar>
        </Container>
      </AppBar>
      <Box boxShadow={3}>
        <Container>
          <Grid
            container
            className={classes.gridContainer}
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Grid container alignItems="center">
                {directory !== "Main" && (
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="arrow"
                    className={classes.arrowButton}
                    onClick={prevClickHandler}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                )}
                <Typography variant="h6" className={classes.directoryText}>
                  {directory}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <IconButton
                  aria-label="a-z-sort-icon"
                  className={classes.alphabetIcon}
                  onClick={() => dispatch({ type: "sort" })}
                >
                  <SortByAlphaIcon />
                </IconButton>
                <NewItemMenu />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </nav>
  );
}

export default Header;
