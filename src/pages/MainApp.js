import React, { useState, useContext } from "react";
import Layout from "../layout/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import InitialContent from "../components/InitialContent";
import { ThemeProvider } from "@material-ui/core/styles";
import Dashboard from "../css/theme";
import { ContentDataProvider } from "../context/ContentDataProvider";
import Content from "../components/Content";
import { DarkModeContext } from "../context/DarkModeProvider";

function MainApp() {
  const appData = true;
  const [isDarkMode] = useContext(DarkModeContext);

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
