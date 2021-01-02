import React, { useContext, useState } from "react";
import { ContentMethods } from "../context/ContentDataProvider";
import TextField from "@material-ui/core/TextField";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

export default function SimpleMenu() {
  const dispatch = useContext(ContentMethods);

  //Material UI handlers
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Folder Handlers
  const [isNewFolder, setIsNewFolder] = useState(false);
  const [folderTitle, setFolderTitle] = useState("");

  const handleFolderClose = () => {
    setIsNewFolder(null);
  };

  const handleFolderClick = (event) => {
    setIsNewFolder(event.currentTarget);
    setAnchorEl(null);
  };

  const handleTitleChange = (e) => {
    setFolderTitle(e.target.value);
  };

  const handleFolderSubmit = () => {
    dispatch({ type: "addFolder", title: folderTitle });
  };
  //Link Handlers

  return (
    <>
      <IconButton
        size="small"
        aria-controls="simple-menu"
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
        <Menu
          id="simple-menu"
          anchorEl={isNewFolder}
          keepMounted
          open={Boolean(isNewFolder)}
          onClose={handleFolderClose}
        >
          <MenuItem>
            <TextField
              id="standard"
              label="Folder Title"
              defaultValue={folderTitle}
              onChange={handleTitleChange}
              multiline
            />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFolderSubmit}
            >
              Submit
            </Button>
          </MenuItem>
        </Menu>
      ) : null}
    </>
  );
}
