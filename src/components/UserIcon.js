import React, { useContext } from "react";
import { User } from "../context/UserProvider";
import { IconButton, Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { userLogout } from "../utils/api/user";
import { Navigate } from "react-router-dom";

export default function UserIcon() {
  //User Context
  const [isLoggedIn, setIsLoggedIn] = useContext(User);

  //Submit
  const logout = async () => {
    try {
      userLogout(setIsLoggedIn);
    } catch (error) {
      return <Navigate to="/404" />;
    }
  };
  return (
    <Box>
      <Grid container alignItems="center">
        {isLoggedIn ? (
          // User Icon
          <Link to="/">
            <IconButton onClick={logout} sx={{ color: "common.white" }}>
              <LogoutIcon fontSize="large" />
            </IconButton>
          </Link>
        ) : (
          // Logout Icon
          <Link to="/login">
            <IconButton sx={{ color: "common.white" }}>
              <AccountCircleIcon fontSize="large" />
            </IconButton>
          </Link>
        )}
      </Grid>
    </Box>
  );
}
