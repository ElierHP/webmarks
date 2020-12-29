import React from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function FolderContent({ title, clickHandler }) {
  return (
    <>
      <Grid
        item
        container
        justify="space-between"
        alignItems="center"
        style={{ cursor: "pointer" }}
        onClick={clickHandler}
      >
        <Grid item>
          <Grid container alignItems="center">
            <FolderIcon fontSize="large" style={{ marginRight: "0.5rem" }} />
            <Typography variant="h6">{title}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}

export default FolderContent;
