import { Home } from "./pages/index";
import { DarkModeProvider } from "./context/DarkModeProvider";
import { Routes, Route } from "react-router-dom";
import { AppDataProvider } from "./context/AppDataProvider";
import Layout from "./layout/Layout";

function App() {
  return (
    <AppDataProvider>
      <DarkModeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </DarkModeProvider>
    </AppDataProvider>
  );
}

export default App;
