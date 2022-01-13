import React, { useContext, useEffect } from "react";
import { AppData, AppState } from "../context/AppDataProvider";
import { User } from "../context/UserProvider";
import axios from "axios";
import Folder from "../components/Folder";
import Link from "../components/Link";
import { Navigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Grid, Typography } from "@mui/material";

function Home() {
  //Axios Config
  axios.defaults.withCredentials = true;

  //Context Providers
  const [data, dispatch] = useContext(AppData);
  const [appState, setAppState, , setDirectory] = useContext(AppState);
  const [
    isLoggedIn,
    setIsLoggedIn,
    ,
    setUser,
    isLoading,
    setIsLoading,
    isError,
    setIsError,
  ] = useContext(User);

  //Sever Requests
  useEffect(() => {
    //Get current User data
    async function getUser() {
      setIsLoading(true);
      setIsError(false);
      const res = await axios.get("http://localhost:5000/users");
      //Check if user is logged in
      if (res.data.user) {
        setUser({ ...res.data.user });
        //fetch folder data
        const folders = await axios.get("http://localhost:5000/folders");
        //fetch link data
        const links = await axios.get("http://localhost:5000/links");
        //load data onto the app
        dispatch({ type: "load", data: [...folders.data, ...links.data] });
      }
      setIsLoggedIn(res.data.isLoggedIn);
    }
    getUser().catch((err) => setIsError(true));
    setIsLoading(false);
  }, []);

  //Click Handlers
  const folderClickHandler = (id, title) => {
    setAppState(id);
    setDirectory(title);
  };

  if (isError) return <Navigate to="/404" />;
  //Route to /login if user is not logged in
  if (!isLoggedIn) return <Navigate to="/login" />;
  return (
    <Grid container>
      {/* Loading Data*/}
      {isLoading && (
        <Typography variant="h5" sx={{ margin: "auto", paddingTop: "2rem" }}>
          Loading...
        </Typography>
      )}
      {/* Render App Data */}
      {data
        .filter((idFilter) => idFilter.parent_id === appState)
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
        )}
    </Grid>
  );
}

export default Home;
