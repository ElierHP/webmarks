import React, { useContext } from "react";
import { AppData } from "../context/AppDataProvider";
import { User } from "../context/UserProvider";
import Folder from "../components/Folder";
import Link from "../components/Link";
import { Navigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import Spinner from "../assets/spinner/Spinner";
import Note from "../components/Note";
import NoteView from "../components/NoteView";

function Home() {
  // Context Providers
  const app = useContext(AppData);
  const user = useContext(User);

  // Click Handlers
  const folderClickHandler = (id, title) => {
    app.setAppState(id);
    app.setDirectory(title);
  };

  // Used to display the app's data on the home page.
  const renderData = () => {
    const mapData = app.data
      .filter((data) => data.parent_id === app.appState)
      .map((item) => {
        if (item.type === "folder") {
          return (
            <Folder
              key={item._id}
              _id={item._id}
              title={item.title}
              clickHandler={() => folderClickHandler(item._id, item.title)}
            />
          );
        } else if (item.type === "link") {
          return (
            <Link
              key={item._id}
              _id={item._id}
              title={item.title}
              url={item.url}
              clickHandler={() => window.open(item.url, "_blank")}
            />
          );
        } else {
          return (
            <Note
              key={item._id}
              _id={item._id}
              title={item.title}
              body={item.body}
              clickHandler={() => console.log("click note")}
            />
          );
        }
      });

    return mapData;
  };

  // Route to /login if user is not logged in
  if (!user.user) return <Navigate to="/login" />;

  // Display error message if data wasn't fetched correctly.
  if (app.error.status === 500)
    return (
      <Typography
        variant="body1"
        color="error"
        align="center"
        sx={{ marginTop: "2rem" }}
      >
        {app.error.message}
      </Typography>
    );

  return (
    <Grid container>
      {/* Render the app's data, or loading spinner. */}
      {!app.isLoading ? (
        <>{app.note.isOpen ? <NoteView /> : renderData()}</>
      ) : (
        <Spinner />
      )}
    </Grid>
  );
}

export default Home;
