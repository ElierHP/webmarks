import React, { useContext, useState } from "react";
import { ContentData } from "../context/ContentDataProvider";
import useNewItemState from "../hooks/useNewItemState";
import TextField from "@material-ui/core/TextField";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { DarkModeContext } from "../context/DarkModeProvider";
import palette from "../css/palette";

export default function NewItemMenu() {
  //Styles
  const [isDarkMode] = useContext(DarkModeContext);
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        position: "relative",
        marginRight: "0.5rem",
      },
      inputForm: {
        position: "absolute",
        top: -15,
        right: 0,
        width: "220px",
        backgroundColor: isDarkMode
          ? palette.darkThemeColors.secondary
          : palette.colors.secondary,
        padding: "1.5rem 1rem 1.5rem 1rem",
        zIndex: "10",
        boxShadow: "-3px 3px 15px rgba(0, 0, 0, 0.3)",
        borderRadius: "0.3rem",
        [theme.breakpoints.down("sm")]: {
          right: -15,
        },
      },
      closeIcon: {
        position: "absolute",
        top: 0,
        right: 0,
      },
      menuInput: {
        marginBottom: "1rem",
      },
      menuBtn: {
        marginTop: "1rem",
      },
      addIcon: {
        padding: "0.2rem",
      },
    })
  );
  const classes = useStyles();
  //Styles End

  //Context API
  const [, appState] = useContext(ContentData);

  //Material UI Menu handlers
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Folder Menu Handlers
  const [
    isNewFolder,
    handleFolderClick,
    handleFolderClose,
    handleTitleChange,
    folderTitle,
    handleFolderSubmit,
  ] = useNewItemState({ setAnchorEl, parentId: appState, itemType: "folder" });

  //Link Menu Handlers
  const [
    isNewLink,
    handleLinkClick,
    handleLinkClose,
    handleLinkTitleChange,
    linkTitle,
    handleLinkSubmit,
    itemUrl,
    handleUrlChange,
  ] = useNewItemState({ setAnchorEl, parentId: appState, itemType: "link" });

  return (
    <div className={classes.root}>
      <IconButton
        size="small"
        aria-controls="addnew-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.addIcon}
      >
        <AddCircleOutlineIcon />
      </IconButton>
      <Menu
        id="add-new-simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleFolderClick}>New Folder</MenuItem>
        <MenuItem onClick={handleLinkClick}>New Link</MenuItem>
      </Menu>

      {/* New Folder Menu */}
      {isNewFolder && (
        <form
          className={classes.inputForm}
          id="new-folder-menu"
          open={Boolean(isNewFolder)}
          onSubmit={handleFolderSubmit}
        >
          <TextField
            id="folder-input"
            label="Folder Title"
            defaultValue={folderTitle}
            onChange={handleTitleChange}
            style={{ marginBottom: "1rem" }}
            color={isDarkMode ? "secondary" : "primary"}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleFolderSubmit}
          >
            Submit
          </Button>
          <IconButton className={classes.closeIcon} onClick={handleFolderClose}>
            <CloseIcon />
          </IconButton>
        </form>
      )}

      {/* New Link Menu */}
      {isNewLink && (
        <form
          className={classes.inputForm}
          id="new-link-menu"
          open={Boolean(isNewLink)}
          onSubmit={handleLinkSubmit}
        >
          <TextField
            id="link-input"
            label="Link Title"
            defaultValue={linkTitle}
            onChange={handleLinkTitleChange}
            className={classes.menuInput}
            color={isDarkMode ? "secondary" : "primary"}
          />
          <TextField
            id="link-url-input"
            label="URL"
            defaultValue={itemUrl}
            onChange={handleUrlChange}
            className={classes.menuInput}
            color={isDarkMode ? "secondary" : "primary"}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLinkSubmit}
            className={classes.menuBtn}
          >
            Submit
          </Button>
          <IconButton className={classes.closeIcon} onClick={handleLinkClose}>
            <CloseIcon />
          </IconButton>
        </form>
      )}
    </div>
  );
}
