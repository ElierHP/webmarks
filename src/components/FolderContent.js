import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { ContentMethods } from "../context/ContentDataProvider";
import { makeStyles, createStyles } from "@material-ui/core/styles";

function FolderContent({ title, clickHandler, id }) {
  //Styles
  const classes = useStyles();
  const [dispatch] = useContext(ContentMethods);
  return (
    <>
      <Grid
        item
        container
        justify="space-between"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>
          <Grid container alignItems="center" onClick={clickHandler}>
            <FolderIcon
              fontSize="large"
              style={{ marginRight: "0.5rem", color: "#FFA724" }}
            />
            <Typography variant="h6">{title}</Typography>
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
    </>
  );
}

//CSS
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#EEEFF1",
      },
    },
    iconButton: {
      [theme.breakpoints.down("xs")]: {
        padding: "0",
      },
    },
  })
);

export default FolderContent;
