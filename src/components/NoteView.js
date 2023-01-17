import React, { useContext } from "react";
import { Typography, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AppData } from "../context/AppDataProvider";
import NoteEdit from "./NoteEdit";

export default function NoteView() {
  const { note, directory, setDirectory, appState } = useContext(AppData);

  const handleClose = () => {
    if (directory === "0") {
      setDirectory("Main");
    } else {
      setDirectory(appState);
    }

    if (note.isEditing) {
      note.isEditing = false;
    }
  };

  return (
    <Box
      sx={{
        boxShadow: "-3px 3px 15px rgba(0, 0, 0, 0.3)",
        padding: "2rem",
        width: "100%",
        margin: "1rem",
        minHeight: "500px",
        position: "relative",
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: "1rem",
          top: "1rem",
          zIndex: "1",
          "&:hover": {
            backgroundColor: "secondary.dark",
          },
        }}
      >
        <CloseIcon color="error" sx={{ fontSize: "30px" }} />
      </IconButton>
      {!note.isEditing ? (
        <>
          <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
            {note.title}
          </Typography>
          <pre>
            <Typography variant="body1" paragraph={true}>
              {note.body}
            </Typography>
          </pre>
        </>
      ) : (
        <NoteEdit />
      )}
    </Box>
  );
}
