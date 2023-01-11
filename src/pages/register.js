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
import { registerUser } from "../utils/api/user";
import TestUser from "../components/TestUser";
import Spinner from "../assets/spinner/Spinner";

function Register() {
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
    user.setIsLoading(true);
    user.setIsError(false);
    //Register new user
    await registerUser(username, password, user);
    user.setIsLoading(false);
  };

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
        <form id="register" onSubmit={handleSubmit(onSubmit)}>
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
              Register
            </Typography>

            {/* Register Error */}
            {user.isError && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginBottom: "-1rem" }}
              >
                Username already exists.
              </Typography>
            )}
            {/* Username */}
            {!errors.username ? (
              <TextField
                id="username"
                label="username"
                variant="outlined"
                color="primary"
                {...register("username")}
              />
            ) : (
              // Username Error
              <TextField
                id="username-error"
                label="username"
                error
                helperText={errors.username.message}
                {...register("username")}
              />
            )}

            {/* Password */}
            {!errors.password ? (
              <TextField
                label="password"
                variant="outlined"
                color="primary"
                {...register("password")}
              />
            ) : (
              // Password Error
              <TextField
                id="password-error"
                label="password"
                error
                helperText={errors.password.message}
                {...register("password")}
              />
            )}

            {/* Confirm Password */}
            {!errors.confirmPassword ? (
              <TextField
                label="confirm password"
                variant="outlined"
                color="primary"
                {...register("confirmPassword")}
              />
            ) : (
              // Confirm Password Error
              <TextField
                id="confirmPassword-error"
                label="confirm password"
                error
                helperText={errors.confirmPassword.message}
                {...register("confirmPassword")}
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

            {/* Login Link */}
            <Box sx={{ display: "flex", gridGap: "3rem" }}>
              <MuiLink
                component={Link}
                to="/login"
                color="primary.light"
                underline="none"
                sx={{ textDecoration: "none", marginTop: "-1rem" }}
                onClick={() => user.setIsError(false)}
              >
                Login
              </MuiLink>
              <TestUser />
            </Box>
          </FormControl>
        </form>
      )}
    </Container>
  );
}

export default Register;
