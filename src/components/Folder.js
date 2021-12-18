import React, { useContext } from "react";
import useEdit from "../hooks/useEdit";
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
import { DarkModeContext } from "../context/DarkModeProvider";
import palette from "../css/palette";

function FolderContent({ title, clickHandler, _id, url }) {
  //Styles
  const [isDarkMode] = useContext(DarkModeContext);
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        cursor: "pointer",
        "&:hover": {
          backgroundColor: isDarkMode
            ? palette.colors.primary
            : palette.colors.hover,
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
      folderIcon: {
        marginRight: "0.5rem",
        marginLeft: "1rem",
        color: palette.colors.folderIcon,
        [theme.breakpoints.down("xs")]: {
          marginLeft: "0",
        },
      },
      successIcon: {
        color: palette.colors.success,
      },
      title: {
        userSelect: "none",
      },
    })
  );
  const classes = useStyles();
  //Style End

  const params = "folders";
  const [isEditing, setIsEditing, handleChange, handleDelete, handleEdit] =
    useEdit({ title, _id, params });

  return (
    <>
      <Grid item container alignItems="center" className={classes.root}>
        <Grid
          item
          onClick={() => !isEditing && clickHandler()}
          className={classes.folderContainer}
        >
          <Grid container alignItems="center">
            <FolderIcon fontSize="large" className={classes.folderIcon} />
            {!isEditing ? (
              <Typography variant="h6" className={classes.title}>
                {title}
              </Typography>
            ) : (
              <form onSubmit={handleEdit}>
                <TextField
                  id="folder-title-input"
                  label="Folder Title"
                  defaultValue={title}
                  onChange={handleChange}
                  color={isDarkMode ? "secondary" : "primary"}
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
              <IconButton className={classes.iconButton} onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton className={classes.iconButton} onClick={handleEdit}>
                <DoneIcon className={classes.successIcon} />
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

export default FolderContent;
