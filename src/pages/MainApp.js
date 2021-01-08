import React from "react";
import Layout from "../layout/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import InitialContent from "../components/InitialContent";
import Dashboard from "../css/theme";
import { ContentDataProvider } from "../context/ContentDataProvider";
import Content from "../components/Content";

function MainApp() {
  const appData = true;

  return (
    <CssBaseline>
      <Dashboard>
        <ContentDataProvider>
          <Layout>{appData ? <Content /> : <InitialContent />}</Layout>
        </ContentDataProvider>
      </Dashboard>
    </CssBaseline>
  );
}

export default MainApp;
