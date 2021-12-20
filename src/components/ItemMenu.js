import React, { useContext, useState } from "react";
import { ContentData, ContentMethods } from "../context/ContentDataProvider";
import useItemMenu from "../hooks/useItemMenu";
import { DarkModeContext } from "../context/DarkModeProvider";
import axios from "axios";
import palette from "../css/palette";
import { TextField, Menu, MenuItem, Button, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { makeStyles, createStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";

export default function ItemMenu() {
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
        "&:hover": {
          backgroundColor: palette.colors.hoverIcon,
        },
      },
    })
  );
  const classes = useStyles();
  //Styles End

  //Context API
  const [, appState] = useContext(ContentData);
  const [dispatch] = useContext(ContentMethods);

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
    setFolderTitle,
  ] = useItemMenu({ setAnchorEl });

  const handleFolderSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/folders/new", {
        title: folderTitle,
        parent_id: appState,
      });
      dispatch({
        type: "newFolder",
        _id: res.data._id,
        dataType: res.data.type,
        title: res.data.title,
        parent_id: res.data.parent_id,
      });
      handleFolderClose();
      setFolderTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  //Link Menu Handlers
  const [
    isNewLink,
    handleLinkClick,
    handleLinkClose,
    handleLinkTitleChange,
    linkTitle,
    setLinkTitle,
    linkUrl,
    handleUrlChange,
  ] = useItemMenu({ setAnchorEl });

  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/links/new", {
        title: linkTitle,
        parent_id: appState,
        url: linkUrl,
      });
      dispatch({
        type: "newLink",
        _id: res.data._id,
        dataType: res.data.type,
        title: res.data.title,
        parent_id: res.data.parent_id,
        url: res.data.url,
      });
      handleLinkClose();
      setLinkTitle("");
    } catch (error) {
      console.log(error);
    }
  };

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
            defaultValue={linkUrl}
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
