import React, { useContext } from "react";
import { AppData } from "../context/AppDataProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validations/note";
import { FormControl, TextField, Button, Typography, Box } from "@mui/material";
import { editNote } from "../utils/api/note";

export default function EditNote() {
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
    editNote(title, body, app);

    if (app.directory === "0") {
      app.setDirectory("Main");
    } else {
      app.setDirectory(app.appState);
    }
  };

  return (
    <form id="edit-note-menu" onSubmit={handleSubmit(onSubmit)}>
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
          Edit Note
        </Typography>
        {/* Note Title */}
        {!errors.title ? (
          <TextField
            id="note-title"
            label="Note Title"
            sx={{ marginBottom: "1rem" }}
            color="primary"
            defaultValue={app.note.title}
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
            defaultValue={app.note.body}
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
  );
}
