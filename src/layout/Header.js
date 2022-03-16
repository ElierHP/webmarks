import React, { useContext } from "react";
import { AppData, AppState } from "../context/AppDataProvider";
import { User } from "../context/UserProvider";
import UserIcon from "../components/UserIcon";
import SortIcon from "../components/SortIcon";
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

function Header() {
  const [data] = useContext(AppData);
  const [appState, setAppState, directory, setDirectory] = useContext(AppState);
  const [isLoggedIn] = useContext(User);

  //Logo click sends user to home page
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
            <MuiLink
              component={Link}
              to={isLoggedIn ? "/" : "/login"}
              onClick={logoClickHandler}
              color="common.white"
              underline="none"
              variant="h5"
              sx={{ cursor: "pointer" }}
            >
              WebMarks
            </MuiLink>
            {/* Dark Mode Icon */}
            <Box sx={{ display: "flex" }}>
              <DarkModeSwitch />
              {/* User Icon */}
              <UserIcon />
            </Box>
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
                  // Back Icon
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
                {/* Current directory title */}
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
                {/* Sort Icon : sorts folders/links alphabetically*/}
                {isLoggedIn && <SortIcon />}
                {/* Open New Menu*/}
                {isLoggedIn && <NewMenu />}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </nav>
  );
}

export default Header;
