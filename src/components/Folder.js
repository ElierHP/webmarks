import React, { useContext } from "react";
import useEdit from "../hooks/useEdit";
import { useForm } from "react-hook-form";
import { AppData } from "../context/AppDataProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import { editSchema } from "../validations/folder";
import { Grid, IconButton, Typography, TextField } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { editFolder } from "../utils/api/folder";
import { Navigate } from "react-router-dom";

function Folder({ title, clickHandler, _id }) {
  const app = useContext(AppData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editSchema),
  });

  const { isEditing, setIsEditing, handleDelete } = useEdit({
    _id,
  });

  const handleEdit = async ({ newTitle }) => {
    try {
      await editFolder(newTitle, _id, app);
      setIsEditing(false);
    } catch (error) {
      return <Navigate to="/404" />;
    }
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
        onClick={() => !isEditing && clickHandler()}
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
          {/* Folder Icon */}
          <FolderIcon
            fontSize="large"
            sx={{
              marginRight: "0.5rem",
              color: "folder.main",
            }}
          />
          {!isEditing ? (
            // Folder Title
            <Typography
              variant="h6"
              sx={{
                userSelect: "none",
                maxWidth: {
                  xs: "140px",
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
            // Edit Folder Title
            <form onSubmit={handleSubmit(handleEdit)}>
              {!errors.newTitle ? (
                <TextField
                  id="folder-title"
                  label="Folder Title"
                  variant="standard"
                  defaultValue={title}
                  color="primary"
                  autoFocus
                  {...register("newTitle")}
                  sx={{
                    maxWidth: {
                      xs: "100px",
                      sm: "100%",
                    },
                  }}
                />
              ) : (
                <TextField
                  id="folder-title-error"
                  variant="standard"
                  label="Folder Title"
                  error
                  helperText={errors.newTitle.message}
                  {...register("newTitle")}
                />
              )}
            </form>
          )}
        </Grid>
      </Grid>
      <Grid item>
        {!isEditing ? (
          <>
            {/* Edit Icon */}
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
            {/* Delete Icon */}
            <IconButton
              onClick={() => handleDelete("folders")}
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
            {/* Confirm Edit Icon */}
            <IconButton
              color="success"
              onClick={handleSubmit(handleEdit)}
              sx={{
                "&:hover": {
                  backgroundColor: "secondary.dark",
                },
              }}
            >
              <DoneIcon />
            </IconButton>
            {/* Close Edit Icon */}
            <IconButton
              onClick={() => {
                setIsEditing(false);
                reset();
              }}
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

export default Folder;
