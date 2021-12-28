import React, { useContext } from "react";
import useEdit from "../hooks/useEdit";
import { useForm } from "react-hook-form";
import { AppData } from "../context/AppDataProvider";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { editSchema } from "../validations/link";
import {
  Grid,
  Typography,
  FormControl,
  TextField,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

function Link({ title, url, clickHandler, _id }) {
  const [, dispatch] = useContext(AppData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editSchema),
  });

  const [
    isEditing,
    setIsEditing,
    handleChange,
    handleDelete,
    ,
    handleUrlChange,
    urlValue,
    handleCloseIcon,
  ] = useEdit({ title, _id, url });

  const handleEdit = async ({ newTitle, newUrl }) => {
    try {
      const res = await axios.patch(`http://localhost:5000/links/edit`, {
        _id: _id,
        title: newTitle,
        url: newUrl,
      });
      dispatch({
        type: "edit",
        _id: res.data._id,
        newTitle: res.data.title,
        url: res.data.url,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          {/* Favicons */}
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
              // Title
              <Typography variant="body1">{`${title} : `}</Typography>
            ) : (
              // Edit Title
              <form onSubmit={handleSubmit(handleEdit)}>
                {!errors.newTitle ? (
                  <TextField
                    id="link-title"
                    label="Link Title"
                    variant="standard"
                    defaultValue={title}
                    color="primary"
                    autoFocus
                    {...register("newTitle")}
                    sx={{
                      maxWidth: {
                        xs: "50px",
                        sm: "80%",
                      },
                    }}
                  />
                ) : (
                  <TextField
                    id="link-title-error"
                    label="Link Title"
                    variant="standard"
                    error
                    helperText={errors.newTitle.message}
                    {...register("newTitle")}
                  />
                )}
              </form>
            )}
          </Grid>
          <Grid item>
            {!isEditing ? (
              // URL
              <Typography
                variant="body2"
                sx={{
                  marginLeft: {
                    xs: "0.3rem",
                    sm: "1rem",
                  },
                }}
              >
                <MuiLink
                  href={url}
                  underline="none"
                  color="primary.light"
                  sx={{
                    display: "inline-block",
                    verticalAlign: "middle",
                    width: {
                      xs: "100px",
                      sm: "300px",
                      md: "500px",
                    },
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {url}
                </MuiLink>
              </Typography>
            ) : (
              // Edit URL
              <form onSubmit={handleSubmit(handleEdit)}>
                {!errors.newUrl ? (
                  <TextField
                    id="link-url"
                    label="URL"
                    variant="standard"
                    defaultValue={urlValue}
                    color="primary"
                    autoFocus
                    {...register("newUrl")}
                    sx={{
                      width: {
                        xs: "100px",
                        sm: "400px",
                      },
                      marginLeft: "1rem",
                    }}
                  />
                ) : (
                  <TextField
                    id="link-url"
                    label="URL"
                    variant="standard"
                    error
                    helperText={errors.newUrl.message}
                    {...register("newUrl")}
                  />
                )}
              </form>
            )}
          </Grid>
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

export default Link;
