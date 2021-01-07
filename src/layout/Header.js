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
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  ContentData,
  ContentMethods,
  HeaderContext,
} from "../context/ContentDataProvider";
import NewItemMenu from "../components/NewItemMenu";

function Header() {
  const classes = useStyles();
  const [data, appState] = useContext(ContentData);
  const [, setAppState] = useContext(ContentMethods);
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
      <AppBar position="static" className={classes.appBar} elevation={0}>
        <Container>
          <ToolBar className={classes.toolBar}>
            <Typography
              variant="h5"
              className={classes.logo}
              onClick={logoClickHandler}
            >
              WebMarks
            </Typography>
            <div>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => console.log(appState)}
              >
                <PersonIcon fontSize="large" />
              </IconButton>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <SettingsIcon fontSize="large" />
              </IconButton>
            </div>
          </ToolBar>
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
              <NewItemMenu />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </nav>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      padding: "0.5rem 0 0.5rem 0",
    },
    toolBar: {
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("xs")]: {
        padding: "0 0.5rem 0 0.5rem",
      },
    },
    logo: {
      cursor: "pointer",
    },
    gridContainer: {
      padding: "0.25rem 2rem 0.25rem 2rem",
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
  })
);

export default Header;
