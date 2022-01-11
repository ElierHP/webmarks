import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validations/user";
import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import {
  Container,
  FormControl,
  TextField,
  Typography,
  Button,
} from "@mui/material";

function Login() {
  //React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ username, password }) => {
    console.log(`username: ${username}, password: ${password}`);
  };
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ padding: ".8rem" }}
          >
            Submit
          </Button>

          {/* Register Link */}
          <MuiLink
            component={Link}
            to="/register"
            color="primary.light"
            underline="none"
            sx={{ textDecoration: "none", marginTop: "-1rem" }}
          >
            Register
          </MuiLink>
        </FormControl>
      </form>
    </Container>
  );
}

export default Login;
