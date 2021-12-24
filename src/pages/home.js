import React, { useContext } from "react";
import { AppData, AppState } from "../context/AppDataProvider";
import Folder from "../components/Folder";
import Link from "../components/Link";
import { v4 as uuidv4 } from "uuid";
import { Grid, Container } from "@mui/material";

function Home() {
  const [data] = useContext(AppData);
  const [appState, setAppState, , setDirectory] = useContext(AppState);

  const clickHandler = (id, title) => {
    setAppState(id);
    setDirectory(title);
  };

  return (
    <Container
      sx={{
        minHeight: {
          xs: `calc(100vh - 156.7812px)`,
          sm: `calc(100vh - 165px)`,
        },
        padding: {
          xs: "0",
          sm: "0 1.5rem 1rem 1.5rem",
        },
        paddingBottom: "1rem",
      }}
    >
      <Grid container sx={{ marginTop: "0.5rem" }}>
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
                clickHandler={() => clickHandler(item._id, item.title)}
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
    </Container>
  );
}

export default Home;
