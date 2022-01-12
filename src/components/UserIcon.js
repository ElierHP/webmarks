import React, { useContext } from "react";
import axios from "axios";
import { User } from "../context/UserProvider";
import { IconButton, Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function SwitchLabels() {
  //User Context
  const [isLoggedIn, setIsLoggedIn] = useContext(User);

  //Submit
  const logout = async () => {
    const res = await axios.post("http://localhost:5000/users/logout");
    setIsLoggedIn(res.data.isLoggedIn);
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
