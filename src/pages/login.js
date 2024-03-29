import React, { useContext } from "react";
import { User } from "../context/UserProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validations/user";
import { Link, Navigate } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import {
  Container,
  FormControl,
  TextField,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { userLogin } from "../utils/api/user";
import TestUser from "../components/TestUser";
import Spinner from "../assets/spinner/Spinner";

function Login() {
  //User Context
  const user = useContext(User);

  //React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ username, password }) => {
    //Logs in the user
    await userLogin(username, password, user);
  };

  // If a user exists, navigate to home.
  if (user.user) return <Navigate to="/" />;
  return (
    <Container
      sx={{
        display: {
          xs: "block",
          sm: "flex",
        },
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Loading Data */}
      {user.isLoading ? (
        <Spinner />
      ) : (
        // Render Form
        <form id="login" onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            sx={{
              paddingTop: "5rem",
              paddingBottom: "5rem",
              gap: "2rem",
              width: {
                xs: "100%",
                sm: "450px",
              },
            }}
          >
            {/* Title */}
            <Typography variant="h5" align="center">
              Login
            </Typography>

            {/* Login Error */}
            {user.error.status !== 200 && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginBottom: "-1rem" }}
              >
                {user.error.message}
              </Typography>
            )}

            {/* Username */}
            {!errors.username ? (
              <TextField
                id="username"
                label="username"
                variant="outlined"
                color="primary"
                autoComplete="username"
                {...register("username")}
              />
            ) : (
              // Username Error
              <TextField
                id="username-error"
                label="username"
                autoComplete="username"
                error
                helperText={errors.username.message}
                {...register("username")}
              />
            )}

            {/* Password */}
            {!errors.password ? (
              <TextField
                id="password"
                type="password"
                label="password"
                variant="outlined"
                color="primary"
                autoComplete="current-password"
                {...register("password")}
              />
            ) : (
              // Password Error
              <TextField
                id="password-error"
                type="password"
                label="password"
                autoComplete="current-password"
                error
                helperText={errors.password.message}
                {...register("password")}
              />
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ padding: ".8rem" }}
            >
              Submit
            </Button>

            {/* Register Link */}
            <Box sx={{ display: "flex", gridGap: "3rem" }}>
              <MuiLink
                component={Link}
                to="/register"
                color="primary.light"
                underline="none"
                sx={{ textDecoration: "none", marginTop: "-1rem" }}
                onClick={() => user.setError({ status: 200, message: "ok" })}
              >
                Register
              </MuiLink>
              {/* Login as Test User */}
              <TestUser />
            </Box>
          </FormControl>
        </form>
      )}
    </Container>
  );
}

export default Login;
