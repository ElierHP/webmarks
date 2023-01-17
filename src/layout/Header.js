import React, { useContext } from "react";
import { AppData } from "../context/AppDataProvider";
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
import useDirectory from "../hooks/useDirectory";

function Header() {
  const app = useContext(AppData);
  const { user } = useContext(User);
  const findDirectory = useDirectory();

  //Logo click sends user to home page
  const logoClickHandler = () => {
    app.setAppState("0");
    app.setDirectory("Main");
  };

  //Go Back Button
  const prevClickHandler = () => {
    const appView =
      app.directory !== "Note" &&
      app.directory !== "New Note" &&
      app.directory !== "Edit Note";

    if (appView) {
      findDirectory();
    } else {
      // Set directory to Main
      app.setDirectory("Main");
      app.setAppState("0");
      // If note is editing, reset it back to false.
      if (app.note.isEditing) {
        app.note.isEditing = false;
      }
    }
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
              to={user ? "/" : "/login"}
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
                {app.directory !== "Main" && (
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
                  {app.directory}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                {/* Sort Icon : sorts folders/links alphabetically*/}
                {user && <SortIcon />}
                {/* Open New Menu*/}
                {user && <NewMenu />}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </nav>
  );
}

export default Header;
