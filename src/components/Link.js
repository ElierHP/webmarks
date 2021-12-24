import React from "react";
import useEdit from "../hooks/useEdit";
import {
  Grid,
  Typography,
  FormControl,
  TextField,
  IconButton,
  Link,
} from "@mui/material";
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
        cursor: "pointer",
        borderRadius: "0.2rem",
        padding: {
          xs: "0.5rem 0",
          sm: "1rem",
        },
        "&:hover": {
          backgroundColor: "secondary.light",
        },
      }}
    >
      <Grid item xs={8} onClick={() => !isEditing && clickHandler()}>
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
              <FormControl onSubmit={handleEdit}>
                <TextField
                  id="link-title-input"
                  label="Link Title"
                  variant="standard"
                  defaultValue={title}
                  onChange={handleChange}
                  color="primary"
                  autoFocus
                  sx={{
                    maxWidth: {
                      xs: "50px",
                      sm: "80%",
                    },
                  }}
                />
              </FormControl>
            )}
          </Grid>
          <Grid item>
            {!isEditing ? (
              <Typography
                variant="body2"
                sx={{
                  marginLeft: {
                    xs: "0.3rem",
                    sm: "1rem",
                  },
                }}
              >
                <Link href={url} underline="none" color="primary.light">
                  {url}
                </Link>
              </Typography>
            ) : (
              <FormControl onSubmit={handleEdit}>
                <TextField
                  id="link-url-input"
                  label="URL"
                  variant="standard"
                  defaultValue={urlValue}
                  onChange={handleUrlChange}
                  color="primary"
                  autoFocus
                  sx={{
                    width: {
                      xs: "100px",
                      sm: "400px",
                    },
                    marginLeft: "1rem",
                  }}
                />
              </FormControl>
            )}
          </Grid>
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
              onClick={handleCloseIcon}
              sx={{
                "&:hover": {
                  backgroundColor: "secondary.dark",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default LinkContent;
