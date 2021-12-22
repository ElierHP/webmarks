import React from "react";
import useEdit from "../hooks/useEdit";
import { Grid, Typography, TextField, IconButton, Link } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

function LinkContent({ title, url, clickHandler, _id }) {
  const params = "links";
  const [
    isEditing,
    setIsEditing,
    handleChange,
    handleDelete,
    handleEdit,
    handleUrlChange,
    urlValue,
    handleCloseIcon,
  ] = useEdit({ title, _id, url, params });

  return (
    <Grid
      item
      container
      alignItems="center"
      justifyContent="space-between"
      sx={{
        padding: "0.4rem 1rem 0.4rem 1rem",
        cursor: "pointer",
        borderRadius: "0.2rem",
      }}
    >
      <Grid item xs={9} onClick={() => !isEditing && clickHandler()}>
        <Grid container alignItems="center">
          <Grid item>
            <img
              src={`https://www.google.com/s2/favicons?domain_url=${url}`}
              style={{
                marginRight: "0.5rem",
                marginLeft: "1.4rem",
                marginTop: "0.2rem",
              }}
              alt="external site's favicon"
            />
          </Grid>
          <Grid item>
            {!isEditing ? (
              <Typography variant="body1">{`${title} : `}</Typography>
            ) : (
              <form onSubmit={handleEdit}>
                <TextField
                  id="link-title-input"
                  label="Link Title"
                  variant="standard"
                  defaultValue={title}
                  onChange={handleChange}
                  color="primary"
                  autoFocus
                />
              </form>
            )}
          </Grid>
          <Grid item>
            {!isEditing ? (
              <Typography variant="body2" sx={{ marginLeft: "1rem" }}>
                <Link href={url} underline="none" color="primary">
                  {url}
                </Link>
              </Typography>
            ) : (
              <form onSubmit={handleEdit}>
                <TextField
                  id="link-url-input"
                  label="URL"
                  variant="standard"
                  defaultValue={urlValue}
                  onChange={handleUrlChange}
                  color="primary"
                  autoFocus
                />
              </form>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {!isEditing ? (
          <>
            <IconButton onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton color="success" onClick={handleEdit}>
              <DoneIcon />
            </IconButton>
            <IconButton color="error" onClick={handleCloseIcon}>
              <CloseIcon />
            </IconButton>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default LinkContent;
