import React from "react";
import Layout from "../layout/Layout";
import CssBaseline from "@mui/material/CssBaseline";
import Theme from "../layout/Theme";
import { ContentDataProvider } from "../context/ContentDataProvider";
import Content from "../components/Content";

function MainApp() {
  return (
    <Theme>
      <CssBaseline>
        <ContentDataProvider>
          <Layout>
            <Content />
          </Layout>
        </ContentDataProvider>
      </CssBaseline>
    </Theme>
  );
}

export default MainApp;
