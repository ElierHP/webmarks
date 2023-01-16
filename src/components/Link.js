import React, { useContext } from "react";
import useEdit from "../hooks/useEdit";
import { useForm } from "react-hook-form";
import { AppData } from "../context/AppDataProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import { editSchema } from "../validations/link";
import {
  Grid,
  Typography,
  TextField,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { editLink } from "../utils/api/link";
import { Navigate } from "react-router-dom";

function Link({ title, url, clickHandler, _id }) {
  const { dispatch } = useContext(AppData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editSchema),
  });

  const [isEditing, setIsEditing, handleDelete] = useEdit({ _id });

  const handleEdit = async ({ newTitle, newUrl }) => {
    try {
      await editLink(newTitle, newUrl, _id, dispatch);
      setIsEditing(false);
    } catch (error) {
      return <Navigate to="/404" />;
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
        xs={8}
        onClick={() => !isEditing && clickHandler()}
        sx={{ padding: "1rem 0" }}
      >
        <Grid container alignItems="center">
          {/* Favicons */}
          {!isEditing && (
            <Grid
              item
              sx={{
                paddingLeft: {
                  xs: "1rem",
                  sm: "2rem",
                },
              }}
            >
              <img
                src={`https://www.google.com/s2/favicons?domain_url=${url}`}
                style={{
                  marginRight: "0.5rem",
                  marginTop: "0.2rem",
                  marginLeft: "0.2rem",
                }}
                alt="external site's favicon"
              />
            </Grid>
          )}

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
                      marginLeft: "1rem",
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
                    sx={{ marginLeft: "1rem" }}
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
                      sm: "200px",
                      md: "400px",
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
                    defaultValue={url}
                    color="primary"
                    autoFocus
                    {...register("newUrl")}
                    sx={{
                      width: {
                        xs: "100px",
                        sm: "400px",
                      },
                      marginTop: {
                        xs: "0",
                        sm: "0.7rem",
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
                    sx={{ marginLeft: "1rem" }}
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
              onClick={() => handleDelete("links")}
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

export default Link;
