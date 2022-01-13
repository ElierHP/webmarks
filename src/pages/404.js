import React from "react";
import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import { Container, Grid, Typography, Button } from "@mui/material";

function ErrorPage() {
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
      <Grid>
        <Grid>
          <Typography
            variant="h4"
            sx={{ marginBottom: "2rem", paddingTop: "5rem" }}
          >
            404: Page Not Found
          </Typography>
        </Grid>
        <Grid>
          <MuiLink
            to="/"
            component={Link}
            underline="none"
            sx={{ textDecoration: "none" }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ padding: ".8rem", width: "50%" }}
            >
              Home
            </Button>
          </MuiLink>
          <MuiLink
            to="/login"
            component={Link}
            underline="none"
            sx={{ textDecoration: "none" }}
          >
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ padding: ".8rem", width: "50%" }}
            >
              Login
            </Button>
          </MuiLink>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ErrorPage;
