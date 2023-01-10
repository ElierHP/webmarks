import React, { useContext } from "react";
import { AppData } from "../context/AppDataProvider";
import { User } from "../context/UserProvider";
import Folder from "../components/Folder";
import Link from "../components/Link";
import { Navigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Grid, Typography } from "@mui/material";

function Home() {
  //Context Providers
  const app = useContext(AppData);
  const user = useContext(User);

  //Click Handlers
  const folderClickHandler = (id, title) => {
    app.setAppState(id);
    app.setDirectory(title);
  };

  if (user.isError) return <Navigate to="/404" />;
  //Route to /login if user is not logged in
  if (!user.user) return <Navigate to="/login" />;
  return (
    <Grid container>
      {/* Loading Data*/}
      {user.isLoading ? (
        <Typography variant="h5" sx={{ margin: "auto", paddingTop: "2rem" }}>
          Loading...
        </Typography>
      ) : (
        // Render Data
        app.data
          .filter((idFilter) => idFilter.parent_id === app.appState)
          .map((item) =>
            item.type === "folder" ? (
              // Render Folders
              <Folder
                title={item.title}
                url={item.url}
                key={uuidv4()}
                _id={item._id}
                parent_id={item.parent_id}
                clickHandler={() => folderClickHandler(item._id, item.title)}
              />
            ) : (
              // Render Links
              <Link
                title={item.title}
                url={item.url}
                key={uuidv4()}
                _id={item._id}
                clickHandler={() => (window.location = item.url)}
              />
            )
          )
      )}
    </Grid>
  );
}

export default Home;
