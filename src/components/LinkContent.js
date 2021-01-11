import React, { useContext } from "react";
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
import { DarkModeContext } from "../context/DarkModeProvider";
import palette from "../css/palette";

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
          backgroundColor: isDarkMode
            ? palette.colors.primary
            : palette.colors.hover,
        },
      },
      urlContainer: {
        overflow: "hidden",
      },
      linksText: {
        marginLeft: "1rem",
        [theme.breakpoints.down("xs")]: {},
      },
      links: {
        textDecoration: "none",
        color: isDarkMode
          ? palette.darkThemeColors.links
          : palette.colors.links,
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
        color: palette.colors.success,
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
                {`${title} : `}
              </Typography>
            ) : (
              <form onSubmit={handleSubmit}>
                <TextField
                  id="link-title-input"
                  label="Link Title"
                  className={classes.titleInput}
                  defaultValue={title}
                  onChange={handleChange}
                  color={isDarkMode ? "secondary" : "primary"}
                  autoFocus
                />
              </form>
            )}
          </Grid>
          <Grid item className={classes.urlContainer}>
            {!isEditing ? (
              <Typography variant="body2" className={classes.linksText}>
                <a className={classes.links} href={url}>
                  {url}
                </a>
              </Typography>
            ) : (
              <form onSubmit={handleSubmit}>
                <TextField
                  className={classes.urlInput}
                  id="link-url-input"
                  label="URL"
                  defaultValue={urlValue}
                  onChange={handleUrlChange}
                  color={isDarkMode ? "secondary" : "primary"}
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
