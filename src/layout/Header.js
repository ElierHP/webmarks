import React, { useContext } from "react";
import { AppData, AppState } from "../context/AppDataProvider";
import ItemMenu from "../components/ItemMenu";
import DarkModeSwitch from "../components/DarkModeSwitch";
import {
  Container,
  AppBar,
  Toolbar,
  Box,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";

function Header() {
  const [data, dispatch] = useContext(AppData);
  const [appState, setAppState, directory, setDirectory] = useContext(AppState);

  const logoClickHandler = () => {
    setAppState("0");
    setDirectory("Main");
  };

  //Go Back Button
  const prevClickHandler = () => {
    //Find parent folder & setAppState to it's parents ID
    const parentFolder = data.find((folder) => folder._id === appState);
    console.log(parentFolder);
    parentFolder ? setAppState(parentFolder.parent_id) : setAppState(0);

    //Find the new directory title based on parentFolder
    const newDirectory = data.find(
      (folder) => parentFolder.parent_id === folder._id
    );
    newDirectory ? setDirectory(newDirectory.title) : setDirectory("Main");
  };

  return (
    <nav>
      <AppBar
        position="static"
        elevation={0}
        color="primary"
        sx={{
          padding: "0.5rem 0",
        }}
      >
        <Container>
          <Toolbar
            sx={{
              justifyContent: "space-between",
              padding: {
                xs: "0",
              },
            }}
          >
            <Typography
              variant="h5"
              onClick={logoClickHandler}
              sx={{ cursor: "pointer" }}
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
            justifyContent="space-between"
            alignItems="center"
            sx={{
              padding: {
                xs: "0.25rem 0.8rem 0.25rem 0.8rem",
                sm: "0.25rem 0.5rem 0.25rem 1rem",
              },
            }}
          >
            <Grid item>
              <Grid container alignItems="center">
                {directory !== "Main" && (
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="arrow"
                    sx={{ padding: "3px" }}
                    onClick={prevClickHandler}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                )}
                <Typography
                  variant="h6"
                  sx={{ marginLeft: "1rem", userSelect: "none" }}
                >
                  {directory}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <IconButton
                  aria-label="a-z-sort-icon"
                  sx={{ padding: "0.2rem", marginRight: "0.5rem" }}
                  onClick={() => dispatch({ type: "sort" })}
                >
                  <SortByAlphaIcon />
                </IconButton>
                <ItemMenu />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </nav>
  );
}

export default Header;
