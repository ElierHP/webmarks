import React from "react";
import Layout from "../layout/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import InitialContent from "../components/InitialContent";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../css/theme";
import { ContentDataProvider } from "../context/ContentDataProvider";
import Content from "../components/Content";

function MainApp() {
  const appData = true;
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <ContentDataProvider>
          <Layout>{appData ? <Content /> : <InitialContent />}</Layout>
        </ContentDataProvider>
      </ThemeProvider>
    </CssBaseline>
  );
}

export default MainApp;
