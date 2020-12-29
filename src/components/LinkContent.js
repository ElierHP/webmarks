import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function LinkContent({ title, url, clickHandler }) {
  return (
    <Grid
      item
      container
      alignItems="center"
      justify="center"
      style={{ padding: "0.4rem 1rem 0.4rem 1rem", cursor: "pointer" }}
      onClick={clickHandler}
    >
      <Typography variant="body1">{title}:</Typography>
      <Typography variant="body2" style={{ marginLeft: "1rem" }}>
        {url}
      </Typography>
    </Grid>
  );
}

export default LinkContent;
