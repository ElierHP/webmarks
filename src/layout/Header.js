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
import useAppState from "../hooks/useAppState";

function Header() {
  const app = useContext(AppData);
  const { user } = useContext(User);
  const findAppState = useAppState();

  //Logo click sends user to home page
  const logoClickHandler = () => {
    app.setAppState({ title: "Main", id: "0", parentId: null });
  };

  //Go Back Button
  const prevClickHandler = () => {
    // Finds the correct folder and sets the appState to that folder.
    findAppState();
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
                {app.appState.title !== "Main" && (
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

                {/* Current app state title */}
                <Typography
                  variant="h6"
                  sx={{ marginLeft: "1rem", userSelect: "none" }}
                >
                  {app.appState.title}
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
