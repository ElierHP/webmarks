import React, { useContext, useState } from "react";
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
import { SkipPrevious } from "@material-ui/icons";

function Header() {
  const classes = useStyles();
  const [data, appState] = useContext(ContentData);
  const [, setAppState] = useContext(ContentMethods);
  const [directory, setDirectory] = useContext(HeaderContext);

  const logoClickHandler = () => {
    setAppState({ parentId: 0, id: null });
    setDirectory("Main");
  };
  const prevClickHandler = () => {
    const currentDir = data.find(
      (folder) => folder.parentId === appState.parentId
    );
    if (currentDir) {
      setAppState({ parentId: currentDir.prevId, id: currentDir.parentId });
    } else {
      setAppState({ parentId: appState.id, id: appState.parentId });
    }
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
                <ArrowBackIcon onClick={prevClickHandler} />
                <Typography variant="h6" style={{ marginLeft: "1rem" }}>
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
  })
);

export default Header;
