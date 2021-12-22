import React, { useContext } from "react";
import useEdit from "../hooks/useEdit";
import { DarkModeContext } from "../context/DarkModeProvider";
import { palette } from "../layout/Theme";
import { Grid, Typography, TextField, IconButton } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

function LinkContent({ title, url, clickHandler, _id }) {
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
            ? palette.darkThemeColors.hover
            : palette.colors.hover,
        },
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
        "&:hover": {
          backgroundColor: isDarkMode
            ? palette.darkThemeColors.hoverIcon
            : palette.colors.hoverIcon,
        },
      },
      successIcon: {
        color: palette.colors.success,
      },
      titleInput: {
        width: "80%",
      },
      urlInput: {
        [theme.breakpoints.up("lg")]: {
          minWidth: "400px",
        },
      },
    })
  );
  const classes = useStyles();
  //Styles End

  const params = "links";
  const [
    isEditing,
    setIsEditing,
    handleChange,
    handleDelete,
    handleEdit,
    handleUrlChange,
    urlValue,
    handleCloseIcon,
  ] = useEdit({ title, _id, url, params });

  return (
    <Grid
      item
      container
      alignItems="center"
      justifyContent="space-between"
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
              <form onSubmit={handleEdit}>
                <TextField
                  id="link-title-input"
                  label="Link Title"
                  variant="standard"
                  className={classes.titleInput}
                  defaultValue={title}
                  onChange={handleChange}
                  color={isDarkMode ? "secondary" : "primary"}
                  autoFocus
                />
              </form>
            )}
          </Grid>
          <Grid item>
            {!isEditing ? (
              <Typography variant="body2" className={classes.linksText}>
                <a className={classes.links} href={url}>
                  {url}
                </a>
              </Typography>
            ) : (
              <form onSubmit={handleEdit}>
                <TextField
                  className={classes.urlInput}
                  id="link-url-input"
                  label="URL"
                  variant="standard"
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
