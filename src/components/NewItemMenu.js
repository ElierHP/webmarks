import React, { useContext, useState } from "react";
import { ContentData, ContentMethods } from "../context/ContentDataProvider";
import TextField from "@material-ui/core/TextField";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

export default function NewItemMenu() {
  //Styles
  const classes = useStyles();

  //Context API
  const [dispatch] = useContext(ContentMethods);
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
  const [isNewFolder, setIsNewFolder] = useState(false);
  const [folderTitle, setFolderTitle] = useState("");

  const handleFolderClose = () => {
    setIsNewFolder(null);
  };

  const handleFolderClick = () => {
    setIsNewFolder(!isNewFolder);
    setAnchorEl(null);
  };

  const handleTitleChange = (e) => {
    setFolderTitle(e.target.value);
  };

  const handleFolderSubmit = () => {
    dispatch({
      type: "addFolder",
      title: folderTitle,
      parentId: appState,
    });
    handleFolderClose();
  };

  //Link Handlers

  return (
    <div className={classes.root}>
      <IconButton
        size="small"
        aria-controls="addnew-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AddCircleOutlineIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleFolderClick}>New Folder</MenuItem>
        <MenuItem onClick={handleClose}>New Link</MenuItem>
      </Menu>
      {isNewFolder ? (
        <form
          className={classes.inputForm}
          id="new-folder-menu"
          open={Boolean(isNewFolder)}
          onSubmit={handleFolderSubmit}
        >
          <TextField
            id="standard"
            label="Folder Title"
            defaultValue={folderTitle}
            onChange={handleTitleChange}
            style={{ marginBottom: "1rem" }}
          />
          <div onClick={handleClose}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFolderSubmit}
            >
              Submit
            </Button>
          </div>
          <IconButton className={classes.closeIcon} onClick={handleFolderClose}>
            <CloseIcon />
          </IconButton>
        </form>
      ) : null}
    </div>
  );
}

//CSS
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: "relative",
    },
    inputForm: {
      position: "absolute",
      top: -15,
      right: 0,
      width: "220px",
      backgroundColor: "white",
      padding: "1.5rem 1rem 1.5rem 1rem",
      zIndex: "10",
      boxShadow: "-3px 3px 15px rgba(0, 0, 0, 0.3)",
      borderRadius: "0.3rem",
      [theme.breakpoints.down("sm")]: {
        right: -35,
      },
    },
    closeIcon: {
      position: "absolute",
      top: 0,
      right: 0,
    },
  })
);
