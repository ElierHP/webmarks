import Home from "./pages/Home";
import { DarkModeProvider } from "./context/DarkModeProvider";
function App() {
  return (
    <DarkModeProvider>
      <Home />
    </DarkModeProvider>
  );
}

export default App;
