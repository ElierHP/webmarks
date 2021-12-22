import React, { useContext } from "react";
import { AppData, AppState } from "../context/AppDataProvider";
import Folder from "../components/Folder";
import Link from "../components/Link";
import { v4 as uuidv4 } from "uuid";
import { makeStyles, createStyles } from "@mui/styles";
import { Grid, Container } from "@mui/material";

function Home() {
  const [data] = useContext(AppData);
  const [appState, setAppState, , setDirectory] = useContext(AppState);

  const clickHandler = (id, title) => {
    setAppState(id);
    setDirectory(title);
  };

  //Styles
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        minHeight: `calc(100vh - 165px)`,
        paddingBottom: "1rem",
        [theme.breakpoints.down("xs")]: {
          minHeight: `calc(100vh - 156.7812px)`,
        },
      },
      gridContainer: {
        marginTop: "0.5rem",
      },
    })
  );
  const classes = useStyles();
  //Style End

  return (
    <Container className={classes.root}>
      <Grid container spacing={2} className={classes.gridContainer}>
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