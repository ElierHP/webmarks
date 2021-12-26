import React from "react";
import {
  Container,
  FormControl,
  TextField,
  Typography,
  Button,
} from "@mui/material";

function Register() {
  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <FormControl sx={{ padding: "5rem", gap: "2rem", width: "600px" }}>
        <Typography variant="h5" align="center">
          Register
        </Typography>
        <TextField label="username" variant="outlined" color="primary" />
        <TextField label="password" variant="outlined" color="primary" />
        <TextField
          label="confirm password"
          variant="outlined"
          color="primary"
        />
        <Button variant="contained" color="primary" sx={{ padding: ".8rem" }}>
          Submit
        </Button>
      </FormControl>
    </Container>
  );
}

export default Register;
