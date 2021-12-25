import React, { useContext, useState } from "react";
import { AppData, AppState } from "../context/AppDataProvider";
import useItemMenu from "../hooks/useItemMenu";
import NewFolder from "./NewFolder";
import axios from "axios";
import {
  Box,
  TextField,
  Menu,
  MenuItem,
  Button,
  IconButton,
  FormControl,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

export default function ItemMenu() {
  const [, dispatch] = useContext(AppData);
  const [appState] = useContext(AppState);

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
    <Box sx={{ position: "relative", marginRight: "0.5rem" }}>
      <IconButton
        size="small"
        aria-controls="addnew-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          padding: "0.2rem",
          "&:hover": {
            backgroundColor: "secondary.light",
          },
        }}
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
        <NewFolder
          isNewFolder={isNewFolder}
          handleFolderClose={handleFolderClose}
          handleTitleChange={handleTitleChange}
          folderTitle={folderTitle}
          setFolderTitle={setFolderTitle}
        />
      )}

      {/* New Link Menu */}
      {isNewLink && (
        <FormControl
          id="new-link-menu"
          open={Boolean(isNewLink)}
          onSubmit={handleLinkSubmit}
          sx={{
            position: "absolute",
            top: -15,
            right: {
              xs: -15,
              sm: 0,
            },
            width: "220px",
            padding: "2.5rem 1.2rem 1.5rem 1.2rem",
            zIndex: "10",
            boxShadow: "-3px 3px 15px rgba(0, 0, 0, 0.3)",
            borderRadius: "0.3rem",
            backgroundColor: "secondary.main",
          }}
        >
          <TextField
            id="link-input"
            label="Link Title"
            defaultValue={linkTitle}
            onChange={handleLinkTitleChange}
            color="primary"
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            id="link-url-input"
            label="URL"
            defaultValue={linkUrl}
            onChange={handleUrlChange}
            color="primary"
            sx={{ marginBottom: "1rem" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLinkSubmit}
          >
            Submit
          </Button>
          <IconButton
            onClick={handleLinkClose}
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </FormControl>
      )}
    </Box>
  );
}
