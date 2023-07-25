import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Games from "./pages/Games";
import GamesDetail from "./pages/GamesDetail";
import Intro from "./pages/Intro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Intro />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:name" element={<GamesDetail />} />
        <Route path="*" element={<Games />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
