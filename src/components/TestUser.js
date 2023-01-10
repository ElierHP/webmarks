import React, { useContext } from "react";
import { User } from "../context/UserProvider";
import { userLogin } from "../utils/api/user";
import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";

function TestUser() {
  //User Context
  const user = useContext(User);

  //Login as Test User
  const onSubmit = async ({
    username = "TestUser",
    password = "testuser1234",
  }) => {
    user.setIsLoading(true);
    user.setIsError(false);
    //Logs in the user
    await userLogin(username, password, user);
  };
  return (
    <MuiLink
      component={Link}
      to="/"
      color="primary.light"
      underline="none"
      sx={{ textDecoration: "none", marginTop: "-1rem" }}
      onClick={onSubmit}
    >
      Login as Test User
    </MuiLink>
  );
}

export default TestUser;
