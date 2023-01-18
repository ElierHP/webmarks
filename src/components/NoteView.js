import React, { useContext } from "react";
import { Typography, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AppData } from "../context/AppDataProvider";
import NoteEdit from "./NoteEdit";
import useAppState from "../hooks/useAppState";

export default function NoteView() {
  const { note } = useContext(AppData);
  const findAppState = useAppState();

  const handleClose = () => {
    // Go back to the correct folder after closing.
    findAppState();
  };

  return (
    <Box
      sx={{
        boxShadow: "-3px 3px 15px rgba(0, 0, 0, 0.3)",
        padding: {
          xs: "1.5rem",
          sm: "2rem",
        },
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
          <Typography
            variant="h4"
            sx={{ marginBottom: "1rem", maxWidth: "80%" }}
          >
            {note.title}
          </Typography>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            <Typography variant="body1">{note.body}</Typography>
          </pre>
        </>
      ) : (
        <NoteEdit />
      )}
    </Box>
  );
}
