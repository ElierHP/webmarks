import React, { useContext } from "react";
import { AppData, AppState } from "../context/AppDataProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validations/folder";
import axios from "axios";
import { FormControl, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function NewFolder({ isNewFolder, handleFolderClose }) {
  const [, dispatch] = useContext(AppData);
  const [appState] = useContext(AppState);

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
      const res = await axios.post("http://localhost:5000/folders/new", {
        title: title,
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
    } catch (error) {
      console.log(error);
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
