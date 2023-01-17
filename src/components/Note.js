import React, { useContext } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import useEdit from "../hooks/useEdit";
import { AppData } from "../context/AppDataProvider";

export default function Note({ _id, title, body }) {
  const { note, setNote, setDirectory } = useContext(AppData);
  const { handleDelete } = useEdit({
    _id,
  });

  const noteClick = () => {
    setNote({
      isEditing: false,
      _id,
      title,
      body,
    });

    setDirectory("Note");
  };

  const handleEdit = () => {
    setNote({
      isEditing: true,
      _id,
      title,
      body,
    });

    setDirectory("Edit Note");
  };
  return (
    <Grid
      container
      alignItems="center"
      sx={{
        cursor: "pointer",
        borderRadius: "0.2rem",
        "&:hover": {
          backgroundColor: "secondary.light",
        },
        paddingRight: {
          xs: "1rem",
          sm: "2rem",
        },
      }}
    >
      <Grid
        item
        onClick={noteClick}
        sx={{
          flexGrow: 1,
          padding: "1rem 0",
          paddingLeft: {
            xs: "1rem",
            sm: "2rem",
          },
        }}
      >
        <Grid container alignItems="center">
          <StickyNote2Icon
            fontSize="large"
            sx={{
              marginRight: "0.5rem",
              color: "note.main",
            }}
          />
          <Typography
            variant="body1"
            sx={{
              userSelect: "none",
              maxWidth: {
                xs: "200px",
                sm: "100%",
              },
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>
        </Grid>
      </Grid>

      {/* Icons */}
      <Grid>
        {/* Edit Icon */}
        <IconButton
          onClick={handleEdit}
          sx={{
            "&:hover": {
              backgroundColor: "secondary.dark",
            },
          }}
        >
          <EditIcon />
        </IconButton>

        {/* Delete Icon */}
        <IconButton
          onClick={() => handleDelete("notes")}
          sx={{
            "&:hover": {
              backgroundColor: "secondary.dark",
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
