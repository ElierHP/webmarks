import React from "react";
import {
  Container,
  FormControl,
  TextField,
  Typography,
  Button,
} from "@mui/material";

function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };
  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <form id="register" onSubmit={handleSubmit}>
        <FormControl sx={{ padding: "5rem", gap: "2rem", width: "600px" }}>
          <Typography variant="h5" align="center">
            Register
          </Typography>
          <TextField
            id="username"
            label="username"
            variant="outlined"
            color="primary"
          />
          <TextField label="password" variant="outlined" color="primary" />
          <TextField
            label="confirm password"
            variant="outlined"
            color="primary"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ padding: ".8rem" }}
          >
            Submit
          </Button>
        </FormControl>
      </form>
    </Container>
  );
}

export default Register;
