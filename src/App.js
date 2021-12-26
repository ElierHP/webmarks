import { Home } from "./pages/index";
import { DarkModeProvider } from "./context/DarkModeProvider";
import { Routes, Route } from "react-router-dom";
import { AppDataProvider } from "./context/AppDataProvider";
import Layout from "./layout/Layout";
import Register from "./pages/register";

function App() {
  return (
    <AppDataProvider>
      <DarkModeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
      </DarkModeProvider>
    </AppDataProvider>
  );
}

export default App;
