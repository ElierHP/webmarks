import React, { useContext } from "react";
import { User } from "../context/UserProvider";
import { userLogin } from "../utils/api/user";
import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";

function TestUser() {
  //User Context
  const [, setIsLoggedIn, , setUser, , setIsLoading, , setIsError] =
    useContext(User);

  //Login as Test User
  const onSubmit = async ({
    username = "TestUser",
    password = "testuser1234",
  }) => {
    setIsLoading(true);
    setIsError(false);
    //Logs in the user
    await userLogin(
      username,
      password,
      setUser,
      setIsLoggedIn,
      setIsError,
      setIsLoading
    );
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
