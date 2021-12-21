import Index from "./pages";
import { DarkModeProvider } from "./context/DarkModeProvider";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Theme from "./layout/Theme";
import { ContentDataProvider } from "./context/ContentDataProvider";

function App() {
  return (
    <DarkModeProvider>
      <Theme>
        <CssBaseline>
          <ContentDataProvider>
            <Routes>
              <Route path="/" element={<Index />} />
            </Routes>
          </ContentDataProvider>
        </CssBaseline>
      </Theme>
    </DarkModeProvider>
  );
}

export default App;
