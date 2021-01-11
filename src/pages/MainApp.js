import React from "react";
import Layout from "../layout/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import Dashboard from "../css/theme";
import { ContentDataProvider } from "../context/ContentDataProvider";
import Content from "../components/Content";

function MainApp() {
  return (
    <CssBaseline>
      <Dashboard>
        <ContentDataProvider>
          <Layout>
            <Content />
          </Layout>
        </ContentDataProvider>
      </Dashboard>
    </CssBaseline>
  );
}

export default MainApp;
