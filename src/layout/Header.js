import React, { useContext } from "react";
import { AppData, AppState } from "../context/AppDataProvider";
import NewMenu from "../components/NewMenu";
import DarkModeSwitch from "../components/DarkModeSwitch";
import { Link } from "react-router-dom";
import {
  Container,
  AppBar,
  Toolbar,
  Box,
  Grid,
  IconButton,
  Typography,
  Link as MuiLink,
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
          backgroundColor: "primary.main",
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
            {/* Logo */}
            <Link
              to="/"
              onClick={logoClickHandler}
              style={{ textDecoration: "none" }}
            >
              <MuiLink color="common.white" underline="none" variant="h5">
                WebMarks
              </MuiLink>
            </Link>
            <DarkModeSwitch />
          </Toolbar>
        </Container>
      </AppBar>

      {/* Sub-Navigation */}
      <Box
        boxShadow={3}
        sx={{ backgroundColor: "secondary.main", marginBottom: "0.5rem" }}
      >
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
                    aria-label="arrow"
                    sx={{
                      padding: "3px",
                      "&:hover": {
                        backgroundColor: "secondary.light",
                      },
                    }}
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
                  sx={{
                    padding: "0.2rem",
                    marginRight: "0.5rem",
                    "&:hover": {
                      backgroundColor: "secondary.light",
                    },
                  }}
                  onClick={() => dispatch({ type: "sort" })}
                >
                  <SortByAlphaIcon />
                </IconButton>
                <NewMenu />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </nav>
  );
}

export default Header;
