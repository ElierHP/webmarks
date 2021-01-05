import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { ContentData, ContentMethods } from "../context/ContentDataProvider";

function FolderContent({ title, clickHandler, id }) {
  const [dispatch] = useContext(ContentMethods);
  return (
    <>
      <Grid
        item
        container
        justify="space-between"
        alignItems="center"
        style={{ cursor: "pointer" }}
      >
        <Grid item>
          <Grid container alignItems="center" onClick={clickHandler}>
            <FolderIcon fontSize="large" style={{ marginRight: "0.5rem" }} />
            <Typography variant="h6">{title}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => dispatch({ type: "delete", id: id })}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}

export default FolderContent;
