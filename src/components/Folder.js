import React from "react";
import useEdit from "../hooks/useEdit";
import {
  Grid,
  IconButton,
  FormControl,
  Typography,
  TextField,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

function FolderContent({ title, clickHandler, _id }) {
  const params = "folders";
  const [isEditing, setIsEditing, handleChange, handleDelete, handleEdit] =
    useEdit({ title, _id, params });

  return (
    <Grid
      container
      alignItems="center"
      sx={{
        cursor: "pointer",
        padding: {
          xs: "0.5rem 0",
          sm: "1rem",
        },
        borderRadius: "0.2rem",
        "&:hover": {
          backgroundColor: "secondary.light",
        },
      }}
    >
      <Grid
        item
        onClick={() => !isEditing && clickHandler()}
        sx={{ flexGrow: 1 }}
      >
        <Grid container alignItems="center">
          <FolderIcon
            fontSize="large"
            sx={{
              marginRight: "0.5rem",
              marginLeft: "1rem",
              color: "folder.main",
            }}
          />
          {!isEditing ? (
            <Typography
              variant="h6"
              sx={{
                userSelect: "none",
                maxWidth: {
                  xs: "120px",
                  sm: "100%",
                },
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {title}
            </Typography>
          ) : (
            <FormControl onSubmit={handleEdit}>
              <TextField
                id="folder-title-input"
                label="Folder Title"
                variant="standard"
                defaultValue={title}
                onChange={handleChange}
                color="primary"
                autoFocus
                sx={{
                  maxWidth: {
                    xs: "100px",
                    sm: "100%",
                  },
                }}
              />
            </FormControl>
          )}
        </Grid>
      </Grid>
      <Grid item>
        {!isEditing ? (
          <>
            <IconButton
              onClick={() => setIsEditing(true)}
              sx={{
                "&:hover": {
                  backgroundColor: "secondary.dark",
                },
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={handleDelete}
              sx={{
                "&:hover": {
                  backgroundColor: "secondary.dark",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              color="success"
              onClick={handleEdit}
              sx={{
                "&:hover": {
                  backgroundColor: "secondary.dark",
                },
              }}
            >
              <DoneIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => setIsEditing(false)}
              sx={{
                "&:hover": {
                  backgroundColor: "secondary.dark",
                },
              }}
            >
              <CloseIcon color="error" />
            </IconButton>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default FolderContent;
