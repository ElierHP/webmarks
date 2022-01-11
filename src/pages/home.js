import React, { useContext, useEffect } from "react";
import { AppData, AppState } from "../context/AppDataProvider";
import { User } from "../context/UserProvider";
import axios from "axios";
import Folder from "../components/Folder";
import Link from "../components/Link";
import { v4 as uuidv4 } from "uuid";
import { Grid } from "@mui/material";

function Home() {
  //Context Providers
  const [data] = useContext(AppData);
  const [appState, setAppState, , setDirectory] = useContext(AppState);
  const [
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    isLoading,
    setIsLoading,
    isError,
    setIsError,
  ] = useContext(User);

  //Sever Requests
  useEffect(() => {
    //Check if user is logged in
    async function getUser() {
      setIsLoading(true);
      setIsError(false);
      const res = await axios.get("http://localhost:5000/users");
      if (res.data.user) setUser({ user: res.data.user });
      setIsLoggedIn(res.data.isLoggedIn);
    }
    getUser().catch(setIsError(true));
    setIsLoading(false);
  }, []);

  //Click Handlers
  const folderClickHandler = (id, title) => {
    setAppState(id);
    setDirectory(title);
  };

  return (
    <Grid container>
      {data
        .filter((idFilter) => idFilter.parent_id === appState)
        .map((item) =>
          item.type === "folder" ? (
            <Folder
              title={item.title}
              url={item.url}
              key={uuidv4()}
              _id={item._id}
              parent_id={item.parent_id}
              clickHandler={() => folderClickHandler(item._id, item.title)}
            />
          ) : (
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
