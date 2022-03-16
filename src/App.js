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
              <Route path="/*" element={<ErrorPage />} />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </Layout>
        </DarkModeProvider>
      </AppDataProvider>
    </UserProvider>
  );
}

export default App;
