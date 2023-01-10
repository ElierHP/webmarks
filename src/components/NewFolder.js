import React, { useContext } from "react";
import { AppData } from "../context/AppDataProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validations/folder";
import { FormControl, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createNewFolder } from "../utils/api/folder";
import { Navigate } from "react-router-dom";

function NewFolder({ isNewFolder, handleFolderClose }) {
  const { dispatch, appState } = useContext(AppData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //Submit
  const onSubmit = async ({ title }) => {
    try {
      createNewFolder(title, appState, dispatch);
      handleFolderClose();
    } catch (error) {
      return <Navigate to="/404" />;
    }
  };
  return (
    <form
      id="new-folder-menu"
      open={Boolean(isNewFolder)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl
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
        {/* Folder Title */}
        {!errors.title ? (
          <TextField
            id="folder-title"
            label="Folder Title"
            sx={{ marginBottom: "1rem" }}
            color="primary"
            {...register("title")}
          />
        ) : (
          // Folder Title Error
          <TextField
            id="folder-title-error"
            label="Folder Title"
            error
            helperText={errors.title.message}
            {...register("title")}
          />
        )}

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>

        {/* Close Icon */}
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
