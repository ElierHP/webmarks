import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {
  ContentData,
  ContentMethods,
  HeaderContext,
} from "../context/ContentDataProvider";
import Folder from "./Folder";
import Link from "./Link";
import { makeStyles, createStyles } from "@material-ui/core/styles";

function Content() {
  const [, appState] = useContext(ContentData);
  const [, setAppState] = useContext(ContentMethods);
  const [, setDirectory] = useContext(HeaderContext);
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
        {JSON.parse(localStorage.getItem("data"))
          .filter((idFilter) => idFilter.parentId === appState)
          .map((item) =>
            item.type === "folder" ? (
              <Folder
                title={item.title}
                url={item.url}
                key={item.key}
                id={item.id}
                parentId={item.parentId}
                clickHandler={() => clickHandler(item.id, item.title)}
              />
            ) : (
              <Link
                title={item.title}
                url={item.url}
                key={item.key}
                id={item.id}
                clickHandler={() => (window.location = item.url)}
              />
            )
          )}
      </Grid>
    </Container>
  );
}

export default Content;
