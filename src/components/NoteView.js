import { Typography, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useContext } from "react";
import { AppData } from "../context/AppDataProvider";

export default function NoteView() {
  const { note, setDirectory } = useContext(AppData);
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
        onClick={() => setDirectory("Main")}
        sx={{
          position: "absolute",
          right: "1rem",
          top: "1rem",
          "&:hover": {
            backgroundColor: "secondary.dark",
          },
        }}
      >
        <CloseIcon color="error" sx={{ fontSize: "30px" }} />
      </IconButton>
      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
        {note.title}
      </Typography>
      <Typography variant="body1">{note.body}</Typography>
    </Box>
  );
}
