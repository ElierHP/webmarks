import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { ContentData, ContentMethods } from "../context/ContentDataProvider";
import FolderContent from "./FolderContent";
import LinkContent from "./LinkContent";

function Content() {
  const appState = useContext(ContentData);
  const dispatch = useContext(ContentMethods);
  return (
    <Container>
      <Grid container>
        {appState.folders.map((item) => (
          <FolderContent
            title={item.title}
            key={item.key}
            clickHandler={() => dispatch({ type: "folderClick", item: item })}
          />
        ))}
        {appState.links.map((item) => (
          <LinkContent
            title={item.title}
            url={item.url}
            key={item.key}
            clickHandler={() => (window.location = item.url)}
          />
        ))}
      </Grid>
    </Container>
  );
}

export default Content;
