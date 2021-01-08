import MainApp from "./pages/MainApp";
import { DarkModeProvider } from "./context/DarkModeProvider";
function App() {
  return (
    <DarkModeProvider>
      <MainApp />
    </DarkModeProvider>
  );
}

export default App;
