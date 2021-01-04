import React, { useContext, useState, useEffect, useRef } from "react";
import { ContentData, ContentMethods } from "../context/ContentDataProvider";
import TextField from "@material-ui/core/TextField";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import styled from "styled-components";

export default function SimpleMenu() {
  const [dispatch, dataDispatch] = useContext(ContentMethods);
  const [appState, data] = useContext(ContentData);
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

  const handleFolderClick = () => {
    setIsNewFolder(!isNewFolder);
    setAnchorEl(null);
  };

  const handleTitleChange = (e) => {
    setFolderTitle(e.target.value);
  };

  const handleFolderSubmit = () => {
    dataDispatch({
      type: "addFolder",
      title: folderTitle,
      id: appState.id,
    });
  };

  console.log(appState.id);
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
        <MyForm
          id="simple-menu"
          open={Boolean(isNewFolder)}
          onMouseLeave={handleFolderClose}
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
        </MyForm>
      ) : null}
    </>
  );
}

//CSS
const MyForm = styled.form`
  position: fixed;
  top: 0;
  right: 0;
  margin-top: 4.5rem;
  margin-right: 1rem;
  background-color: white;
  padding: 0.5rem 1rem 1.5rem 1rem;
  z-index: 10;
  box-shadow: -3px 3px 15px rgba(0, 0, 0, 0.3);
  border-radius: 0.3rem;
`;

const InputField = styled.input``;
