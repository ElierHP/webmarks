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
} from "@mui/material";
import { registerUser } from "../utils/api/user";

function Register() {
  //User Context
  const [
    isLoggedIn,
    setIsLoggedIn,
    ,
    setUser,
    isLoading,
    setIsLoading,
    isError,
    setIsError,
  ] = useContext(User);

  //React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ username, password }) => {
    try {
      setIsLoading(true);
      setIsError(false);
      //Register new user
      registerUser(username, password, setUser, setIsLoggedIn);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  if (isLoggedIn) return <Navigate to="/" />;
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
          {isError && (
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
            {isLoading ? " Loading..." : "Submit"}
          </Button>

          {/* Login Link */}
          <MuiLink
            component={Link}
            to="/login"
            color="primary.light"
            underline="none"
            sx={{ textDecoration: "none", marginTop: "-1rem" }}
            onClick={() => setIsError(false)}
          >
            Login
          </MuiLink>
        </FormControl>
      </form>
    </Container>
  );
}

export default Register;
