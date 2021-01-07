import React, { useContext } from "react";
import useContentState from "../hooks/useContentState";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FolderIcon from "@material-ui/icons/Folder";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { ContentMethods } from "../context/ContentDataProvider";
import { makeStyles, createStyles } from "@material-ui/core/styles";

function FolderContent({ title, clickHandler, id, url }) {
  //Styles
  const classes = useStyles();
  const [dispatch] = useContext(ContentMethods);
  const [
    isEditing,
    setIsEditing,
    handleChange,
    handleSubmit,
    handleCheckIcon,
  ] = useContentState({ title, id, url });

  return (
    <>
      <Grid item container alignItems="center" className={classes.root}>
        <Grid
          item
          onClick={() => !isEditing && clickHandler()}
          className={classes.folderContainer}
        >
          <Grid container alignItems="center">
            <FolderIcon
              fontSize="large"
              style={{ marginRight: "0.5rem", color: "#FFA724" }}
            />
            {!isEditing ? (
              <Typography variant="h6" style={{ userSelect: "none" }}>
                {title}
              </Typography>
            ) : (
              <form onSubmit={handleSubmit}>
                <TextField
                  id="folder-title-input"
                  label="Folder Title"
                  defaultValue={title}
                  onChange={handleChange}
                  autoFocus
                />
              </form>
            )}
          </Grid>
        </Grid>
        <Grid item>
          {!isEditing ? (
            <>
              <IconButton
                className={classes.iconButton}
                onClick={() => setIsEditing(true)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                className={classes.iconButton}
                onClick={() => dispatch({ type: "delete", id: id })}
              >
                <DeleteIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                className={classes.iconButton}
                onClick={handleCheckIcon}
              >
                <DoneIcon color="secondary" />
              </IconButton>
              <IconButton
                className={classes.iconButton}
                onClick={() => setIsEditing(false)}
              >
                <CloseIcon color="error" />
              </IconButton>
            </>
          )}
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
    folderContainer: {
      flexGrow: 1,
    },
    iconButton: {
      [theme.breakpoints.down("xs")]: {
        padding: "0",
      },
    },
  })
);

export default FolderContent;
