import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: "3rem 0 3rem 0",
    },
  })
);

function InitialContent() {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <Typography variant="h6" align="center">
          You have nothing here.
        </Typography>
      </Grid>
      <Grid item container direction="row" alignItems="center" justify="center">
        <Typography variant="body1">Add New</Typography>
        <IconButton aria-label="add-new" onClick={(e) => alert("clicked")}>
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default InitialContent;
