import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {
  ContentData,
  ContentMethods,
  HeaderContext,
} from "../context/ContentDataProvider";
import FolderContent from "./FolderContent";
import LinkContent from "./LinkContent";

function Content() {
  const [data, appState] = useContext(ContentData);
  const [, setAppState] = useContext(ContentMethods);
  const [directory, setDirectory] = useContext(HeaderContext);
  const clickHandler = (id, title) => {
    setAppState(id);
    setDirectory(title);
  };

  return (
    <Container>
      <Grid container spacing={2} style={{ marginTop: "0.5rem" }}>
        {data
          .filter((idFilter) => idFilter.parentId === appState)
          .map((item) =>
            item.type === "folder" ? (
              <FolderContent
                title={item.title}
                url={item.url}
                key={item.key}
                id={item.id}
                parentId={item.parentId}
                clickHandler={() => clickHandler(item.id, item.title)}
              />
            ) : (
              <LinkContent
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
