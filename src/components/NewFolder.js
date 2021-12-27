import React, { useContext } from "react";
import { AppData, AppState } from "../context/AppDataProvider";
import axios from "axios";
import { FormControl, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function NewFolder({
  isNewFolder,
  handleFolderClose,
  handleTitleChange,
  folderTitle,
  setFolderTitle,
}) {
  const [, dispatch] = useContext(AppData);
  const [appState] = useContext(AppState);

  //Submit
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
  return (
    <form id="new-folder-menu" onSubmit={handleFolderSubmit}>
      <FormControl
        id="new-folder-menu"
        open={Boolean(isNewFolder)}
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
          id="folder-input"
          label="Folder Title"
          defaultValue={folderTitle}
          onChange={handleTitleChange}
          style={{ marginBottom: "1rem" }}
          color="primary"
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        <IconButton
          onClick={handleFolderClose}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <CloseIcon />
        </IconButton>
      </FormControl>
    </form>
  );
}

export default NewFolder;
