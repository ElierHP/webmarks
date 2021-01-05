import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { ContentData, ContentMethods } from "../context/ContentDataProvider";
import FolderContent from "./FolderContent";
import LinkContent from "./LinkContent";

function Content() {
  const [data, appState] = useContext(ContentData);
  const [, setAppState] = useContext(ContentMethods);
  return (
    <Container>
      <Grid container>
        {data
          .filter((idFilter) => idFilter.parentId === appState)
          .map((item) =>
            item.type === "folder" ? (
              <FolderContent
                title={item.title}
                key={item.key}
                id={item.id}
                clickHandler={() => setAppState(item.id)}
              />
            ) : (
              <LinkContent
                title={item.title}
                url={item.url}
                key={item.key}
                clickHandler={() => (window.location = item.url)}
              />
            )
          )}
      </Grid>
    </Container>
  );
}

export default Content;
