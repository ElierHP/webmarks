import React, { useContext } from "react";
import { AppData } from "../context/AppDataProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validations/note";
import { FormControl, TextField, Button, Typography, Box } from "@mui/material";
import { createNewNote } from "../utils/api/note";

export default function NewNote() {
  const app = useContext(AppData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //Submit
  const onSubmit = async ({ title, body }) => {
    createNewNote(title, body, app);
  };

  return (
    <Box
      sx={{
        boxShadow: "-3px 3px 15px rgba(0, 0, 0, 0.3)",
        padding: {
          xs: "1.3rem 2rem 2rem 2rem",
          sm: "1.3rem 3rem 2rem 3rem",
        },
        width: "100%",
        margin: "1rem",
        minHeight: "500px",
        position: "relative",
      }}
    >
      <form
        id="new-note-menu"
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%" }}
      >
        <FormControl fullWidth>
          <Typography
            variant="h5"
            align="center"
            sx={{
              marginBottom: {
                xs: "0.5rem",
                sm: "1rem",
              },
            }}
          >
            Add New Note
          </Typography>
          {/* Note Title */}
          {!errors.title ? (
            <TextField
              id="note-title"
              label="Note Title"
              sx={{ marginBottom: "1rem" }}
              color="primary"
              {...register("title")}
            />
          ) : (
            // Note Title Error
            <TextField
              id="note-title-error"
              label="Note Title"
              error
              helperText={errors.title.message}
              sx={{ marginBottom: "1rem" }}
              {...register("title")}
            />
          )}

          {/* Note Body */}
          {!errors.body ? (
            <TextField
              id="note-body"
              label="Note Body"
              color="primary"
              multiline
              rows={12}
              sx={{ marginBottom: "1rem" }}
              {...register("body")}
            ></TextField>
          ) : (
            <TextField
              id="note-body-error"
              label="Note Body"
              color="primary"
              multiline
              rows={12}
              error
              helperText={errors.body.message}
              sx={{ marginBottom: "1rem" }}
              {...register("body")}
            ></TextField>
          )}

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}
