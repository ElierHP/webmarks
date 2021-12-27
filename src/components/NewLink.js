import React, { useContext } from "react";
import axios from "axios";
import { AppData, AppState } from "../context/AppDataProvider";
import { FormControl, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function NewLink({
  isNewLink,
  handleLinkClose,
  handleLinkTitleChange,
  linkTitle,
  setLinkTitle,
  linkUrl,
  handleUrlChange,
}) {
  //Context
  const [, dispatch] = useContext(AppData);
  const [appState] = useContext(AppState);

  //Submit
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
    <form id="new-link-menu" onSubmit={handleLinkSubmit}>
      <FormControl
        open={Boolean(isNewLink)}
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
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        <IconButton
          onClick={handleLinkClose}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <CloseIcon />
        </IconButton>
      </FormControl>
    </form>
  );
}

export default NewLink;
