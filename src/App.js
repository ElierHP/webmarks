import { Home, Register, Login, ErrorPage } from "./pages/index";
import { DarkModeProvider } from "./context/DarkModeProvider";
import { Routes, Route } from "react-router-dom";
import { AppDataProvider } from "./context/AppDataProvider";
import { UserProvider } from "./context/UserProvider";
import Layout from "./layout/Layout";

function App() {
  return (
    <UserProvider>
      <AppDataProvider>
        <DarkModeProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/404" element={<ErrorPage />} />
            </Routes>
          </Layout>
        </DarkModeProvider>
      </AppDataProvider>
    </UserProvider>
  );
}

export default App;
