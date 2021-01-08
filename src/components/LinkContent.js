import React, { useContext, useState } from "react";
import useContentState from "../hooks/useContentState";
import { ContentMethods } from "../context/ContentDataProvider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { green, blue } from "@material-ui/core/colors";
import { DarkModeContext } from "../context/DarkModeProvider";

function LinkContent({ title, url, clickHandler, id }) {
  //Styles
  const [isDarkMode] = useContext(DarkModeContext);
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        padding: "0.4rem 1rem 0.4rem 1rem",
        cursor: "pointer",
        borderRadius: "0.2rem",
        "&:hover": {
          backgroundColor: isDarkMode ? "#2b3034" : "#EEEFF1",
        },
      },
      bodyText: {
        color: isDarkMode ? blue[200] : blue[600],
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
        marginLeft: "1.4rem",
        marginTop: "0.2rem",
        [theme.breakpoints.down("xs")]: {
          marginLeft: "0.3rem",
        },
      },
      iconButton: {
        [theme.breakpoints.down("xs")]: {
          padding: "0",
        },
      },
      successIcon: {
        color: green[600],
      },
      titleInput: {
        width: "80%",
      },
      urlInput: {
        [theme.breakpoints.up("md")]: {
          width: "400px",
        },
        [theme.breakpoints.up("lg")]: {
          width: "600px",
        },
      },
    })
  );
  const classes = useStyles();
  //Styles End

  const [dispatch] = useContext(ContentMethods);
  const [
    isEditing,
    setIsEditing,
    handleChange,
    handleSubmit,
    handleCheckIcon,
    handleUrlChange,
    urlValue,
    handleCloseIcon,
  ] = useContentState({ title, id, url });
  return (
    <Grid
      item
      container
      alignItems="center"
      justify="space-between"
      className={classes.root}
    >
      <Grid item xs={9} onClick={() => !isEditing && clickHandler()}>
        <Grid container alignItems="center">
          <Grid item>
            <img
              src={`https://www.google.com/s2/favicons?domain_url=${url}`}
              className={classes.favicon}
              alt="external site's favicon"
            />
          </Grid>
          <Grid item>
            {!isEditing ? (
              <Typography variant="body1" className={classes.title}>
                {title}
                <span className={classes.titleSpan}>:</span>
              </Typography>
            ) : (
              <form onSubmit={handleSubmit}>
                <TextField
                  id="link-title-input"
                  label="Link Title"
                  className={classes.titleInput}
                  defaultValue={title}
                  onChange={handleChange}
                  autoFocus
                />
              </form>
            )}
          </Grid>
          <Grid item>
            {!isEditing ? (
              <Typography variant="body2" className={classes.bodyText}>
                {url}
              </Typography>
            ) : (
              <form onSubmit={handleSubmit}>
                <TextField
                  className={classes.urlInput}
                  id="link-url-input"
                  label="URL"
                  defaultValue={urlValue}
                  onChange={handleUrlChange}
                  autoFocus
                />
              </form>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {!isEditing ? (
          <>
            {" "}
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
              <DoneIcon className={classes.successIcon} />
            </IconButton>
            <IconButton
              className={classes.iconButton}
              onClick={handleCloseIcon}
            >
              <CloseIcon color="error" />
            </IconButton>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default LinkContent;
