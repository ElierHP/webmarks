import React, { useContext } from "react";
import axios from "axios";
import { AppData, AppState } from "../context/AppDataProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validations/link";
import { FormControl, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function NewLink({ isNewLink, handleLinkClose }) {
  //Context
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
  const onSubmit = async ({ title, url }) => {
    try {
      const res = await axios.post("http://localhost:5000/links/new", {
        title: title,
        parent_id: appState,
        url: url,
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      id="new-link-menu"
      open={Boolean(isNewLink)}
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
        {/* Title */}
        {!errors.title ? (
          <TextField
            id="link-title"
            label="Link Title"
            color="primary"
            sx={{ marginBottom: "1rem" }}
            {...register("title")}
          />
        ) : (
          // Title Error
          <TextField
            id="link-title-error"
            label="Link Title"
            error
            helperText={errors.title.message}
            {...register("title")}
          />
        )}
        {/* URL */}
        {!errors.url ? (
          <TextField
            id="link-url"
            label="URL"
            color="primary"
            sx={{ marginBottom: "1rem" }}
            {...register("url")}
          />
        ) : (
          // URL Error
          <TextField
            id="link-url-error"
            label="URL"
            error
            helperText={errors.url.message}
            {...register("url")}
          />
        )}
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>

        {/* Close Icon */}
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
