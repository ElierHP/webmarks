import React, { useContext } from "react";
import { ContentMethods } from "../context/ContentDataProvider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function LinkContent({ title, url, clickHandler, id }) {
  //Styles
  const classes = useStyles();
  const [dispatch] = useContext(ContentMethods);
  return (
    <Grid
      item
      container
      alignItems="center"
      justify="space-between"
      className={classes.root}
    >
      <Grid item xs={9} onClick={clickHandler}>
        <Grid container alignItems="center">
          <Grid>
            <img
              src={`https://www.google.com/s2/favicons?domain_url=${url}`}
              className={classes.favicon}
              alt="external site's favicon"
            />
          </Grid>
          <Grid>
            <Typography variant="body1" className={classes.title}>
              {title}
              <span className={classes.titleSpan}>:</span>
            </Typography>
          </Grid>
          <Grid>
            <Typography variant="body2" className={classes.bodyText}>
              {url}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <IconButton className={classes.iconButton}>
          <EditIcon />
        </IconButton>
        <IconButton
          className={classes.iconButton}
          onClick={() => dispatch({ type: "delete", id: id })}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

//CSS
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: "0.4rem 1rem 0.4rem 1rem",
      cursor: "pointer",
      borderRadius: "0.2rem",
      "&:hover": {
        backgroundColor: "#EEEFF1",
      },
    },
    bodyText: {
      marginLeft: "1rem",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    titleSpan: {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    favicon: {
      marginRight: "0.5rem",
    },
    iconButton: {
      [theme.breakpoints.down("xs")]: {
        padding: "0",
      },
    },
  })
);

export default LinkContent;
