import { Home } from "./pages/index";
import { DarkModeProvider } from "./context/DarkModeProvider";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Theme from "./layout/Theme";
import { AppDataProvider } from "./context/AppDataProvider";
import Layout from "./layout/Layout";

function App() {
  return (
    <AppDataProvider>
      <DarkModeProvider>
        <Theme>
          <CssBaseline>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </Layout>
          </CssBaseline>
        </Theme>
      </DarkModeProvider>
    </AppDataProvider>
  );
}

export default App;
